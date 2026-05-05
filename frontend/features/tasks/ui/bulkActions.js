import { getSelectedCount } from '../state/taskState.js';

export function updateBulkActions() {
    const bulk = document.getElementById('bulkActions');
    const countEl = document.querySelector('.selected-count');

    if (!bulk) return;

    const count = getSelectedCount();

    if (count > 0) {
        bulk.style.display = 'flex';
        if (countEl) countEl.textContent = `${count} selected`;
    } else {
        bulk.style.display = 'none';
    }
}