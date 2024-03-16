const app = require("./app");
const connectDB = require("./src/config/db");
const { serverPort } = require("./src/secret");

app.listen(serverPort, async () => {
  console.log(`Gadget Hub is running at: http://localhost:${serverPort}`);
  await connectDB();
});
