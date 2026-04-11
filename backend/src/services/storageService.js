export function getTodos() {
    return JSON.parse(localStorage.getItem('todo-list')) || [];
}

export function saveTodos(todos) {
    localStorage.setItem('todo-list', JSON.stringify(todos));
}