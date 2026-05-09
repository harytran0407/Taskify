const state = {
    active: new Set(),
    completed: new Set()
};

const VALID_TYPES = ['active', 'completed'];

function validateType(type) {

    if (!VALID_TYPES.includes(type)) {
        throw new Error(`Invalid type: ${type}`);
    }
}

function getSet(type) {

    validateType(type);

    return state[type];
}


/* ================= TOGGLE ================= */

export function toggleTask(id, type) {

    const selectedSet = getSet(type);

    const key = String(id);

    if (selectedSet.has(key)) {
        selectedSet.delete(key);
    } else {
        selectedSet.add(key);
    }
}


/* ================= CLEAR ================= */

export function clearSelection(type) {

    getSet(type).clear();
}


/* ================= GETTERS ================= */

export function getSelectedTasks(type) {

    return [...getSet(type)];
}

export function getSelectedSet(type) {

    return getSet(type);
}

export function isSelected(id, type) {

    return getSet(type).has(String(id));
}

export function getSelectedCount(type) {

    return getSet(type).size;
}


/* ================= SELECT ALL ================= */

export function selectAllTasks(tasks, type) {

    const selectedSet = getSet(type);

    tasks.forEach(task => {
        selectedSet.add(String(task.id));
    });
}


/* ================= HELPERS ================= */

export function areAllTasksSelected(tasks, type) {

    if (!tasks.length) return false;

    const selectedSet = getSet(type);

    return tasks.every(task =>
        selectedSet.has(String(task.id))
    );
}