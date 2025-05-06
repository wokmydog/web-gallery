//lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-image');
const closeButton = document.querySelector('.lightbox .close');
let currentIndex = -1;

//open lightbox
document.querySelector('#gallery').addEventListener('click', (e) => {
    if (e.target && e.target.matches('.gallery-item')) {
        lightboxImg.src = e.target.src;
        lightbox.classList.remove('hidden');
        setTimeout(() => {
            lightbox.classList.add('visible');
        }, 10);
    }
});

function openLightbox(index) {
    const img = document.querySelectorAll('.gallery-item')[index];
    if (img) {
        lightboxImg.src = img.src;
        lightbox.classList.remove('hidden');
        setTimeout(() => lightbox.classList.add('visible'), 10);
    }
}

function showNextImage() {
    const items = document.querySelectorAll('.gallery-item');
    if (currentIndex < items.length - 1) {
        currentIndex++;
    } else {
        currentIndex = 0; // loop around
    }
    openLightbox(currentIndex);
}

function showPrevImage() {
    const items = document.querySelectorAll('.gallery-item');
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = items.length - 1; // loop around
    }
    openLightbox(currentIndex);
}

//arrow keys
document.querySelector('.lightbox-arrow.left').addEventListener('click', showPrevImage);
document.querySelector('.lightbox-arrow.right').addEventListener('click', showNextImage);

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('hidden')) {
        if (e.key === 'ArrowRight') {
            showNextImage();
        } else if (e.key === 'ArrowLeft') {
            showPrevImage();
        } else if (e.key === 'Escape') {
            closeLightbox();
        }
    }
});


//x button
closeButton.addEventListener('click', () => {
    lightbox.classList.remove('visible');
    setTimeout(() => {
        lightbox.classList.add('hidden');
    }, 300);
});

//close lightbox out
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('visible');
        setTimeout(() => {
            lightbox.classList.add('hidden');
        }, 300);
    }
});