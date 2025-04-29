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