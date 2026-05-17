function showAlert(message, type = 'error') {
  const icon = type === 'success' ? '✓' : '✕';
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal-box ${type}">
      <div class="modal-icon">${icon}</div>
      <p class="modal-message">${message}</p>
      <button class="modal-ok">OK</button>
    </div>
  `;
  document.body.appendChild(overlay);
  const close = () => overlay.remove();
  overlay.querySelector('.modal-ok').addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
}

function toggleForms() {
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  loginForm.style.display = loginForm.style.display === 'none' ? 'block' : 'none';
  signupForm.style.display = signupForm.style.display === 'none' ? 'block' : 'none';
}

document.addEventListener('DOMContentLoaded', function () {
  const auth = firebase.auth();

  const loginBtn = document.getElementById('login-btn');
  if (loginBtn) {
    loginBtn.addEventListener('click', function () {
      const email = document.getElementById('login-email').value.trim();
      const password = document.getElementById('login-password').value;

      if (!email || !password) {
        showAlert('Please enter both email and password.');
        return;
      }

      auth.signInWithEmailAndPassword(email, password)
        .then(() => {
          showAlert('Welcome back, young wizard!', 'success');
          setTimeout(() => window.location.href = 'index.html', 1200);
        })
        .catch(err => {
          if (['auth/user-not-found', 'auth/wrong-password', 'auth/invalid-credential'].includes(err.code)) {
            showAlert('Invalid email or password.');
          } else if (err.code === 'auth/invalid-email') {
            showAlert("That doesn't look like a valid email address.");
          } else if (err.code === 'auth/too-many-requests') {
            showAlert('Too many failed attempts. Try again later.');
          } else {
            showAlert('Something went wrong. Please try again.');
          }
        });
    });
  }

  const signupBtn = document.getElementById('signup-btn');
  if (signupBtn) {
    signupBtn.addEventListener('click', function () {
      const email = document.getElementById('signup-email').value.trim();
      const password = document.getElementById('signup-password').value;
      const confirm = document.getElementById('confirm-password').value;

      if (!email || !password || !confirm) {
        showAlert('Please fill in all fields.');
        return;
      }
      if (password !== confirm) {
        showAlert('Passwords do not match.');
        return;
      }
      if (password.length < 6) {
        showAlert('Password must be at least 6 characters.');
        return;
      }

      auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
          showAlert('Enrollment complete! Welcome to Hogwarts.', 'success');
          setTimeout(() => window.location.href = 'index.html', 1200);
        })
        .catch(err => {
          if (err.code === 'auth/email-already-in-use') {
            showAlert('That email is already enrolled.');
          } else if (err.code === 'auth/invalid-email') {
            showAlert("That doesn't look like a valid email address.");
          } else if (err.code === 'auth/weak-password') {
            showAlert('Password too weak. Use at least 6 characters.');
          } else {
            showAlert('Something went wrong. Please try again.');
          }
        });
    });
  }
});