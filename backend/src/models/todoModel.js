export function addTodo(todos, taskName) {
    todos.push({ name: taskName, status: 'pending' });
}

export function deleteTodo(todos, id) {
    todos.splice(id, 1);
}

export function editTodo(todos, id, newName) {
    todos[id].name = newName;
}

export function updateStatusTodo(todos, id, status) {
    todos[id].status = status;
}

export function clearAllTodos(todos) {
    todos.splice(0, todos.length);
}