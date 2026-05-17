document.addEventListener('DOMContentLoaded', function () {
  const nav = document.getElementById('main-nav');

  nav.innerHTML = `
    <div class="nav-row">
      <button class="hamburger" id="hamburger-btn" aria-label="Toggle navigation" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
      <div id="user-widget"></div>
    </div>
    <ul id="nav-links">
      <li><a href="index.html">Home</a></li>
      <li><a href="about.html">About</a></li>
      <li><a href="characters.html">Characters</a></li>
      <li><a href="gallery.html">Gallery</a></li>
      <li><a href="sorting_hat.html">Sorting Hat</a></li>
    </ul>
  `;

  const btn = document.getElementById('hamburger-btn');
  const links = document.getElementById('nav-links');

  btn.addEventListener('click', function () {
    const isOpen = links.classList.toggle('open');
    btn.classList.toggle('open', isOpen);
    btn.setAttribute('aria-expanded', isOpen);
  });

  links.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      links.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', false);
    });
  });
});