//auto bg
const backgroundImagesByCategory = {
all: [
    'images/backgrounds/nature1bg.jpg',
    'images/backgrounds/nature2bg.jpg',
    'images/backgrounds/nature3bg.jpg',
    'images/backgrounds/nature4bg.jpg',
    'images/backgrounds/nature5bg.jpg',
    'images/backgrounds/citybg1.jpg',
    'images/backgrounds/citybg2.jpg',
    'images/backgrounds/citybg3.jpg',
    'images/backgrounds/citybg4.jpg',
    'images/backgrounds/citybg5.jpg',
    'images/backgrounds/techbg1.jpg',
    'images/backgrounds/techbg2.jpg',
    'images/backgrounds/techbg3.jpg',
    'images/backgrounds/techbg4.jpg',
    'images/backgrounds/techbg5.jpg'
],
Nature: [
    'images/backgrounds/nature1bg.jpg',
    'images/backgrounds/nature2bg.jpg',
    'images/backgrounds/nature3bg.jpg',
    'images/backgrounds/nature4bg.jpg',
    'images/backgrounds/nature5bg.jpg'
],
City: [
    'images/backgrounds/citybg1.jpg',
    'images/backgrounds/citybg2.jpg',
    'images/backgrounds/citybg3.jpg',
    'images/backgrounds/citybg4.jpg',
    'images/backgrounds/citybg5.jpg'
],
Tech: [
    'images/backgrounds/techbg1.jpg',
    'images/backgrounds/techbg2.jpg',
    'images/backgrounds/techbg3.jpg',
    'images/backgrounds/techbg4.jpg',
    'images/backgrounds/techbg5.jpg'
]
};

function setRandomBackground(category = 'all') {
    const images = backgroundImagesByCategory[category] || backgroundImagesByCategory.all;
    const randomIndex = Math.floor(Math.random() * images.length);
    const selectedImage = images[randomIndex];

    document.body.style.backgroundImage = `url('${selectedImage}')`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundAttachment = 'fixed';
}


//img gallery
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
    {src:"images/city/city6.jpg", category: 'City',  title: 'Bubble city'},
    {src:"images/city/city7.jpg", category: 'City',  title: 'Bubble city'},
    {src:"images/city/city8.jpg", category: 'City',  title: 'Bubble city'},
    {src:"images/city/city9.jpg", category: 'City',  title: 'Bubble city'},
    {src:"images/city/city10.jpg", category: 'City',  title: 'Bubble city'},
    {src:"images/city/city11.jpg", category: 'City',  title: 'Bubble city'},
    {src:"images/city/city12.jpg", category: 'City',  title: 'Bubble city'},
    {src:"images/technology/tech1.jpg", category: 'Technology',  title: 'Work laptop'},
    {src:"images/technology/tech2.jpg", category: 'Technology',  title: 'At work'},
    {src:"images/technology/tech3.jpg", category: 'Technology',  title: 'Outside laptop'},
    {src:"images/technology/tech4.jpg", category: 'Technology',  title: 'Busy day'},
    {src:"images/technology/tech5.jpg", category: 'Technology',  title: 'Look both ways!'},
    {src:"images/technology/tech6.jpg", category: 'Technology',  title: 'Look both ways!'},
    {src:"images/technology/tech7.jpg", category: 'Technology',  title: 'Look both ways!'},
    {src:"images/technology/tech8.jpg", category: 'Technology',  title: 'Look both ways!'},
    {src:"images/technology/tech9.jpg", category: 'Technology',  title: 'Look both ways!'},
    {src:"images/technology/tech10.jpg", category: 'Technology',  title: 'Look both ways!'},
    {src:"images/technology/tech11.jpg", category: 'Technology',  title: 'Look both ways!'},
    {src:"images/technology/tech12.jpg", category: 'Technology',  title: 'Look both ways!'},
    {src:"images/technology/tech13.jpg", category: 'Technology',  title: 'Look both ways!'},
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

        setRandomBackground(category);
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

    window.onload = () => setRandomBackground('all');