const { serverPort } = require("./src/secret");
const http = require("http");
const app = require("./app");
const connectToDB = require("./src/config/db");
const server = http.createServer(app);

const main = async () => {
  await connectToDB();
  
  // Function to find an available port
  const findAvailablePort = (startPort) => {
    return new Promise((resolve, reject) => {
      const net = require('net');
      const server = net.createServer();
      
      server.listen(startPort, () => {
        const port = server.address().port;
        server.close(() => resolve(port));
      });
      
      server.on('error', () => {
        findAvailablePort(startPort + 1).then(resolve);
      });
    });
  };

  // Find available port and start server
  findAvailablePort(serverPort).then(port => {
    server.listen(port, () => {
      console.log(
        `Gadget Hub server is running on: http://localhost:${port}`
      );
    });
  });
};

main();
