export function loadChangePasswordTab() {
    return `
<div id="information-content">
    <h1 id="info-header">Change Password</h1>

    <div class="info-container">
        <div class="info-section user-info">
            <div class="user-details">

                <div class="detail-item">
                    <label>Current Password:</label>
                    <input type="password" id="current-password" placeholder="Enter current password">
                    <i class="uil uil-eye toggle-password"></i>                  
                
                </div>

                <div class="detail-item">
                    <label>New Password:</label>
                    <input type="password" id="new-password" placeholder="Enter new password">
                    <i class="uil uil-eye toggle-password"></i>
                </div>

                <div class="detail-item">
                    <label>Confirm Password:</label>
                    <input type="password" id="confirm-password" placeholder="Confirm new password">
                    <i class="uil uil-eye toggle-confirm"></i>

                </div>

                <div class="info-button">
                    <button id="save-password-btn" class="btn">Save</button>
                    <button id="cancel-password-btn" class="btn">Cancel</button>
                </div>

                <div class="success-message" id="password-success-message" style="display: none;">
                    Password changed successfully!
                </div>

                <div class="error-message" id="password-error-message" style="display: none;">
                    Error changing password.
                </div>

            </div>
        </div>
    </div>
</div>
    `;
}