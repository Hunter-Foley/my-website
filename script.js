let lastScrollTop = 0;
const header = document.getElementById('header');

// Hide header on scroll down, show on scroll up
window.addEventListener('scroll', function() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop && currentScroll > 100) {
        header.classList.add('hidden');
    } else {
        header.classList.remove('hidden');
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// Hamburger menu
document.getElementById('hamburger').addEventListener('click', function() {
    document.getElementById('navMenu').classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const nav = document.querySelector('nav');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (!nav.contains(event.target) && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
});

// Form submission
function handleSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    alert(`Thank you, ${name}! I'll be in touch shortly at ${email}`);
    event.target.reset();
}
