import { loadTasks } from '../../loadTask.js';

export function setupDateFilter(selectedDate) {
    const dateInput = document.getElementById('taskDateFilter');
    const dropdown = document.getElementById('dateDropdown');
    const button = document.getElementById('dateBtn'); // ID đã đổi theo HTML mới
    const textLabel = document.getElementById('selectedDateText'); // Nơi hiển thị text

    if (!button || !dropdown) return;

    // 1. Khởi tạo giá trị ban đầu
    if (dateInput) dateInput.value = selectedDate;

    // 2. Toggle Dropdown
    button.addEventListener('click', (e) => {
        e.stopPropagation(); // Ngăn sự kiện click lan ra document
        dropdown.classList.toggle('active');
    });

    // 3. Xử lý các "Option nhanh" (Hôm nay, Hôm qua...)
    const options = document.querySelectorAll('.date-option');
    options.forEach(option => {
        option.addEventListener('click', () => {
            const type = option.dataset.value; // Lấy type từ data-value
            const dateStr = getDateByType(type);

            // Cập nhật giao diện
            options.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            
            textLabel.textContent = option.textContent;
            if (dateInput) dateInput.value = dateStr;

            // Gọi API/Load dữ liệu
            loadTasks(dateStr);

            // Đóng menu
            dropdown.classList.remove('active');
        });
    });

    // 4. Chọn ngày tùy chỉnh (Custom Date)
    if (dateInput) {
        dateInput.addEventListener('change', (e) => {
            const value = e.target.value;
            if (!value) return;

            // Xóa trạng thái active của các nút nhanh
            options.forEach(opt => opt.classList.remove('active'));

            // Hiển thị ngày đã chọn lên button
            textLabel.textContent = formatDateDisplay(value);

            loadTasks(value);
            dropdown.classList.remove('active');
        });

        // Ngăn dropdown đóng khi click vào input date
        dateInput.addEventListener('click', (e) => e.stopPropagation());
    }

    // 5. Click ra ngoài để đóng menu
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.date-filter')) {
            dropdown.classList.remove('active');
        }
    });
}

/* ================= HELPERS ================= */

/**
 * Trả về chuỗi YYYY-MM-DD dựa trên loại lựa chọn
 */
function getDateByType(type) {
    const date = new Date();

    switch (type) {
        case 'yesterday':
            date.setDate(date.getDate() - 1);
            break;
        case 'tomorrow':
            date.setDate(date.getDate() + 1);
            break;
        case 'today':
        default:
            // Giữ nguyên ngày hiện tại
            break;
    }

    return date.toISOString().split('T')[0];
}

/**
 * Định dạng hiển thị ngày từ YYYY-MM-DD sang DD/MM/YYYY để hiển thị cho đẹp
 */
function formatDateDisplay(dateString) {
    if (!dateString) return "";
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
}