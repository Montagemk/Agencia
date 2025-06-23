// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Carrossel de Depoimentos
    const slider = document.getElementById('testimonial-slider');
    if (slider) {
        const testimonialItems = slider.querySelectorAll('.testimonial-item');
        const prevButton = document.querySelector('.nav-button.prev');
        const nextButton = document.querySelector('.nav-button.next');
        let currentIndex = 0;

        function showTestimonial(index) {
            testimonialItems.forEach((item, i) => {
                item.style.display = 'none'; // Esconde todos
                item.style.animation = 'none'; // Reseta animação
                item.offsetHeight; // Força reflow para animação resetar
            });
            testimonialItems[index].style.display = 'block'; // Mostra o item atual
            testimonialItems[index].style.animation = 'fadeIn 0.8s ease-out forwards'; // Aplica animação
        }

        function showNextTestimonial() {
            currentIndex = (currentIndex + 1) % testimonialItems.length;
            showTestimonial(currentIndex);
        }

        function showPrevTestimonial() {
            currentIndex = (currentIndex - 1 + testimonialItems.length) % testimonialItems.length;
            showTestimonial(currentIndex);
        }

        // Navegação manual
        prevButton.addEventListener('click', showPrevTestimonial);
        nextButton.addEventListener('click', showNextTestimonial);

        // Auto-play (opcional)
        setInterval(showNextTestimonial, 7000); // Muda o depoimento a cada 7 segundos
    }

    // Você pode adicionar outras funcionalidades JavaScript aqui, se necessário.
    // Ex: Scroll suave para âncoras, validação de formulário, etc.
});
