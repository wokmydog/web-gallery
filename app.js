
//auto bg
const backgroundImagesByCategory = {
    all: [
        'images/backgrounds/nature4bg.jpg', 'images/backgrounds/citybg1.jpg',
        'images/backgrounds/techbg2.jpg',
    ],
    Nature: [
        'images/backgrounds/nature4bg.jpg', 
    ],
    City: [
        'images/backgrounds/citybg1.jpg',
    ],
    Technology: [
        'images/backgrounds/techbg2.jpg',
    ]
};

function setRandomBackground(category = 'all') {
    const images = backgroundImagesByCategory[category] || backgroundImagesByCategory.all;
    const selectedImage = category === 'all'
        ? images[Math.floor(Math.random() * images.length)]
        : images[0];

        let existing = document.getElementById('gallery-background');
        if (existing) existing.remove();
    
        const bg = document.createElement('img');
        bg.id = 'gallery-background';
        bg.src = selectedImage;
        document.body.appendChild(bg);
};

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
    {src:"images/technology/tech1.jpg", category: 'Technology',  title: 'Busy night'},
    {src:"images/technology/tech2.jpg", category: 'Technology',  title: 'Business call'},
    {src:"images/technology/tech3.jpg",  category: 'Technology',  title: 'Laptop showcase'},
    {src:"images/technology/tech4.jpg", category: 'Technology',  title: 'Busy day'},
    {src:"images/technology/tech5.jpg", category: 'Technology',  title: 'Look both ways!'},
    {src:"images/technology/tech6.jpg", category: 'Technology',  title: 'Bridge ocean view'},
    {src:"images/technology/tech7.jpg", category: 'Technology',  title: 'Clean laptop'},
    {src:"images/technology/tech8.jpg", category: 'Technology',  title: 'Night owl'},
    {src:"images/technology/tech9.jpg", category: 'Technology',  title: 'Master typer'},
    {src:"images/technology/tech10.jpg", category: 'Technology',  title: 'Dirty keys'},
];

let filteredImages = [...images];
let currentIndex = 0;

//rendering gallery
function renderGallery(imagesToRender) {
    const container = document.getElementById('gallery');
    container.innerHTML = '';

    //wrapper div fro gallery
    const galleryBox = document.createElement('div');
    galleryBox.id = 'gallery-box';

    const gallery = document.createElement('section');
    gallery.classList.add('image-gallery');
    galleryBox.appendChild(gallery);
    container.appendChild(galleryBox);

    //add images to gallery
    imagesToRender.forEach(image => {
        //wrapper div for each image and star
        const wrapper = document.createElement('div')
        wrapper.classList.add('gallery-item-wrapper')
        wrapper.style.position = 'relative';

        //image setup
        const imgElement = document.createElement('img');
        imgElement.src = image.src;
        imgElement.alt = image.title;
        imgElement.classList.add('gallery-item');
        imgElement.dataset.category = image.category;
        imgElement.loading = 'lazy'; //lazy loading

        //create span for star icon
        const star = document.createElement('span');
        star.classList.add('favorite-star');
        const isFav = favorites.includes(image.src);
        star.textContent = isFav ? '★' : '☆';
        if (isFav) star.classList.add('filled');

        //click event
        star.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFavorite(image.src, star);
        });

        wrapper.appendChild(imgElement);
        wrapper.appendChild(star);
        gallery.appendChild(wrapper);
    });

}


//filter images function
function filterImages(event) {
    const category = event.target.dataset.category;
    if (!category) return;

    filteredImages = category === "all"
        ? [...images]
        : images.filter(img => img.category === category);

    renderGallery(filteredImages);

    if (!localStorage.getItem('customBackground')) {
        setRandomBackground(category);
    }
}

//favorite function
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let showingFavorites = false;

function toggleFavorite(imageSrc, starElement){
    const index = favorites.indexOf(image.src);
    if (index === -1) {
        favorites.push(imageSrc);
        starElement.textContent = '★';
        starElement.classList.add('filled');
    } else {
        favorites.splice(index, 1);
        starElement.textContent = '☆';
        starElement.classList.remove('filled');
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

//lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-image');
const lightboxTitle = document.getElementById('lightbox-title');
const leftArrow = document.querySelector('.lightbox-arrow.left');
const rightArrow = document.querySelector('.lightbox-arrow.right');

// Auto-carousel variables
let autoCarouselTimeout = null; //hold reference to timer
let autoCarouselDelay = 10000; //time between slides
let isAutoCarouselActive = true; //indicate if active

//move next image on list
function showNextImageWithFade() {
    currentIndex = (currentIndex + 1) % filteredImages.length; //loop back
    lightboxImg.classList.remove('fade-in'); //fade
    lightboxImg.src = filteredImages[currentIndex].src;
    lightboxTitle.textContent = filteredImages[currentIndex].title;
    void lightboxImg.offsetWidth; // trigger reflow
    lightboxImg.classList.add('fade-in');
}

//start automatic carousel loop, calls itself to keep looping
function startAutoCarousel() {
    if (!isAutoCarouselActive) return;
    clearTimeout(autoCarouselTimeout);
    autoCarouselTimeout = setTimeout(() => {
        showNextImageWithFade();
        startAutoCarousel();
    }, autoCarouselDelay);
}

//reset timer and restart
function resetAutoCarousel() {
    clearTimeout(autoCarouselTimeout);
    if (isAutoCarouselActive) startAutoCarousel();
}

//stop carousel, disable it from restart
function stopAutoCarousel() {
    clearTimeout(autoCarouselTimeout);
    isAutoCarouselActive = false;
}

//adjusts the time between transitions
function changeCarouselSpeed(seconds) {
    autoCarouselDelay = seconds * 1000;
    resetAutoCarousel();
}

//listen for user activity, when lightbox open, prevent image change while user interaction
['mousemove', 'keydown', 'click', 'touchstart'].forEach(event => {
    document.addEventListener(event, () => {
        if (!lightbox.classList.contains('hidden')) {
            resetAutoCarousel();
        }
    });
});


//opening lightbox
function openLightbox(index) {
    const image = filteredImages[index];
    if (!image) return;

    lightboxImg.src = image.src;
    lightboxTitle.textContent = image.title;
    lightbox.classList.remove('hidden');
    lightbox.classList.add('visible');

    //favoriting in lightbox
    const lightboxStar = document.getElementById('lightbox-favorite');
    if (lightboxStar) {
    const isFav = favorites.includes(image.src);
    lightboxStar.textContent = isFav ? '★' : '☆';

    lightboxStar.onclick = (e) => {
        toggleFavorite(image.src, lightboxStar);
        // Refresh gallery if showing favorites
        if (showingFavorites) {
            const favImages = images.filter(img => favorites.includes(img.src));
            renderGallery(favImages);
        }
    };
}

    document.getElementById('carousel-controls')?.classList.add('visible');
}

//closing lightbox
function closeLightbox() {
    lightbox.classList.remove('visible');
    lightbox.classList.add('hidden');

    document.getElementById('carousel-controls')?.classList.remove('visible');
}

//lightbox navigation
function navigateLightbox(direction) {
    currentIndex += direction;
    if (currentIndex < 0) currentIndex = filteredImages.length - 1;
    if (currentIndex >= filteredImages.length) currentIndex = 0;
    openLightbox(currentIndex);
}

//custom bg
function applyCustomBackground(imageDataUrl) {
    let existing = document.getElementById('gallery-background');
    if (existing) existing.remove();
  
    const bg = document.createElement('img');
    bg.id = 'gallery-background';
    bg.src = imageDataUrl;
    document.body.prepend(bg);
  }

//auto carousel
document.addEventListener('DOMContentLoaded', () => {
    filteredImages = [...images];
    renderGallery(filteredImages);
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    const backgroundUpload = document.getElementById('background-upload');
    const applyBackgroundBtn = document.getElementById('apply-background');
    const resetBackgroundBtn = document.getElementById('clear-custom-bg');

    document.querySelector('.filter-buttons').addEventListener('click', filterImages);

    //favorites
    document.getElementById('toggle-favorites').addEventListener('click', () => {
        showingFavorites = !showingFavorites;
        const btn = document.getElementById('toggle-favorites');
        btn.textContent = showingFavorites ? '★' : '☆';
    
        if (showingFavorites) {
            const favoriteImages = images.filter(img => favorites.includes(img.src));
            renderGallery(favoriteImages);
        } else {
            renderGallery(filteredImages);
        }
    });

    //load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      body.classList.add('dark-mode');
    }

    //load saved custom bg
    const savedBg = localStorage.getItem('customBackground');
    if (savedBg) {
        try{
      applyCustomBackground(savedBg);
         } catch (e) {
        console.error('Invalid custom background, reverting to random.');
        setRandomBackground('all');
      }
    } else if (!savedBg){
      setRandomBackground('all'); //only apply random if no saved
    }

    // theme toggle
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', currentTheme);
      });

      //apply custom bg
      applyBackgroundBtn.addEventListener('click', () => {
        backgroundUpload.click();
      });

      //when file selected, save to local storage
      backgroundUpload.addEventListener('change', () => {
        const file = backgroundUpload.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function(e) {
            const imageData = e.target.result;
            applyCustomBackground(imageData);
            localStorage.setItem('customBackground', imageData);
          };
          reader.readAsDataURL(file);
        }
      });

      //reset background button
      resetBackgroundBtn?.addEventListener('click', () => {
        localStorage.removeItem('customBackground');
        location.reload();
    });

   //slide menu
   const hamburger = document.getElementById('hamburger');
   const slideoutMenu = document.getElementById('slideout-menu');
   const themeToggleBtn = document.getElementById('theme-toggle');

   hamburger.addEventListener('click', () => {
   slideoutMenu.classList.toggle('open');
   });

    //lightbox function
    document.querySelector('#gallery').addEventListener('click', (e) => {
        if (e.target && e.target.matches('.gallery-item')) {
            const clickedSrc = e.target.src;
            currentIndex = filteredImages.findIndex(img => clickedSrc.includes(img.src));
            if (currentIndex !== -1) {
                openLightbox(currentIndex);
            }
        }
    });

    //closing lightbox when clicked outside
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    leftArrow.addEventListener('click', () => navigateLightbox(-1));
    rightArrow.addEventListener('click', () => navigateLightbox(1));

    //key binds
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('hidden')) {
            if (e.key === 'ArrowRight') navigateLightbox(1);
            else if (e.key === 'ArrowLeft') navigateLightbox(-1);
            else if (e.key === 'Escape') closeLightbox();
        }
    });

    

});

//carousel ui
let autoPlay = false;
let autoPlayInterval = 5000;
let autoPlayTimer;

function startAutoPlay() {
    clearInterval(autoPlayTimer);
    autoPlayTimer = setInterval(() => {
      navigateLightbox(1);
    }, autoPlayInterval);
  }

  function stopAutoPlay() {
    clearInterval(autoPlayTimer);
  }

  //toggle autoplay via ui
  document.getElementById('carousel-toggle').addEventListener('change', function () {
    autoPlay = this.checked;
    if (autoPlay) startAutoPlay();
    else stopAutoPlay();
  });

  //change autoplay interval via input ui
  document.getElementById('carousel-interval').addEventListener('input', function () {
    autoPlayInterval = parseInt(this.value) * 1000;
    if (autoPlay) startAutoPlay();
  });

  //pause autoplay
  document.getElementById('carousel-pause').addEventListener('click', stopAutoPlay);

  //resum autoplay
  document.getElementById('carousel-resume').addEventListener('click', () => {
    if (autoPlay) startAutoPlay();
  });



