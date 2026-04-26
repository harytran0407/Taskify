

const toastDetails = {
    timer: 5000,
    success: {
        icon: 'fa-circle-check',
        text: 'Success',
    },
    error: {
        icon: 'fa-circle-xmark',
        text: 'Error',
    },
    warning: {
        icon: 'fa-triangle-exclamation',
        text: 'Warning',
    },
    info: {
        icon: 'fa-circle-info',
        text: 'Info',
    }
};

function removeToast(toast) {
    toast.classList.add("hide");
    if (toast.timeoutId) clearTimeout(toast.timeoutId);
    setTimeout(() => toast.remove(), 500);
}

export function showToast(type, message) {
    const notifications = document.querySelector(".notifications");
    if (!notifications) return;

    const { icon } = toastDetails[type] || toastDetails.info;

    const toast = document.createElement("li");
    toast.className = `toast ${type}`;

    toast.innerHTML = `
        <div class="column">
            <i class="fa-solid ${icon}"></i>
            <span>${message}</span>
        </div>
        <i class="fa-solid fa-xmark"></i>
    `;

    // nút đóng
    toast.querySelector(".fa-xmark").addEventListener("click", () => {
        removeToast(toast);
    });

    notifications.appendChild(toast);

    toast.timeoutId = setTimeout(() => removeToast(toast), toastDetails.timer);
}