const list = document.getElementById("todoList");

fetchTodos();

function fetchTodos() {
    fetch("/api/todos")
        .then(res => res.json())
        .then(data => {
            list.innerHTML = "";

            data.forEach(todo => {
                const li = document.createElement("li");
                li.innerHTML = `
                ${todo.task}
                 <input type="checkbox" ${todo.completed ? "checked" : ""} 
                  onchange="toggleComplete(${todo.id}, this.checked)">
                  <span class="${todo.completed ? 'done' : ''}">${todo.task}</span>

                  <button class="deleteBtn" onclick="deleteTodo(${todo.id})">Delete</button>
            `;
                list.appendChild(li);
            });
        });
}

function addTodo() {
    const input = document.getElementById("taskInput");
    const task = input.value;

    fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task })
    })
        .then(() => {
            input.value = "";
            fetchTodos();
        });
}

function deleteTodo(id) {
    fetch("/api/todos/" + id, {
        method: "DELETE"
    })
        .then(() => fetchTodos());
}

function toggleComplete(id, completed) {
    fetch("/api/todos/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed })
    }).then(() => fetchTodos());
}