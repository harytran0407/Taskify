import { getTodos, saveTodos } from '../services/storageService.js';
import { addTodo, deleteTodo, editTodo, updateStatusTodo, clearAllTodos } from '../models/todoModel.js';
import { renderTodos } from '../views/todoView.js';

let todos = getTodos();
let editId;
let isEditedTask = false;

export function initTodoApp() {
    const taskInput = document.querySelector('.task-input input');
    const clearAll = document.querySelector('.clear-btn');
    const filters = document.querySelectorAll('.filters span');
    const sidebar = document.querySelectorAll('.sidebar-menu li');

    // render lần đầu
    renderTodos(todos, 'all');

    // filter
    filters.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('span.active').classList.remove('active');
            btn.classList.add('active');
            renderTodos(todos, btn.id);
        });
    });

    // sidebar
    sidebar.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('li.active').classList.remove('active');
            btn.classList.add('active');
        });
    });

    // add / edit task
    taskInput.addEventListener('keyup', e => {
        let userTask = taskInput.value.trim();

        if (e.key == 'Enter' && userTask) {
            if (!isEditedTask) {
                addTodo(todos, userTask);
            } else {
                editTodo(todos, editId, userTask);
                isEditedTask = false;
            }

            taskInput.value = '';
            saveTodos(todos);
            renderTodos(todos, document.querySelector('span.active').id);
        }
    });

    // clear all
    clearAll.addEventListener('click', () => {
        clearAllTodos(todos);
        saveTodos(todos);
        renderTodos(todos, 'all');
    });

    // event delegation (quan trọng)
    document.addEventListener('click', e => {
        const id = e.target.dataset.id;

        // checkbox
        if (e.target.type === 'checkbox') {
            const status = e.target.checked ? 'completed' : 'pending';
            updateStatusTodo(todos, id, status);
            saveTodos(todos);
            renderTodos(todos, document.querySelector('span.active').id);
        }

        // delete
        if (e.target.closest('.delete-btn')) {
            deleteTodo(todos, id);
            saveTodos(todos);
            renderTodos(todos, document.querySelector('span.active').id);
        }

        // edit
        if (e.target.closest('.edit-btn')) {
            const taskInput = document.querySelector('.task-input input');
            editId = id;
            isEditedTask = true;
            taskInput.value = todos[id].name;
        }

        // menu
        if (e.target.classList.contains('menu-btn')) {
            let menu = e.target.nextElementSibling;
            menu.classList.toggle('show');
        } else {
            document.querySelectorAll('.task-menu').forEach(m => m.classList.remove('show'));
        }
    });
}