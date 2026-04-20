let todos = [];
let editId;
let isEditedTask = false;

// Get todos from localStorage
function getTodos() {
    const stored = localStorage.getItem('todos');
    return stored ? JSON.parse(stored) : [];
}

// Save todos to localStorage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Add todo
function addTodo(userTask) {
    todos.push({
        id: Date.now(),
        title: userTask,
        completed: false,
        createdAt: new Date().toISOString()
    });
    saveTodos();
}

// Delete todo
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== parseInt(id));
    saveTodos();
}

// Edit todo
function editTodo(id, userTask) {
    const todo = todos.find(t => t.id === parseInt(id));
    if (todo) {
        todo.title = userTask;
        saveTodos();
    }
}

// Update todo status
function updateStatusTodo(id, status) {
    const todo = todos.find(t => t.id === parseInt(id));
    if (todo) {
        todo.completed = status === 'completed';
        saveTodos();
    }
}

// Clear all todos
function clearAllTodos() {
    todos = [];
    saveTodos();
}

// Render todos on page
function renderTodos(filter = 'all') {
    const taskBox = document.querySelector('.task-box');
    if (!taskBox) return;
    
    taskBox.innerHTML = '';
    
    const filtered = filter === 'completed' 
        ? todos.filter(t => t.completed)
        : filter === 'pending'
        ? todos.filter(t => !t.completed)
        : todos;
    
    filtered.forEach(todo => {
        const li = document.createElement('li');
        li.className = todo.completed ? 'completed' : '';
        li.dataset.id = todo.id;
        li.innerHTML = `
            <input type="checkbox" ${todo.completed ? 'checked' : ''} class="todo-checkbox">
            <span>${todo.title}</span>
            <div class="todo-actions">
                <button class="edit-btn" data-id="${todo.id}">Edit</button>
                <button class="delete-btn" data-id="${todo.id}">Delete</button>
            </div>
        `;
        taskBox.appendChild(li);
    });
}

export function initTodoApp() {
    todos = getTodos();
    
    const taskInput = document.querySelector('.task-input input');
    const clearAll = document.querySelector('.clear-btn');
    const filters = document.querySelectorAll('.filters span');
    const sidebar = document.querySelectorAll('.sidebar-menu li');

    if (!taskInput) return; // Only initialize if DOM elements exist

    // render lần đầu
    renderTodos('all');

    // filter
    filters.forEach(btn => {
        btn.addEventListener('click', () => {
            const activeSpan = document.querySelector('span.active');
            if (activeSpan) activeSpan.classList.remove('active');
            btn.classList.add('active');
            renderTodos(btn.id);
        });
    });

    // sidebar
    sidebar.forEach(btn => {
        btn.addEventListener('click', () => {
            const activeItem = document.querySelector('li.active');
            if (activeItem) activeItem.classList.remove('active');
            btn.classList.add('active');
        });
    });

    // add / edit task
    taskInput.addEventListener('keyup', e => {
        let userTask = taskInput.value.trim();

        if (e.key == 'Enter' && userTask) {
            if (!isEditedTask) {
                addTodo(userTask);
            } else {
                editTodo(editId, userTask);
                isEditedTask = false;
            }

            taskInput.value = '';
            const activeSpan = document.querySelector('span.active');
            renderTodos(activeSpan ? activeSpan.id : 'all');
        }
    });

    // clear all
    if (clearAll) {
        clearAll.addEventListener('click', () => {
            clearAllTodos();
            renderTodos('all');
        });
    }

    // event delegation (quan trọng)
    document.addEventListener('click', e => {
        // checkbox
        if (e.target.classList.contains('todo-checkbox')) {
            const li = e.target.closest('li');
            const id = li.dataset.id;
            const status = e.target.checked ? 'completed' : 'pending';
            updateStatusTodo(id, status);
            li.classList.toggle('completed');
            const activeSpan = document.querySelector('span.active');
            renderTodos(activeSpan ? activeSpan.id : 'all');
        }

        // delete
        if (e.target.classList.contains('delete-btn')) {
            const id = e.target.dataset.id;
            deleteTodo(id);
            const activeSpan = document.querySelector('span.active');
            renderTodos(activeSpan ? activeSpan.id : 'all');
        }

        // edit
        if (e.target.classList.contains('edit-btn')) {
            const id = e.target.dataset.id;
            const todo = todos.find(t => t.id === parseInt(id));
            if (todo && taskInput) {
                taskInput.value = todo.title;
                taskInput.focus();
                editId = id;
                isEditedTask = true;
            }
        }
    });
}