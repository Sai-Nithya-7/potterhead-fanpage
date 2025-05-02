document.addEventListener('DOMContentLoaded',function() {
    const nav = this.getElementById('main-nav');
    nav.innerHTML = `
    <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="characters.html">Characters</a></li>
        <li><a href="gallery.html">Gallery</a></li>
        <li><a href="sorting_hat.html">Sorting Hat</a></li>
    </ul>
    `
    
})