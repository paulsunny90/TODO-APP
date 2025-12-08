const Todo = require("./models/todo");

async function getTodos(req, res) {
    const todos = await Todo.find();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(todos));
}

async function addTodo(req, res) {
    let body = "";
    req.on("data", chunk => body += chunk.toString());

    req.on("end", async () => {
        const data = JSON.parse(body);
        const newTodo = await Todo.create({ task: data.task });
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(newTodo));
    });
}

async function deleteTodo(req, res, id) {
    await Todo.findByIdAndDelete(id);
    res.writeHead(200);
    res.end("Deleted");
}

async function updateTodo(req, res, id) {
    let body = "";
    req.on("data", chunk => body += chunk.toString());

    req.on("end", async () => {
        const data = JSON.parse(body);
        await Todo.findByIdAndUpdate(id, { status: data.status });
        res.writeHead(200);
        res.end("Updated");
    });
}

module.exports = {
    getTodos,
    addTodo,
    deleteTodo,
    updateTodo
};
