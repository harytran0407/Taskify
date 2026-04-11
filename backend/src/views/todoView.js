export function renderTodos(todos, filter) {
    const taskBox = document.querySelector('.task-box');
    const clearAll = document.querySelector('.clear-btn');

    let liTag = '';

    todos.forEach((todo, id) => {
        let completed = todo.status == 'completed' ? 'checked' : '';

        if (filter == todo.status || filter == 'all') {
            liTag += `<li class="task">
                        <label for="${id}">
                            <input type="checkbox" data-id="${id}" ${completed}>
                            <p class="${completed}">${todo.name}</p>
                        </label>
                        <div class="settings">
                            <i class="uil uil-ellipsis-h menu-btn"></i>
                            <ul class="task-menu">
                                <li class="edit-btn" data-id="${id}"><i class="uil uil-pen"></i>Edit</li>
                                <li class="delete-btn" data-id="${id}"><i class="uil uil-trash"></i>Delete</li>
                            </ul>
                        </div>
                    </li>`;
        }
    });

    taskBox.innerHTML = liTag || `<span>You don't have any task here</span>`;

    let checkTask = taskBox.querySelectorAll('.task');
    !checkTask.length ? clearAll.classList.remove('active') : clearAll.classList.add('active');

    taskBox.offsetHeight >= 300
        ? taskBox.classList.add('overflow')
        : taskBox.classList.remove('overflow');
}