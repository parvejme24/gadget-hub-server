const app = require("./src/app");
const connectDB = require("./src/config/db");
require("dotenv").config();
const port = process.env.PORT || 6060;

app.listen(port, async () => {
  console.log(`gadget-hub server is running at http://localhost:${port}`);
  await connectDB();
});
