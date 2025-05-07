
import './theme.js';

//auto bg
const backgroundImagesByCategory = {
    all: [
        'images/backgrounds/nature1bg.jpg', 'images/backgrounds/nature2bg.jpg', 'images/backgrounds/nature3bg.jpg',
        'images/backgrounds/nature4bg.jpg', 'images/backgrounds/nature5bg.jpg', 'images/backgrounds/citybg1.jpg',
        'images/backgrounds/citybg2.jpg', 'images/backgrounds/citybg3.jpg', 'images/backgrounds/citybg4.jpg',
        'images/backgrounds/citybg5.jpg', 'images/backgrounds/techbg1.jpg', 'images/backgrounds/techbg2.jpg',
        'images/backgrounds/techbg3.jpg', 'images/backgrounds/techbg4.jpg', 'images/backgrounds/techbg5.jpg'
    ],
    Nature: [
        'images/backgrounds/nature1bg.jpg', 'images/backgrounds/nature2bg.jpg', 'images/backgrounds/nature3bg.jpg',
        'images/backgrounds/nature4bg.jpg', 'images/backgrounds/nature5bg.jpg'
    ],
    City: [
        'images/backgrounds/citybg1.jpg', 'images/backgrounds/citybg2.jpg', 'images/backgrounds/citybg3.jpg',
        'images/backgrounds/citybg4.jpg', 'images/backgrounds/citybg5.jpg'
    ],
    Technology: [
        'images/backgrounds/techbg1.jpg', 'images/backgrounds/techbg2.jpg', 'images/backgrounds/techbg3.jpg',
        'images/backgrounds/techbg4.jpg', 'images/backgrounds/techbg5.jpg'
    ]
};

function setRandomBackground(category = 'all') {
    const images = backgroundImagesByCategory[category] || backgroundImagesByCategory.all;
    const selectedImage = images[Math.floor(Math.random() * images.length)];

    document.body.style.backgroundImage = `url('${selectedImage}')`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundAttachment = 'fixed';
}

//img for gallery
const images = [
    {src:"images/nature/nature1.jpg", category: 'Nature',  title: 'Nice meadow'},
    {src:"images/nature/nature2.jpg", category: 'Nature',  title: 'Bubbly grass'},
    {src:"images/nature/nature3.jpg", category: 'Nature',  title: 'Sunny day'},
    {src:"images/nature/nature4.jpg", category: 'Nature',  title: 'Refreshing breeze'},
    {src:"images/nature/nature5.jpg", category: 'Nature',  title: 'Grassy globe'},
    {src:"images/nature/nature6.jpg", category: 'Nature',  title: 'Grassy globe v2'},
    {src:"images/nature/nature7.jpg", category: 'Nature',  title: 'Sunflower'},
    {src:"images/nature/nature8.jpg", category: 'Nature',  title: 'Butterfly'},
    {src:"images/city/city1.jpg", category: 'City',  title: 'City tree'},
    {src:"images/city/city2.jpg", category: 'City',  title: 'City globe'},
    {src:"images/city/city3.jpg", category: 'City',  title: 'Bright city'},
    {src:"images/city/city4.jpg", category: 'City',  title: 'City grass'},
    {src:"images/city/city5.jpg", category: 'City',  title: 'Bubble city'},
    {src:"images/city/city6.jpg", category: 'City',  title: 'Earth view'},
    {src:"images/city/city7.jpg", category: 'City',  title: '"Birds of lost memories"'},
    {src:"images/city/city8.jpg", category: 'City',  title: 'Bird City'},
    {src:"images/city/city9.jpg", category: 'City',  title: 'Falling leaves'},
    {src:"images/city/city10.jpg", category: 'City',  title: 'Busy city day'},
    {src:"images/city/city11.jpg", category: 'City',  title: 'City in a box'},
    {src:"images/city/city12.jpg", category: 'City',  title: 'City lens'},
    {src:"images/technology/tech1.jpg", category: 'Technology',  title: 'Work laptop'},
    {src:"images/technology/tech2.jpg", category: 'Technology',  title: 'At work'},
    {src:"images/technology/tech3.jpg", category: 'Technology',  title: 'Outside laptop'},
    {src:"images/technology/tech4.jpg", category: 'Technology',  title: 'Busy day'},
    {src:"images/technology/tech5.jpg", category: 'Technology',  title: 'Look both ways!'},
    {src:"images/technology/tech6.jpg", category: 'Technology',  title: 'Bridge ocean view'},
    {src:"images/technology/tech7.jpg", category: 'Technology',  title: 'Clean laptop'},
    {src:"images/technology/tech8.jpg", category: 'Technology',  title: 'Night owl'},
    {src:"images/technology/tech9.jpg", category: 'Technology',  title: 'Master typer'},
    {src:"images/technology/tech10.jpg", category: 'Technology',  title: 'Dirty keys'},
    {src:"images/technology/tech11.jpg", category: 'Technology',  title: 'WWW'},
    {src:"images/technology/tech12.jpg", category: 'Technology',  title: 'Mouse'},
];

let filteredImages = [...images];
let currentIndex = 0;

//gallery
function renderGallery(category = 'all') {
    const container = document.getElementById('gallery');
    container.innerHTML = '';

    filteredImages = (category === 'all') 
        ? [...images] 
        : images.filter(img => img.category === category);

    const filterButtons = document.createElement('div');
    filterButtons.classList.add('filter-buttons');
    filterButtons.innerHTML = `
        <button data-category="all">All</button>
        <button data-category="Nature">Nature</button>
        <button data-category="City">City</button>
        <button data-category="Technology">Technology</button>
    `;
    container.appendChild(filterButtons);

    const galleryBox = document.createElement('div');
    galleryBox.id = 'gallery-box';
    const gallery = document.createElement('section');
    gallery.classList.add('image-gallery');
    galleryBox.appendChild(gallery);
    container.appendChild(galleryBox);

    filteredImages.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.src;
        imgElement.alt = image.title;
        imgElement.classList.add('gallery-item');
        imgElement.dataset.category = image.category;
        gallery.appendChild(imgElement);
    });

    filterButtons.addEventListener('click', filterImages);
}

function filterImages(event) {
    const category = event.target.dataset.category;
    if (!category) return;

    renderGallery(category);
    setRandomBackground(category);
}

//custom bg
document.getElementById('apply-background').addEventListener('click', () => {
    const fileInput = document.getElementById('background-upload');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            let existing = document.getElementById('gallery-background');
            if (existing) existing.remove();

            const bg = document.createElement('img');
            bg.id = 'gallery-background';
            bg.src = e.target.result;
            document.body.prepend(bg);
        };
        reader.readAsDataURL(file);
    } else {
        alert('Please select an image first.');
    }
});

//lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-image');
const lightboxTitle = document.getElementById('lightbox-title');
const closeButton = document.querySelector('#lightbox .close');
const leftArrow = document.querySelector('.lightbox-arrow.left');
const rightArrow = document.querySelector('.lightbox-arrow.right');

function openLightbox(index) {
    const image = filteredImages[index];
    if (!image) return;

    lightboxImg.src = image.src;
    lightboxTitle.textContent = image.title;
    lightbox.classList.remove('hidden');
    lightbox.classList.add('visible');
}

function closeLightbox() {
    lightbox.classList.remove('visible');
    lightbox.classList.add('hidden');
}

function navigateLightbox(direction) {
    currentIndex += direction;
    if (currentIndex < 0) currentIndex = filteredImages.length - 1;
    if (currentIndex >= filteredImages.length) currentIndex = 0;
    openLightbox(currentIndex);
}

//events
document.addEventListener('DOMContentLoaded', () => {
    renderGallery();
    setRandomBackground('all');

    document.querySelector('#gallery').addEventListener('click', (e) => {
        if (e.target && e.target.matches('.gallery-item')) {
            const clickedSrc = e.target.src;
            currentIndex = filteredImages.findIndex(img => clickedSrc.includes(img.src));
            if (currentIndex !== -1) {
                openLightbox(currentIndex);
            }
        }
    });

    closeButton.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    leftArrow.addEventListener('click', () => navigateLightbox(-1));
    rightArrow.addEventListener('click', () => navigateLightbox(1));

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('hidden')) {
            if (e.key === 'ArrowRight') navigateLightbox(1);
            else if (e.key === 'ArrowLeft') navigateLightbox(-1);
            else if (e.key === 'Escape') closeLightbox();
        }
    });
});
