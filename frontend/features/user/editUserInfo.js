export function editInformationTab() {
    const editBtn = document.getElementById('edit-info-btn');
    const saveBtn = document.getElementById('save-info-btn');
    const cancelBtn = document.getElementById('cancel-edit-btn');
    const usernameInput = document.getElementById('user-username');
    const emailInput = document.getElementById('user-email');
    const contactInput = document.getElementById('user-contact');
    const successMessage = document.getElementById('success-message');

    // Khởi tạo object rỗng, sẽ được lấp đầy sau khi refreshUserInfo chạy
    let originalData = { username: '', email: '', contact: '' }; 

    const refreshUserInfo = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/users/info', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await response.json();
            
            if (response.ok) {
                // Cập nhật giá trị vào ô Input
                usernameInput.value = data.username || '';
                emailInput.value = data.email || '';
                contactInput.value = data.contactNumber || '';
                
                // QUAN TRỌNG: Cập nhật lại originalData sau khi fetch thành công
                originalData = {
                    username: data.username,
                    email: data.email,
                    contact: data.contactNumber
                };
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    // Gọi lần đầu khi load tab
    refreshUserInfo();

    editBtn.addEventListener('click', () => {
        usernameInput.removeAttribute('readonly');
        emailInput.removeAttribute('readonly');
        contactInput.removeAttribute('readonly');
        editBtn.style.display = 'none';
        saveBtn.style.display = 'inline-block';
        cancelBtn.style.display = 'inline-block';
    });

    saveBtn.addEventListener('click', async () => {
        try {
            const username = usernameInput.value.trim();
            const email = emailInput.value.trim();
            const contactNumber = contactInput.value.trim();

            const response = await fetch('http://localhost:3000/api/users/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ username, email, contactNumber })
            });

            if (response.ok) {
                // 1. Cập nhật localStorage
                localStorage.setItem('username', username);
                localStorage.setItem('email', email);
                localStorage.setItem('contactNumber', contactNumber);

                // 2. Cập nhật UI trực tiếp và biến tạm (KHÔNG CẦN CHỜ FETCH LẠI)
                originalData = { username, email, contact: contactNumber };
                
                // 3. Khóa các ô input
                usernameInput.setAttribute('readonly', true);
                emailInput.setAttribute('readonly', true);  
                contactInput.setAttribute('readonly', true);
                
                // 4. Đổi trạng thái nút
                editBtn.style.display = 'inline-block';
                saveBtn.style.display = 'none';
                cancelBtn.style.display = 'none';

                // 5. Thông báo thành công
                successMessage.style.display = 'block';
                setTimeout(() => { successMessage.style.display = 'none'; }, 3000);

                // Gọi ngầm để đảm bảo dữ liệu server chuẩn (tùy chọn)
                refreshUserInfo(); 
            } else {
                const data = await response.json();
                alert(data.message || 'Update failed');
            }
        } catch (error) {
            alert('An error occurred');
        }
    });

    cancelBtn.addEventListener('click', () => {
        // Trả về đúng dữ liệu gốc đã lưu
        usernameInput.value = originalData.username;
        emailInput.value = originalData.email;
        contactInput.value = originalData.contact;
        
        usernameInput.setAttribute('readonly', true);
        emailInput.setAttribute('readonly', true);  
        contactInput.setAttribute('readonly', true);
        editBtn.style.display = 'inline-block';
        saveBtn.style.display = 'none';
        cancelBtn.style.display = 'none';
    });
}