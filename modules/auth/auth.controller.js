const UserModel = require('../user/user.model');
const RefreshTokenModel = require('./auth.model');
const ResponseUtil = require('../../shared/utils/response.util');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthController {
  async register(req, res, next) {
    try {
      const { fullName, email, password } = req.body;

      // Check if user already exists
      const existingUser = await UserModel.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        return ResponseUtil.badRequest(res, 'User with this email already exists');
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create user
      const user = new UserModel({
        fullName,
        email: email.toLowerCase(),
        password: hashedPassword,
        role: 'user'
      });

      const savedUser = await user.save();

      // Remove password from response
      const userResponse = {
        _id: savedUser._id,
        fullName: savedUser.fullName,
        email: savedUser.email,
        role: savedUser.role,
        createdAt: savedUser.createdAt
      };

      return ResponseUtil.created(res, userResponse, 'User registered successfully');
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      // Find user by email
      const user = await UserModel.findOne({ email: email.toLowerCase() });
      if (!user) {
        return ResponseUtil.unauthorized(res, 'Invalid email or password');
      }

      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return ResponseUtil.unauthorized(res, 'Invalid email or password');
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '1h' }
      );

      // Generate refresh token
      const refreshToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key',
        { expiresIn: '7d' }
      );

      // Save refresh token
      await RefreshTokenModel.create({
        userId: user._id,
        token: refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
      });

      // Remove password from response
      const userResponse = {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role
      };

      return ResponseUtil.success(res, {
        user: userResponse,
        token,
        refreshToken
      }, 'Login successful');
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.body;

      if (refreshToken) {
        // Remove refresh token from database
        await RefreshTokenModel.findOneAndDelete({ token: refreshToken });
      }

      return ResponseUtil.success(res, null, 'Logout successful');
    } catch (error) {
      next(error);
    }
  }

  async getProfile(req, res, next) {
    try {
      const userId = req.user.userId; // From JWT token

      const user = await UserModel.findById(userId).select('-password');
      if (!user) {
        return ResponseUtil.notFound(res, 'User not found');
      }

      return ResponseUtil.success(res, user, 'Profile retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req, res, next) {
    try {
      const userId = req.user.userId;
      const updateData = req.body;

      // Don't allow role update through profile update
      delete updateData.role;

      // If password is being updated, hash it
      if (updateData.password) {
        const salt = await bcrypt.genSalt(10);
        updateData.password = await bcrypt.hash(updateData.password, salt);
      }

      const user = await UserModel.findByIdAndUpdate(
        userId,
        updateData,
        { new: true, runValidators: true }
      ).select('-password');

      if (!user) {
        return ResponseUtil.notFound(res, 'User not found');
      }

      return ResponseUtil.success(res, user, 'Profile updated successfully');
    } catch (error) {
      next(error);
    }
  }

  async deleteProfile(req, res, next) {
    try {
      const userId = req.user.userId;

      const user = await UserModel.findByIdAndDelete(userId);
      if (!user) {
        return ResponseUtil.notFound(res, 'User not found');
      }

      // Remove refresh tokens
      await RefreshTokenModel.deleteMany({ userId });

      return ResponseUtil.success(res, null, 'Profile deleted successfully');
    } catch (error) {
      next(error);
    }
  }

  async getAllUsers(req, res, next) {
    try {
      // Check if user is admin
      if (req.user.role !== 'admin') {
        return ResponseUtil.forbidden(res, 'Access denied. Admin only.');
      }

      const users = await UserModel.find().select('-password');
      return ResponseUtil.success(res, users, 'Users retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  async updateUserRole(req, res, next) {
    try {
      // Check if user is admin
      if (req.user.role !== 'admin') {
        return ResponseUtil.forbidden(res, 'Access denied. Admin only.');
      }

      const { userId } = req.params;
      const { role } = req.body;

      if (!['user', 'admin'].includes(role)) {
        return ResponseUtil.badRequest(res, 'Invalid role. Must be "user" or "admin"');
      }

      const user = await UserModel.findByIdAndUpdate(
        userId,
        { role },
        { new: true, runValidators: true }
      ).select('-password');

      if (!user) {
        return ResponseUtil.notFound(res, 'User not found');
      }

      return ResponseUtil.success(res, user, 'User role updated successfully');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
