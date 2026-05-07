import {
    clearSelection,
    getSelectedTasks,
    selectAllTasks,
    toggleTask,
    getSelectedSet
} from '../../state/taskState.js';

import { deleteTask } from '../../services/deleteTask.js';
import { markTaskComplete } from '../../services/completeTask.js';
import { updateBulkActions } from './bulkActions.js';

/* ===== SELECT ONE ===== */
export function handleSelectTask(circle, taskEdit) {
    const selectAllBtn = document.getElementById('selectAllBtn');
    const id = circle.dataset.id;

    toggleTask(id);

    const isSelected = getSelectedSet().has(id);

    circle.classList.toggle('selected', isSelected);

    const activeTasks = taskEdit.filter(task => !task.completed);
    const allSelected = activeTasks.length === getSelectedTasks().length;

    selectAllBtn.textContent =
        allSelected
            ? 'Unselect All'
            : 'Select All';

    updateBulkActions();
}

/* ===== SELECT ALL ===== */
export function handleSelectAll(taskEdit) {
    const selectAllBtn = document.getElementById('selectAllBtn');

    const activeTasks = taskEdit.filter(task => !task.completed);

    const allSelected =
        activeTasks.length === getSelectedTasks().length;

    if (allSelected) {

        clearSelection();

        document.querySelectorAll('.status-circle').forEach(circle => {
            circle.classList.remove('selected');
        });

    } else {

        clearSelection();

        selectAllTasks(activeTasks);

        document.querySelectorAll('.status-circle').forEach(circle => {
            circle.classList.add('selected');
        });
        selectAllBtn.textContent = 'Unselect All';

    }

    updateBulkActions();
}


/* ===== BULK DELETE ===== */
export async function handleBulkDelete(loadTasks) {

    const ids = getSelectedTasks();

    if (ids.length === 0) return;

    if (!confirm(`Delete ${ids.length} tasks?`)) return;

    await Promise.all(
        ids.map(id => deleteTask(Number(id)))
    );

    clearSelection();

    updateBulkActions();

    loadTasks();
}


/* ===== BULK COMPLETE ===== */
export async function handleBulkComplete(loadTasks) {

    const ids = getSelectedTasks();

    if (ids.length === 0) return;

    await Promise.all(
        ids.map(id => markTaskComplete(Number(id)))
    );

    clearSelection();

    updateBulkActions();

    loadTasks();
}