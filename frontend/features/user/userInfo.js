export function loadInformationTab() {
    const username = localStorage.getItem('username') || '-';
    const email = localStorage.getItem('email') || '-';
    const joinedDate = localStorage.getItem('joinedDate') || 'Not available';
    const contactNumber = localStorage.getItem('contactNumber') || '';
    return `
<div id="information-content">
<h1 id="info-header">Account Information</h1>
<div class="info-container">
    <div class="info-section user-info">
        <div class="user-details">
            <div class="detail-item">
                <label>Username:</label>
                <input type="text" id="user-username" value="${username}" readonly>
            </div>
            <div class="detail-item">
                <label>Email:</label>
                <input type="text" id="user-email" value="${email}" readonly>
            </div>
            <div class="detail-item">
                <label>Member Since:</label>
                <span id="user-joined">${joinedDate}</span>
            </div>
            <div class="detail-item">
                <label>Contact Number:</label>
                <input type="text" id="user-contact" value="${contactNumber}" placeholder="Enter contact number" readonly>
            </div>

            <div class="info-button">
                <button id="edit-info-btn">Edit Information</button>
                <button id="change-password-btn">Change Password</button>
            </div>
        </div>
    </div>

    
    
</div>
</div>
    `;
}
