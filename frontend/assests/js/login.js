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
            const apiBaseUrl = (window.location.origin && window.location.origin !== 'null') ? window.location.origin : 'http://localhost:3000';
            const response = await fetch(`${apiBaseUrl}/api/auth/login`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const rawBody = await response.text();
            let data;
            try {
                data = rawBody ? JSON.parse(rawBody) : {};
            } catch {
                data = {};
            }

            if (!response.ok) {
                showError(data.message || `Login failed: ${response.status} ${response.statusText}`);
            } else {
                if (!data.token) {
                    showError('Login succeeded but token was not returned.');
                } else {
                    localStorage.setItem('token', data.token);
                    showError('Login successful! Redirecting...');
                    errorMessage.style.background = '#e8f5e8';
                    errorMessage.style.color = '#2e7d32';
                    errorMessage.style.borderLeftColor = '#2e7d32';
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 1000);
                }
            }
        } catch (error) {
            console.error('Error:', error);
            showError(`Network error: ${error.message}`);
        } finally {
            // Reset button
            submitBtn.innerHTML = '<span>Sign In</span><i class="uil uil-arrow-right"></i>';
            submitBtn.disabled = false;
        }
    });
});