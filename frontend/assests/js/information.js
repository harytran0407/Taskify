// Load and populate information tab
function loadTabCSS(href) {
    // Xóa CSS cũ (nếu có)
    const oldLink = document.getElementById("tab-style");
    if (oldLink) oldLink.remove();

    // Tạo link CSS mới
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href + '?v=2' + Date.now();
    link.id = "tab-style";

    document.head.appendChild(link);
}

export async function loadInformationTab() {
    const container = document.getElementById('information-content');

    try {
        loadTabCSS('../assests/css/userInfo.css');
        // Fetch the information.html file
        const response = await fetch('tabs/userInfo.html');
        const html = await response.text();
        container.innerHTML = html;

        // Get user data from localStorage
        const username = localStorage.getItem('username') || '-';
        const email = localStorage.getItem('email') || '-';
        const joinedDate = localStorage.getItem('joinedDate') || 'Not available';
        const token = localStorage.getItem('token');

        // Update user information
        const usernameElement = document.getElementById('user-username');
        const emailElement = document.getElementById('user-email');
        const statusElement = document.getElementById('user-status');
        const joinedElement = document.getElementById('user-joined');

        if (usernameElement) usernameElement.value = username;
        if (emailElement) emailElement.value = email;
        if (joinedElement) joinedElement.textContent = joinedDate;

        // Update status
        if (statusElement) {
            if (token && username && email) {
                statusElement.textContent = 'Active';
                statusElement.className = 'status-active';
            } else {
                statusElement.textContent = 'Not Logged In';
                statusElement.className = 'status-inactive';
            }
        }

        // Calculate and update statistics
        const todos = JSON.parse(localStorage.getItem('todos') || '[]');
        const totalTasks = todos.length;
        const completedTasks = todos.filter(todo => todo.completed).length;
        const pendingTasks = totalTasks - completedTasks;

        const totalElement = document.getElementById('total-tasks');
        const completedElement = document.getElementById('completed-tasks');
        const pendingElement = document.getElementById('pending-tasks');

        if (totalElement) totalElement.textContent = totalTasks;
        if (completedElement) completedElement.textContent = completedTasks;
        if (pendingElement) pendingElement.textContent = pendingTasks;
    } catch (error) {
        console.error('Error loading information tab:', error);
        container.innerHTML = '<p>Error loading information. Please try again.</p>';
    }
}
