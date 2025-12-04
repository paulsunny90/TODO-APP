const fs = require("fs");
const path = require("path");
const { json } = require("stream/consumers");

const filePath = path.join(__dirname, "storage.json");

function readTodos() {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([]));
    }

    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data || "[]");
}

function saveTodos(todos) {
    fs.writeFile(filePath, JSON.stringify(todos, null, 2), err => {
        if (err) console.log("Write error:", err);
    });
}

function getTodos(req, res) {
    const todos = readTodos();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(todos));
}

function addTodo(req, res) {
    let body = "";

    req.on("data", chunk => {
        body += chunk.toString();
    });

    req.on("end", () => {
        const data = JSON.parse(body);

        const todos = readTodos();

        const newTodo = {
            id: Date.now(),
            task: data.task
        };

        todos.push(newTodo);

        saveTodos(todos);

        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(newTodo));
    });
}

function deleteTodo(req, res, id) {
    let todos = readTodos();

    todos = todos.filter(todo => todo.id != id);

    saveTodos(todos);

    res.writeHead(200);
    res.end("Deleted");
}

function puttodo(req,res,id){

    let body=""

    req.on("data",chunk=>{
        body+= chunk.toString();

    });

    req.on(end,()=>{
        const data=JSON.parse(body)
        
         let todos = readTodos();

        todo =todo.map(todo=> todo.id =id?{...todo,completed:data.completed }:todo);
        saveTodos(todos);

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "updated" }));
    });
    


};


module.exports = {
    getTodos,
    addTodo,
    deleteTodo,
    puttodo
};










