let currentUser = null;

function showLoginForm() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('signup-form').style.display = 'none';
}

function showSignupForm() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
}

function login(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            currentUser = userCredential.user;
            updateUI();
        })
        .catch((error) => {
            console.error("Error logging in: ", error);
            alert("Error logging in: " + error.message);
        });
}

function signup(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            currentUser = userCredential.user;
            updateUI();
        })
        .catch((error) => {
            console.error("Error signing up: ", error);
            alert("Error signing up: " + error.message);
        });
}

function logout() {
    firebase.auth().signOut().then(() => {
        currentUser = null;
        updateUI();
    }).catch((error) => {
        console.error("Error logging out: ", error);
    });
}

function updateUI() {
    const authSection = document.getElementById('auth-section');
    const contentSection = document.getElementById('content-section');
    
    if (currentUser) {
        authSection.style.display = 'none';
        contentSection.style.display = 'block';
        document.getElementById('user-email').textContent = currentUser.email;
    } else {
        authSection.style.display = 'block';
        contentSection.style.display = 'none';
    }
}

firebase.auth().onAuthStateChanged((user) => {
    currentUser = user;
    updateUI();
});

// Event listeners for login and signup forms
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    login(email, password);
});

document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    signup(email, password);
});

document.getElementById('logout-button').addEventListener('click', logout);