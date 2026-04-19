import { initTodoApp } from './todoController.js';
import { updateDateTime } from './dateUtils.js';

// Check login status on page load
function setupAuthUI() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');
    
    const profileSection = document.getElementById('profile-section');
    const authButtons = document.getElementById('auth-buttons');
    const logoutBtn = document.getElementById('logout-btn');

    if (token && username && email) {
        // User is logged in
        profileSection.style.display = 'block';
        authButtons.style.display = 'none';
        logoutBtn.style.display = 'flex';

        const usernameElement = document.querySelector('.profile h3');
        const emailElement = document.querySelector('.profile p');
        
        if (usernameElement) usernameElement.textContent = username;
        if (emailElement) emailElement.textContent = email;

        // Initialize todo app only for logged-in users
        initTodoApp();
    } else {
        // User is not logged in
        profileSection.style.display = 'none';
        authButtons.style.display = 'flex';
        logoutBtn.style.display = 'none';
    }
}

// Handle logout
function setupLogout() {
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

// chạy thời gian
updateDateTime();
setInterval(updateDateTime, 1000);

// Setup UI and logout
setupAuthUI();
setupLogout();