// const app = require("./app");
// const connectDB = require("./src/config/db");
// const { serverPort } = require("./src/secret");

// app.listen(serverPort, async () => {
//   console.log(`Gadget Hub is running at: http://localhost:${serverPort}`);
//   await connectDB();
// });

require("dotenv").config;
const http = require("http");
const app = require("./app");
const connectToDB = require("./src/config/db");
const server = http.createServer(app);
const port = process.env.PORT || 5000;

const main = async () => {
  await connectToDB();
  server.listen(port, () => {
    console.log(`Gadget Hub server is running on: http://localhost:${port}`);
  });
};

main();
