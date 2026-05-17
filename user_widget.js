document.addEventListener('DOMContentLoaded', function () {
  const auth = firebase.auth();
  const widget = document.getElementById('user-widget');
  if (!widget) return;

  auth.onAuthStateChanged(function (user) {
    if (user) {
      const house = localStorage.getItem('house_' + user.uid);
      const name = user.email.split('@')[0];

      widget.innerHTML = `
        <div class="profile-pill">
          <span class="profile-name">⚡ ${name}</span>
          ${house ? `<span class="profile-house house-${house.toLowerCase()}">${house}</span>` : ''}
          <div class="profile-dropdown">
            ${!house ? `<button onclick="promptSortingHat()">🎩 Take the Sorting Hat Quiz</button>` : ''}
            <button onclick="handleLogout()">🚪 Log Out</button>
            <button class="danger" onclick="handleDeleteAccount()">🗑 Delete Account</button>
          </div>
        </div>
      `;

      if (!house) promptSortingHat();

    } else {
      widget.innerHTML = `<a href="login.html" class="widget-login-btn">🔐 Login</a>`;
    }
  });

  window.promptSortingHat = function () {
    if (document.querySelector('.modal-overlay')) return;
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
      <div class="modal-box">
        <div class="modal-icon">🎩</div>
        <p class="modal-message">
          "Ah, a new face in the Great Hall...<br><br>
          The Sorting Hat senses great potential in you, but first —
          I must know where you truly belong."
        </p>
        <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;margin-top:1rem">
          <button class="modal-ok" id="sort-yes">I'm ready!</button>
          <button class="modal-ok" id="sort-no" style="background:none;border-color:rgba(192,160,98,0.4)">Maybe later</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    document.getElementById('sort-yes').addEventListener('click', () => {
      window.location.href = 'sortinghat.html';
    });
    document.getElementById('sort-no').addEventListener('click', () => overlay.remove());
  };

  window.handleLogout = function () {
    auth.signOut().then(() => window.location.href = 'index.html');
  };

  window.handleDeleteAccount = function () {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
      <div class="modal-box error">
        <div class="modal-icon">⚠️</div>
        <p class="modal-message">Are you sure? This permanently deletes your account and house assignment.</p>
        <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;margin-top:1rem">
          <button class="modal-ok danger" id="confirm-delete">Yes, delete it</button>
          <button class="modal-ok" id="cancel-delete">Cancel</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    document.getElementById('cancel-delete').addEventListener('click', () => overlay.remove());
    document.getElementById('confirm-delete').addEventListener('click', function () {
      const user = auth.currentUser;
      localStorage.removeItem('house_' + user.uid);
      user.delete()
        .then(() => window.location.href = 'index.html')
        .catch(() => {
          overlay.remove();
          showAlert('Please log out and log back in before deleting your account.');
        });
    });
  };
});