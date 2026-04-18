document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registerForm');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const togglePassword = document.querySelector('.toggle-password');
    const toggleConfirm = document.querySelector('.toggle-confirm');
    const errorMessage = document.getElementById('errorMessage');
    const submitBtn = document.querySelector('.login-btn');

    // Toggle password visibility
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.classList.toggle('uil-eye');
        this.classList.toggle('uil-eye-slash');
    });

    toggleConfirm.addEventListener('click', function() {
        const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        confirmPasswordInput.setAttribute('type', type);
        this.classList.toggle('uil-eye');
        this.classList.toggle('uil-eye-slash');
    });

    // Real-time validation
    usernameInput.addEventListener('input', validateUsername);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    confirmPasswordInput.addEventListener('input', validateConfirmPassword);

    function validateUsername() {
        const username = usernameInput.value;
        if (username && username.length < 3) {
            showError('Username must be at least 3 characters long');
        } else {
            hideError();
        }
    }

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

    function validateConfirmPassword() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        if (confirmPassword && password !== confirmPassword) {
            showError('Passwords do not match');
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

        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (!username || !email || !password || !confirmPassword) {
            showError('Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            showError('Passwords do not match');
            return;
        }

        // Show loading state
        submitBtn.innerHTML = '<i class="uil uil-spinner-alt uil-spin"></i> Creating Account...';
        submitBtn.disabled = true;

        try {
            const response = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                // Registration successful
                showError('Account created successfully! Redirecting to login...');
                errorMessage.style.background = '#e8f5e8';
                errorMessage.style.color = '#2e7d32';
                errorMessage.style.borderLeftColor = '#2e7d32';
                setTimeout(() => {
                    window.location.href = 'login.html?email=' + encodeURIComponent(email)+ '&password=' + encodeURIComponent(password);
                }, 2000);
            } else {
                showError(data.message || 'Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            showError('Network error. Please check your connection and try again.');
        } finally {
            // Reset button
            submitBtn.innerHTML = '<span>Create Account</span><i class="uil uil-arrow-right"></i>';
            submitBtn.disabled = false;
        }
    });
});