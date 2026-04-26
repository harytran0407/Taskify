import { loadTab } from '../tabs/tabController.js';
export function setupChangePassword() {
        const currentPasswordInput = document.getElementById('current-password'); // Thêm input mật khẩu hiện tại
        const newPasswordInput = document.getElementById('new-password'); // Thêm input mật khẩu mới
        const confirmPasswordInput = document.getElementById('confirm-password'); // Thêm input xác nhận mật khẩu mới
        const togglePasswordIcons = document.querySelectorAll('.toggle-password'); // Thêm các icon toggle mật khẩu
        const savePasswordBtn = document.getElementById('save-password-btn'); // Thêm nút lưu mật khẩu mới
        const cancelPasswordBtn = document.getElementById('cancel-password-btn'); // Thêm nút hủy đổi mật khẩu
        const passwordSuccessMessage = document.getElementById('password-success-message'); // Thêm phần tử hiển thị thông báo thành công
        const passwordErrorMessage = document.getElementById('password-error-message'); // Thêm phần tử hiển thị thông báo lỗi
        
        // Thêm sự kiện click cho các icon toggle mật khẩu
        togglePasswordIcons.forEach(icon => {
            icon.addEventListener('click', () => {
                const input = icon.previousElementSibling; // Lấy input liên quan đến icon
                if (input.type === 'password') {
                    input.type = 'text';
                    icon.classList.remove('uil-eye');
                    icon.classList.add('uil-eye-slash');
                }
                else {
                    input.type = 'password';
                    icon.classList.remove('uil-eye-slash');
                    icon.classList.add('uil-eye');
                }
            });
        }
        );

        if (!savePasswordBtn) {
            console.error('Save Password button not found!');
            return;
        }
        savePasswordBtn.addEventListener('click', async () => {
            const currentPassword = currentPasswordInput.value.trim();
            const newPassword = newPasswordInput.value.trim();
            const confirmPassword = confirmPasswordInput.value.trim();

            passwordErrorMessage.style.display = 'none';
            passwordSuccessMessage.style.display = 'none';

            if (!currentPassword || !newPassword || !confirmPassword) {
                passwordErrorMessage.textContent = 'Vui lòng điền vào tất cả các trường.';
                passwordErrorMessage.style.display = 'block';
                return;
            }

            if (newPassword !== confirmPassword) {
                passwordErrorMessage.textContent = 'Mật khẩu mới và xác nhận mật khẩu không khớp.';
                passwordErrorMessage.style.display = 'block';
                passwordSuccessMessage.style.display = 'none';
                return;
            }
            try {
                //Disable the button to prevent multiple clicks
                savePasswordBtn.disabled = true;
                
                // Gửi yêu cầu đổi mật khẩu lên server
                const response = await fetch('http://localhost:3000/api/users/password', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({ currentPassword, newPassword })
                });
                if (response.ok) {
                    passwordSuccessMessage.style.display = 'block';
                    passwordErrorMessage.style.display = 'none';
                    currentPasswordInput.value = '';
                    newPasswordInput.value = '';
                    confirmPasswordInput.value = '';
                } else {
                    const errorData = await response.json();
                    passwordErrorMessage.textContent = errorData.message || 'Bị lỗi khi đổi mật khẩu. Vui lòng thử lại.';
                    passwordErrorMessage.style.display = 'block';
                    passwordSuccessMessage.style.display = 'none';
                }
            } catch (error) {
                console.error('Fetch error:', error);
                passwordErrorMessage.textContent = 'Bị lỗi khi đổi mật khẩu. Vui lòng thử lại.';
                passwordErrorMessage.style.display = 'block';
            }
        });
        
        cancelPasswordBtn.addEventListener('click', () => {
            currentPasswordInput.value = '';
            newPasswordInput.value = '';
            confirmPasswordInput.value = '';
            passwordErrorMessage.style.display = 'none';
            passwordSuccessMessage.style.display = 'none';
            loadTab('information'); // Quay lại tab thông tin sau khi hủy đổi mật khẩu

            
        });


        document.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' ) {
                savePasswordBtn.click();
            }
        });

    }