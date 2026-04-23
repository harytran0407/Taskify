// Handle logout
export function setupLogout() {
    const logoutBtn = document.getElementById('logout-btn');
    logoutBtn.addEventListener('click', function() {
        // Clear localStorage
        localStorage.clear();       

        // Redirect to login page
        window.location.href = 'index.html';
    });
}