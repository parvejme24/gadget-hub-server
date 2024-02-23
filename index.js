const app = require("./src/app");
const port = 6060;

app.listen(() => {
  console.log(`gadget-hub server is running at http://localhost:${port}`);
});
