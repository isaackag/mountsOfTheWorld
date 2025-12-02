//Authentication script for registration and login
//Registration
const registerForm = document.getElementById('register-form');
if (registerForm) {
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('regName').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        const user = {
            name, email, password
        };

        let users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registration successful! You can now log in.');
        window.location.href = 'login.html';
    });
}

//Login
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        let users = JSON.parse(localStorage.getItem('users')) || [];

        const validUser = users.find(user => user.email === email && user.password === password);

        if (validUser) {
            alert('Login successful! Welcome back, ' + validUser.name + '!');
            window.location.href = 'index.html';
        } else {
            alert('Invalid email or password. Please try again.');
        }
    });
}