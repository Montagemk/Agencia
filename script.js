document.addEventListener('DOMContentLoaded', function() {
    // Menu Responsivo
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });
    }

    // Carrossel de Imagens
    let slideIndex = 1;
    showSlides(slideIndex);

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    function showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("carousel-slide");
        let dots = document.getElementsByClassName("dot");
        if (n > slides.length) { slideIndex = 1 }
        if (n < 1) { slideIndex = slides.length }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active-dot", "");
        }
        if (slides.length > 0) { // Garante que há slides para mostrar
            slides[slideIndex - 1].style.display = "block";
            dots[slideIndex - 1].className += " active-dot";
        }
    }

    // Navegação do Carrossel (setas)
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

    if (prevButton && nextButton) {
        prevButton.addEventListener('click', function() {
            plusSlides(-1);
        });

        nextButton.addEventListener('click', function() {
            plusSlides(1);
        });
    }

    // Carrossel Automático
    let autoSlideInterval = setInterval(function() {
        plusSlides(1);
    }, 5000); // Muda a imagem a cada 5 segundos

    // Pausar/Retomar no hover (opcional, pode ser adicionado)
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseover', () => clearInterval(autoSlideInterval));
        carouselContainer.addEventListener('mouseleave', () => {
            autoSlideInterval = setInterval(() => plusSlides(1), 5000);
        });
    }
});
