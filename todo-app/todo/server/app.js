const http = require("http");
const router = require("./router");
const connectDB = require("./db");

// Connect to MongoDB
connectDB();

const server = http.createServer((req, res) => {
    router(req, res);
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
