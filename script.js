document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling para links de âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Você pode adicionar mais funcionalidades JavaScript aqui no futuro, se precisar.
    // Ex: Validação de formulário mais complexa, animações, etc.
});
