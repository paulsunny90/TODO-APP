const db = require("./db");

async function getTodos(req, res) {
    try {
        const todos = await db.findAll();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(todos));
    } catch (err) {
        res.writeHead(500);
        res.end("Error fetching todos");
    }
}

async function addTodo(req, res) {
    let body = "";
    req.on("data", chunk => body += chunk.toString());

    req.on("end", async () => {
        try {
            const data = JSON.parse(body);
            const id = await db.createOne({ task: data.task });
            const newTodo = await db.findById(id);
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify(newTodo));
        } catch (err) {
            res.writeHead(500);
            res.end("Error adding todo");
        }
    });
}

async function deleteTodo(req, res, id) {
    if (!db.isValidId(id)) {
        res.writeHead(400);
        return res.end("Invalid ID");
    }
    try {
        const result = await db.deleteById(id);
        if (result.deletedCount === 0) {
            res.writeHead(404);
            return res.end("Todo not found");
        }
        res.writeHead(200);
        res.end("Deleted");
    } catch (err) {
        res.writeHead(500);
        res.end("Error deleting todo");
    }
}

async function updateTodo(req, res, id) {
    if (!db.isValidId(id)) {
        res.writeHead(400);
        return res.end("Invalid ID");
    }
    let body = "";
    req.on("data", chunk => body += chunk.toString());

    req.on("end", async () => {
        try {
            const data = JSON.parse(body);
            const result = await db.updateById(id, { status: data.status });
            if (result.matchedCount === 0) {
                res.writeHead(404);
                return res.end("Todo not found");
            }
            res.writeHead(200);
            res.end("Updated");
        } catch (err) {
            res.writeHead(500);
            res.end("Error updating todo");
        }
    });
}

module.exports = {
    getTodos,
    addTodo,
    deleteTodo,
    updateTodo
};
