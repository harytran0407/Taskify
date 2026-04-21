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

export async function loadDashboardTab() {
    const container = document.getElementById('dashboard-content');
    

    try
    {
        loadTabCSS('../assests/css/dashboard.css');
        const response = await fetch('tabs/dashboard.html');
        const html = await response.text();
        container.innerHTML = html;

        const username = localStorage.getItem('username') || 'Guest';
        const usernameElement = document.getElementById('dashboard-username');
        if (usernameElement) usernameElement.textContent = username;

    } 
    
    catch (error) {
        console.error('Error:', error);
        container.innerHTML = '<p class="error">An unexpected error occurred while loading the dashboard.</p>';
    }
}


