const http = require("http");
const router = require("./router");
const db = require("./db");


db.connect()
  .then(() => {
    const server = http.createServer((req, res) => {
      router(req, res);
    });

    server.listen(3000, () => {
      console.log("Server running at http://localhost:3000");
    });
  })
  .catch(err => {
    console.error("DB connection failed:", err);
  });
