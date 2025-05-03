let currentUser = null;

// Mock user database
const mockUsers = [
    { email: 'admin@hogwarts.com', password: 'Password123' }
];

function showLoginForm() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('signup-form').style.display = 'none';
}

function showSignupForm() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
}

function login(email, password) {
    // Basic validation
    if (!email || !password) {
        showAlert('Please enter both email and password');
        return;
    }

    // Find user in mock database
    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = { email: user.email };
        updateUI();
        showAlert('Login successful!', 'success');
    } else {
        showAlert('Invalid email or password');
    }
}

function signup(email, password, confirmPassword) {
    // Basic validation
    if (!email || !password || !confirmPassword) {
        showAlert('Please fill all fields');
        return;
    }
    
    if (password !== confirmPassword) {
        showAlert('Passwords do not match');
        return;
    }
    
    if (mockUsers.some(u => u.email === email)) {
        showAlert('Email already registered');
        return;
    }
    
    // Add to mock database
    mockUsers.push({ email, password });
    currentUser = { email };
    updateUI();
    showAlert('Account created successfully!', 'success');
}

function logout() {
    currentUser = null;
    updateUI();
    showAlert('Logged out successfully', 'success');
}

function updateUI() {
    const authSection = document.getElementById('auth-section');
    const contentSection = document.getElementById('content-section');
    const userDisplay = document.getElementById('user-display');
    
    if (currentUser) {
        authSection.style.display = 'none';
        contentSection.style.display = 'block';
        if (userDisplay) {
            userDisplay.textContent = `Logged in as: ${currentUser.email}`;
        }
    } else {
        authSection.style.display = 'block';
        contentSection.style.display = 'none';
    }
}

function showAlert(message, type = 'error') {
    const alertBox = document.createElement('div');
    alertBox.className = `alert ${type}`;
    alertBox.textContent = message;
    
    const container = document.getElementById('alerts-container') || document.body;
    container.prepend(alertBox);
    
    setTimeout(() => {
        alertBox.remove();
    }, 5000);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Event listeners
    document.getElementById('login-btn')?.addEventListener('click', () => {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        login(email, password);
    });
    
    document.getElementById('signup-btn')?.addEventListener('click', () => {
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        signup(email, password, confirmPassword);
    });
    
    document.getElementById('logout-btn')?.addEventListener('click', logout);
    
    // Form toggles
    document.getElementById('show-signup')?.addEventListener('click', (e) => {
        e.preventDefault();
        showSignupForm();
    });
    
    document.getElementById('show-login')?.addEventListener('click', (e) => {
        e.preventDefault();
        showLoginForm();
    });
    
    updateUI();
});