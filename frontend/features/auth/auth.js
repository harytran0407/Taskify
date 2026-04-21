
// Check login status on page load
export function setupAuthUI() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');
    const joinedDate = localStorage.getItem('joinedDate');

    const profileSection = document.getElementById('profile-section');
    const authButtons = document.getElementById('auth-buttons');
    const logoutBtn = document.getElementById('logout-btn');

    if (token && username && email) {
        // User is logged in
        profileSection.style.display = 'block';
        authButtons.style.display = 'none';
        logoutBtn.style.display = 'flex';

        const usernameElement = document.getElementById('username');
        const emailElement = document.getElementById('email');

        if (usernameElement) usernameElement.textContent = username;
        if (emailElement) emailElement.textContent = email;

        // Initialize todo app only for logged-in users
        // initTodoApp();
    } else {
        // User is not logged in
        profileSection.style.display = 'none';
        authButtons.style.display = 'flex';
        logoutBtn.style.display = 'none';
    }
}
