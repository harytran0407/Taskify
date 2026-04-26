export function showToast(type, message) {
    const container = document.getElementById('toast-container');

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icon = type === 'success' ? '✔️' : '❌';
    toast.innerHTML = `${icon} ${message}`;

    container.appendChild(toast);

    // auto remove sau 3s
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';

        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}