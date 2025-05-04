document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileMenu = document.querySelector('.mobileMenu');

    if (hamburgerMenu && mobileMenu){
        hamburgerMenu.addEventListener('click' , function(){
            mobileMenu.classList.toggle('open');
            hamburgerMenu.classList.toggle('active');
        });
    }
});

// buat div diarahkan ke href
const clickableDivs = document.querySelectorAll(".href-class");

clickableDivs.forEach((div) => {
  div.addEventListener("click", function () {
    window.open(this.dataset.href, "_blank");
  });
});





// bagian berita
const sliderContainer = document.querySelector('.news-slider-container');
const slider = document.getElementById('newsSlider');
const newsItems = document.querySelectorAll('.news-item');
const itemCount = newsItems.length;
let currentIndex = 0;
let autoSlideInterval;
let isDragging = false;
let startPosition = 0;
let currentTranslate = 0;
let prevTranslate = 0;

function getVisibleItems() {
    if (window.innerWidth <= 768) {
        return 2;
    } else {
        return 3;
    }
}

function moveSlider() {
    const visibleItems = getVisibleItems();
    slider.style.transform = `translateX(-${currentIndex * (100 / visibleItems)}%)`;
}

function nextSlide() {
    const visibleItems = getVisibleItems();
    currentIndex = (currentIndex + 1) % (itemCount - visibleItems + (visibleItems === 2 ? 1 : 0));
    moveSlider();
}

function prevSlide() {
    const visibleItems = getVisibleItems();
    currentIndex = (currentIndex - 1 + (itemCount - visibleItems + (visibleItems === 2 ? 1 : 0))) % (itemCount - visibleItems + (visibleItems === 2 ? 1 : 0));
    moveSlider();
}

function startAutoSlide() {
    clearInterval(autoSlideInterval); 
    autoSlideInterval = setInterval(nextSlide, 3000);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

//function drag
function getPositionX(event) {
    return event.clientX || (event.touches && event.touches[0].clientX);
}

function dragStart(event) {
    isDragging = true;
    startPosition = getPositionX(event);
    const transformMatrix = window.getComputedStyle(slider).getPropertyValue('transform');
    if (transformMatrix !== 'none') {
        currentTranslate = parseFloat(transformMatrix.split(',')[4]);
    } else {
        currentTranslate = 0;
    }
    stopAutoSlide();
}

function dragging(event) {
    if (!isDragging) return;
    const currentPosition = getPositionX(event);
    const diffX = currentPosition - startPosition;
    currentTranslate = prevTranslate + diffX;
    slider.style.transform = `translateX(${currentTranslate}px)`;
}

function dragEnd(event) {
    if (!isDragging) return;
    isDragging = false;
    const movedBy = currentTranslate - prevTranslate;

    if (Math.abs(movedBy) > 50) {
        if (movedBy < 0 && currentIndex < itemCount - 3) {
            currentIndex++;
        } else if (movedBy > 0 && currentIndex > 0) {
            currentIndex--;
        }
    }
    moveSlider();
    startAutoSlide();
    prevTranslate = parseFloat(window.getComputedStyle(slider).getPropertyValue('transform').split(',')[4]) || 0;
}

// Event Listeners drag (buat windows)
sliderContainer.addEventListener('mousedown', dragStart);
sliderContainer.addEventListener('mousemove', dragging);
sliderContainer.addEventListener('mouseup', dragEnd);
sliderContainer.addEventListener('mouseleave', dragEnd);

// Event Listeners drag (buat hp)
sliderContainer.addEventListener('touchstart', dragStart);
sliderContainer.addEventListener('touchmove', dragging);
sliderContainer.addEventListener('touchend', dragEnd);


moveSlider();
startAutoSlide();

window.addEventListener('resize',() => {
    moveSlider();
    startAutoSlide();
})


AOS.init();
