let currentIndex = 0;
let filteredImages = [...images];

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-image');
const lightboxTitle = document.getElementById('lightbox-title');
const closeButton = document.querySelector('.lightbox .close');
const leftArrow = document.querySelector('.arrow.left');
const rightArrow = document.querySelector('.arrow.right');


function openLightbox(index) {
    const image = filteredImages[index];
    if (!image) return;

    lightboxImg.src = image.src;
    lightboxTitle.textContent = image.title;
    lightbox.classList.remove('hidden');
    setTimeout(() => lightbox.classList.add('visible'), 10);
}

function navigateLightbox(direction) {
    currentIndex += direction;
    if (currentIndex < 0) currentIndex = filteredImages.length - 1;
    if (currentIndex >= filteredImages.length) currentIndex = 0;
    openLightbox(currentIndex);
}

document.querySelector('#gallery').addEventListener('click', (e) => {
    if (e.target && e.target.matches('.gallery-item')) {
        const clickedSrc = e.target.src;
        currentIndex = filteredImages.findIndex(img => clickedSrc.includes(img.src));
        openLightbox(currentIndex);
    }
});

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