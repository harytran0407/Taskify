const taskInput = document.querySelector('.task-input input');
const taskBox = document.querySelector('.task-box');
const clearAll = document.querySelector('.clear-btn');
const filters = document.querySelectorAll('.filters span');

let editId;
let isEditedTask = false;
let todos = JSON.parse(localStorage.getItem('todo-list'));

filters.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('span.active').classList.remove('active');
        btn.classList.add('active');
        showTodo(btn.id);
    });
});

function showTodo(filter) {
    let liTag = '';
    if (todos) {
        todos.forEach((todo, id) => {
            let completed = todo.status == 'completed' ? 'checked' : '';
            if (filter == todo.status || filter == 'all') {
                liTag += `<li class="task">
                            <label for="${id}">
                                <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${completed}>
                                <p class="${completed}">${todo.name}</p>
                            </label>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="task-menu">
                                    <li onclick="editTask(${id}, '${todo.name}')"><i class="uil uil-pen"></i>Edit</li>
                                    <li onclick="deleteTask(${id})"><i class="uil uil-trash"></i>Delete</li>
                                </ul>
                            </div>
                        </li>`;
            }   
        });
    }
    taskBox.innerHTML = liTag || `<span>You don't have any task here</span>`;
    let checkTask = taskBox.querySelectorAll('.task');
    !checkTask.length ? clearBtn.classList.remove('active') : clearAll.classList.add('active');
    taskBox.offsetHeight >= 300 ? taskBox.classList.add('overflow') : taskBox.classList.remove('overflow');
}


function showMenu(selectedTask) {
    let taskMenu = selectedTask.parentElement.lastElementChild;
    taskMenu.classList.add('show');
    document.addEventListener('click', e => {
        if (e.target.tagName != 'I' || e.target != selectedTask) {
            taskMenu.classList.remove('show');
        }
    });
}

function updateStatus(selectedTask) {
    let taskName = selectedTask.parentElement.lastElementChild;
    if (selectedTask.checked) {
        taskName.classList.add('checked');
        todos[selectedTask.id].status = 'completed';
    } else {
        taskName.classList.remove('checked');
        todos[selectedTask.id].status = 'pending';
    }   
    localStorage.setItem('todo-list', JSON.stringify(todos));
    showTodo(document.querySelector('span.active').id);
}

function editTask(taskId, taskName) {
    editId = taskId;
    isEditedTask = true;
    taskInput.value = taskName;
}

function deleteTask(deleteId) {
    todos.splice(deleteId, 1);
    localStorage.setItem('todo-list', JSON.stringify(todos));
    showTodo(document.querySelector('span.active').id);
}

clearAll.addEventListener('click', () => {
    todos.splice(0, todos.length);
    localStorage.setItem('todo-list', JSON.stringify(todos));
    showTodo('all');
});

taskInput.addEventListener('keyup', e => {
    let userTask = taskInput.value.trim();
    if (e.key == 'Enter' && userTask) {
        if (!isEditedTask) {
            if (!todos) {
                todos = [];
            }
            let taskInfo = { name: userTask, status: 'pending' };
            todos.push(taskInfo);
        } else {
            isEditedTask = false;
            todos[editId].name = userTask;
        }   
        taskInput.value = '';
        localStorage.setItem('todo-list', JSON.stringify(todos));
        showTodo(document.querySelector('span.active').id);
    }
});