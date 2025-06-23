// Script principal do site Craft Profissionais
document.addEventListener('DOMContentLoaded', function() {
    
    // Animações de entrada quando elementos aparecem na tela
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar elementos para animação
    const elementsToAnimate = document.querySelectorAll('.step, .service-card, .feature, .testimonial');
    elementsToAnimate.forEach(element => {
        element.classList.add('loading');
        observer.observe(element);
    });

    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Tracking de cliques nos botões de WhatsApp
    const whatsappButtons = document.querySelectorAll('a[href*="whatsapp"]');
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Analytics event (se você usar Google Analytics)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    event_category: 'WhatsApp',
                    event_label: 'CTA Click',
                    value: 1
                });
            }
            
            // Console log para debug
            console.log('WhatsApp button clicked:', this.href);
        });
    });

    // Efeito parallax suave no hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            hero.style.backgroundPositionY = rate + 'px';
        }
    });

    // Contador de tempo na página (para analytics)
    let startTime = Date.now();
    let timeOnPage = 0;
    
    setInterval(function() {
        timeOnPage = Math.floor((Date.now() - startTime) / 1000);
    }, 1000);

    // Enviar tempo na página quando usuário sair
    window.addEventListener('beforeunload', function() {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'timing_complete', {
                name: 'time_on_page',
                value: timeOnPage
            });
        }
    });

    // Efeito de typing no título principal (opcional)
    const heroTitle = document.querySelector('.hero-text h2');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeSpeed = 50;
        
        function typeWriter() {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, typeSpeed);
            }
        }
        
        // Iniciar o efeito após um pequeno delay
        setTimeout(typeWriter, 500);
    }

    // Validação básica de formulários (se houver)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ff6b6b';
                    input.placeholder = 'Este campo é obrigatório';
                } else {
                    input.style.borderColor = '#4ecdc4';
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Por favor, preencha todos os campos obrigatórios.');
            }
        });
    });

    // Lazy loading para imagens
    const images = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('loading');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });

    // Feedback visual para botões
    const buttons = document.querySelectorAll('.cta-button, .whatsapp-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Detecção de dispositivo móvel
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        document.body.classList.add('mobile-device');
        
        // Ajustar comportamento para mobile
        const whatsappFloat = document.querySelector('.whatsapp-float');
        if (whatsappFloat) {
            whatsappFloat.style.bottom = '80px'; // Evitar conflito com navegadores mobile
        }
    }

    // Performance: remover animações em dispositivos com preferência por menos movimento
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.querySelectorAll('*').forEach(el => {
            el.style.animationDuration = '0.01ms';
            el.style.animationIterationCount = '1';
            el.style.transitionDuration = '0.01ms';
        });
    }

    // Debug info (removir em produção)
    console.log('🚀 Craft Profissionais - Site carregado com sucesso!');
    console.log('📱 WhatsApp: (41) 9 8460-8623');
    console.log('🌐 Site: craftprofissionais.store');
    
    // Preload de recursos importantes
    const preloadLinks = [
        '/hero.jpg',
        '/favicon.png'
    ];
    
    preloadLinks.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = href;
        document.head.appendChild(link);
    });

    // Função para mostrar toast de sucesso (se necessário)
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <span class="toast-icon">${type === 'success' ? '✅' : '❌'}</span>
                <span class="toast-message">${message}</span>
            </div>
        `;
        
        // Estilos inline para o toast
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4ecdc4' : '#ff6b6b'};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        // Animar entrada
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 100);
        
        // Remover após 3 segundos
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }

    // Exportar função para uso global se necessário
    window.craftUtils = {
        showToast: showToast,
        isMobile: isMobile,
        timeOnPage: () => timeOnPage
    };
});
