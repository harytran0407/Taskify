document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.querySelector('.toggle-password');
    const errorMessage = document.getElementById('errorMessage');
    const submitBtn = document.querySelector('.login-btn');

    // Pre-fill email from URL params
    const urlParams = new URLSearchParams(window.location.search);
    const prefillEmail = urlParams.get('email');
    const prefillPassword = urlParams.get('password');
    if (prefillEmail && prefillPassword) {
        emailInput.value = prefillEmail;
        passwordInput.value = prefillPassword;
    }

    // Toggle password visibility
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.classList.toggle('uil-eye');
        this.classList.toggle('uil-eye-slash');
    });

    // Real-time validation
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);

    function validateEmail() {
        const email = emailInput.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            showError('Please enter a valid email address');
        } else {
            hideError();
        }
    }

    function validatePassword() {
        const password = passwordInput.value;
        if (password && password.length < 6) {
            showError('Password must be at least 6 characters long');
        } else {
            hideError();
        }
    }

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }

    function hideError() {
        errorMessage.style.display = 'none';
    }

    // Form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        if (!email || !password) {
            showError('Please fill in all fields');
            return;
        }

        // Show loading state
        submitBtn.innerHTML = '<i class="uil uil-spinner-alt uil-spin"></i> Signing In...';
        submitBtn.disabled = true;

        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                // Login successful
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', data.username);
                localStorage.setItem('email', data.email);

                // Set joined date if not exists
                if (!localStorage.getItem('joinedDate')) {
                    localStorage.setItem('joinedDate', new Date().toLocaleDateString());
                }

                showError('Login successful!');
                errorMessage.style.background = '#e8f5e8';
                errorMessage.style.color = '#2e7d32';
                errorMessage.style.borderLeftColor = '#2e7d32';
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            } else {
                showError(data.message || 'Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Error:', error);
            showError('Sever error. Please check your sever and try again.');
        } finally {
            // Reset button
            submitBtn.innerHTML = '<span>Sign In</span><i class="uil uil-arrow-right"></i>';
            submitBtn.disabled = false;
        }
    });
});