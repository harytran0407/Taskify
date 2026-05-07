const state = {
    selected: new Set()
};

// ACTIONS
export function toggleTask(id) {
    if (state.selected.has(id)) {
        state.selected.delete(id);
    } else {
        state.selected.add(id);
    }
}

export function clearSelection() {
    state.selected.clear();
}

// GETTERS
export function getSelectedTasks() {
    return [...state.selected];
}

export function getSelectedSet() {
    return state.selected;
}

export function isSelected(id) {
    return state.selected.has(id);
}

export function getSelectedCount() {
    return state.selected.size;
}

export function selectAllTasks(tasks){
    tasks.forEach(task => {
        state.selected.add(String(task.id));
    });
}

