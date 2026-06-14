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

// Photo gallery: show more/fewer photos
const galleryToggle = document.getElementById('galleryToggle');
const galleryGrid = document.querySelector('.gallery-grid');

if (galleryToggle && galleryGrid) {
    const totalPhotos = galleryGrid.querySelectorAll('img').length;
    galleryToggle.addEventListener('click', function() {
        const expanded = galleryGrid.classList.toggle('expanded');
        this.textContent = expanded ? 'Show Fewer Photos' : `Show All Photos (${totalPhotos})`;
    });
}

// Photo gallery: lightbox with arrow navigation
const lightbox = document.getElementById('lightbox');

if (lightbox && galleryGrid) {
    const galleryImages = Array.from(galleryGrid.querySelectorAll('img'));
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCounter = document.getElementById('lightboxCounter');
    let currentIndex = 0;

    function showImage(index) {
        currentIndex = (index + galleryImages.length) % galleryImages.length;
        const img = galleryImages[currentIndex];
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxCounter.textContent = `${currentIndex + 1} / ${galleryImages.length}`;
    }

    galleryImages.forEach((img, index) => {
        img.addEventListener('click', () => {
            showImage(index);
            lightbox.classList.add('active');
        });
    });

    document.getElementById('lightboxClose').addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    document.getElementById('lightboxPrev').addEventListener('click', () => showImage(currentIndex - 1));
    document.getElementById('lightboxNext').addEventListener('click', () => showImage(currentIndex + 1));

    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });

    document.addEventListener('keydown', (event) => {
        if (!lightbox.classList.contains('active')) return;
        if (event.key === 'Escape') lightbox.classList.remove('active');
        if (event.key === 'ArrowLeft') showImage(currentIndex - 1);
        if (event.key === 'ArrowRight') showImage(currentIndex + 1);
    });
}
