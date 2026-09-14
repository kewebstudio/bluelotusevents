const next = require("next");
const http = require("http");

const port = process.env.PORT || 3000;

const app = next({
  dev: false,
});

const handle = app.getRequestHandler();

app.prepare().then(() => {
  http
    .createServer((req, res) => {
      handle(req, res);
    })
    .listen(port, "0.0.0.0", () => {
      console.log(`Blue Lotus Events running on port ${port}`);
    });
});