const UserModel = require("./user.model");
const ResponseUtil = require("../../shared/utils/response.util");

class UserController {
  async createUser(req, res, next) {
    try {
      const user = new UserModel(req.body);
      const savedUser = await user.save();
      return ResponseUtil.created(res, savedUser, "User created successfully");
    } catch (error) {
      next(error);
    }
  }

  async getAllUsers(req, res, next) {
    try {
      const users = await UserModel.find().select('-password');
      return ResponseUtil.success(res, users, "Users retrieved successfully");
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req, res, next) {
    try {
      const user = await UserModel.findById(req.params.id).select('-password');
      if (!user) {
        return ResponseUtil.notFound(res, "User not found");
      }
      return ResponseUtil.success(res, user, "User retrieved successfully");
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
      const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      }).select('-password');
      if (!user) {
        return ResponseUtil.notFound(res, "User not found");
      }
      return ResponseUtil.success(res, user, "User updated successfully");
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const user = await UserModel.findByIdAndDelete(req.params.id);
      if (!user) {
        return ResponseUtil.notFound(res, "User not found");
      }
      return ResponseUtil.success(res, null, "User deleted successfully");
    } catch (error) {
      next(error);
    }
  }

  async getUserByEmail(req, res, next) {
    try {
      const { email } = req.params;
      const user = await UserModel.findOne({ email: email.toLowerCase() }).select('-password');
      if (!user) {
        return ResponseUtil.notFound(res, "User not found");
      }
      return ResponseUtil.success(res, user, "User retrieved successfully");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
