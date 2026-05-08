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


/* ================= SELECT ONE ================= */

export function handleSelectTask(circle, taskEdit) {

    const id = circle.dataset.id;

    // active | completed
    const type = circle.dataset.type;

    // toggle đúng group
    toggleTask(id, type);

    const isSelected = getSelectedSet(type).has(String(id));

    circle.classList.toggle('selected', isSelected);

    // chỉ task đúng group
    const filteredTasks = taskEdit.filter(task => {

        if (type === 'active') {
            return !Number(task.completed);
        }

        return Number(task.completed);
    });

    // selected đúng group
    const selectedIds = getSelectedTasks(type);

    const selectedInGroup = filteredTasks.filter(task =>
        selectedIds.includes(String(task.id))
    );

    const allSelected =
        filteredTasks.length === selectedInGroup.length;

    // button đúng group
    const selectAllBtn = document.querySelector(
        `.select-all-btn[data-type="${type}"]`
    );

    if (selectAllBtn) {

        selectAllBtn.textContent =
            allSelected
                ? 'Unselect All'
                : 'Select All';
    }

    updateBulkActions();
}


/* ================= SELECT ALL ================= */

export function handleSelectAll(taskEdit, type = 'active') {

    // chỉ task đúng group
    const filteredTasks = taskEdit.filter(task => {

        if (type === 'active') {
            return !Number(task.completed);
        }

        return Number(task.completed);
    });

    const selectedIds = getSelectedTasks(type);

    const selectedInGroup = filteredTasks.filter(task =>
        selectedIds.includes(String(task.id))
    );

    const allSelected =
        filteredTasks.length === selectedInGroup.length;

    const selectAllBtn = document.querySelector(
        `.select-all-btn[data-type="${type}"]`
    );

    /* ================= UNSELECT ================= */

    if (allSelected) {

        filteredTasks.forEach(task => {

            toggleTask(String(task.id), type);
        });

        document.querySelectorAll('.status-circle').forEach(circle => {

            if (circle.dataset.type === type) {

                circle.classList.remove('selected');
            }
        });

        if (selectAllBtn) {
            selectAllBtn.textContent = 'Select All';
        }
    }

    /* ================= SELECT ================= */

    else {

        // clear đúng group
        clearSelection(type);

        // select đúng group
        selectAllTasks(filteredTasks, type);

        document.querySelectorAll('.status-circle').forEach(circle => {

            if (circle.dataset.type === type) {

                circle.classList.add('selected');
            }
        });

        if (selectAllBtn) {
            selectAllBtn.textContent = 'Unselect All';
        }
    }

    updateBulkActions();
}


/* ================= BULK DELETE ================= */

export async function handleBulkDelete(
    loadTasks,
    type = 'active'
) {

    const ids = getSelectedTasks(type);

    if (ids.length === 0) return;

    if (!confirm(`Delete ${ids.length} tasks?`)) return;

    await Promise.all(
        ids.map(id => deleteTask(Number(id)))
    );

    clearSelection(type);

    updateBulkActions();

    await loadTasks();
}


/* ================= BULK COMPLETE ================= */

export async function handleBulkComplete(
    loadTasks,
    type = 'active'
) {

    const ids = getSelectedTasks(type);

    if (ids.length === 0) return;

    await Promise.all(
        ids.map(id => markTaskComplete(Number(id)))
    );

    clearSelection(type);

    updateBulkActions();

    await loadTasks();
}