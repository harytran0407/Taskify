// Handle logout
export function setupLogout() {
    const logoutBtn = document.getElementById('logout-btn');
    logoutBtn.addEventListener('click', function() {
        // Clear localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('email');

        // Redirect to login page
        window.location.href = 'index.html';
    });
}