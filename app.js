//auto bg
const backgroundImages = [
    'images/backgrounds/bg1.jpg',
    'images/backgrounds/bg2.jpg',
    'images/backgrounds/bg3.jpg',
    'images/backgrounds/bg4.jpg',
    'images/backgrounds/bg5.jpg',
    'images/backgrounds/bg6.jpg'
];

function setRandomBackground() {
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    const selectedImage = backgroundImages[randomIndex];

    console.log('Selected background:', selectedImage);

    document.body.style.backgroundImage = `url('${selectedImage}')`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundAttachment = 'fixed';
}

window.onload = setRandomBackground;

//img gallery
const images = [
    {src:"images/nature/nature1.jpg", category: 'Nature',  title: 'Nice meadow'},
    {src:"images/nature/nature2.jpg", category: 'Nature',  title: 'Bubbly grass'},
    {src:"images/nature/nature3.jpg", category: 'Nature',  title: 'Sunny day'},
    {src:"images/nature/nature4.jpg", category: 'Nature',  title: 'Refreshing breeze'},
    {src:"images/nature/nature5.jpg", category: 'Nature',  title: 'Grassy globe'},
    {src:"images/city/city1.jpg", category: 'City',  title: 'City tree'},
    {src:"images/city/city2.jpg", category: 'City',  title: 'City globe'},
    {src:"images/city/city3.jpg", category: 'City',  title: 'Bright city'},
    {src:"images/city/city4.jpg", category: 'City',  title: 'City grass'},
    {src:"images/city/city5.jpg", category: 'City',  title: 'Bubble city'},
    {src:"images/technology/tech1.jpg", category: 'Technology',  title: 'Work laptop'},
    {src:"images/technology/tech2.jpg", category: 'Technology',  title: 'At work'},
    {src:"images/technology/tech3.jpg", category: 'Technology',  title: 'Outside laptop'},
    {src:"images/technology/tech4.jpg", category: 'Technology',  title: 'Busy day'},
    {src:"images/technology/tech5.jpg", category: 'Technology',  title: 'Look both ways!'},
];

function renderGallery() {
    const container = document.getElementById('gallery'); //find element

    const filterButtons = document.createElement('div'); 
    filterButtons.classList.add('filter-buttons'); //new div 
    filterButtons.innerHTML = `
        <button data-category="all">All</button>
        <button data-category="Nature">Nature</button>
        <button data-category="City">City</button>
        <button data-category="Technology">Technology</button>
    `; //buttons with attributes
    container.appendChild(filterButtons); //add buttons to page

    const galleryBox = document.createElement('div');
    galleryBox.id = 'gallery-box'; //container
    const gallery = document.createElement('section');
    gallery.classList.add('image-gallery'); //section
    galleryBox.appendChild(gallery);
    container.appendChild(galleryBox);

    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.src;
        imgElement.alt = image.title; //set src & alt
        imgElement.classList.add('gallery-item');
        imgElement.dataset.category = image.category; //css class, store category
        gallery.appendChild(imgElement);
    });

    filterButtons.addEventListener('click', filterImages); //call filter
}

    //filtering images
    function filterImages(event) {
        const category = event.target.dataset.category; //get category
        const gallery = document.querySelector('.image-gallery');
        const images = gallery.querySelectorAll('.gallery-item'); //find images
    
        images.forEach(img => {
            if (category === 'all' || img.dataset.category === category) {
                img.style.display = 'block';
            } else {
                img.style.display = 'none';
            }
        }); 
    }

    document.getElementById('apply-background').addEventListener('click', () => {
        const fileInput = document.getElementById('background-upload');
        const file = fileInput.files[0];
    
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                let existing = document.getElementById('gallery-background');
                if (existing) existing.remove(); // remove previous if any
    
                const bg = document.createElement('img');
                bg.id = 'gallery-background';
                bg.src = e.target.result;
                document.body.prepend(bg); // put behind everything
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please select an image first.');
        }
    });
    
    renderGallery();

//lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-image');
const closeButton = document.querySelector('.lightbox .close');

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
