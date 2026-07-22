// Logic điều khiển Hero Slider trên trang chủ
let slideIndex = 1;

document.addEventListener('DOMContentLoaded', () => {
    showSlides(slideIndex);
    // Tự động chuyển slide sau mỗi 5 giây
    setInterval(() => {
        plusSlides(1);
    }, 5000);
});

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let slides = document.getElementsByClassName("hero-slide");
    let dots = document.getElementsByClassName("dot");
    
    if (!slides.length) return;

    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }

    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active');
    }

    slides[slideIndex - 1].classList.add('active');
    if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].classList.add('active');
    }
}