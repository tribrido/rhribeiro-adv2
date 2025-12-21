/* ========================= RAFAEL RIBEIRO — MAIN.JS PREMIUM ========================= */

/**
 * Configuração Inicial
 */
(function() {
  'use strict';

  // =============== ANO DINÂMICO NO FOOTER ===============
  const atualizarAno = () => {
    const anoElement = document.getElementById('ano');
    if (anoElement) {
      anoElement.textContent = new Date().getFullYear();
    }
  };

  // =============== HEADER COM EFEITO SCROLL ===============
  const initHeaderScroll = () => {
    const header = document.getElementById('header');
    let lastScroll = 0;
    let ticking = false;

    const updateHeader = () => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

      if (currentScroll > 80) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      lastScroll = currentScroll;
      ticking = false;
    };

    const requestHeaderUpdate = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestHeaderUpdate, { passive: true });
  };

  // =============== ANIMAÇÃO DE FADE-IN AO SCROLL ===============
  const initScrollAnimations = () => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-visible');
          // Opcional: parar de observar após animação
          // observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Elementos para animar
    const animateElements = document.querySelectorAll('#contato, footer');
    animateElements.forEach(el => {
      el.classList.add('fade-in-element');
      observer.observe(el);
    });
  };

  // =============== SMOOTH SCROLL PARA LINKS ÂNCORA ===============
  const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Ignora se for apenas "#" ou href vazio
        if (href === '#' || !href) return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const headerHeight = document.getElementById('header').offsetHeight;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  };

  // =============== WHATSAPP FLUTUANTE - ESCONDER AO SCROLL PARA BAIXO ===============
  const initWhatsAppFloat = () => {
    const whatsappBtn = document.getElementById('whatsapp-float');
    if (!whatsappBtn) return;

    let lastScrollTop = 0;
    let ticking = false;

    const updateWhatsAppVisibility = () => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      
      // Esconde ao rolar para baixo, mostra ao rolar para cima
      if (currentScroll > lastScrollTop && currentScroll > 300) {
        whatsappBtn.style.transform = 'translateY(100px)';
        whatsappBtn.style.opacity = '0';
      } else {
        whatsappBtn.style.transform = 'translateY(0)';
        whatsappBtn.style.opacity = '1';
      }

      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
      ticking = false;
    };

    const requestUpdate = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateWhatsAppVisibility);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestUpdate, { passive: true });

    // Adiciona transição suave
    whatsappBtn.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
  };

  // =============== ANALYTICS DE CLIQUES (OPCIONAL) ===============
  const initAnalytics = () => {
    // Rastrear cliques em links de contato
    const trackClick = (element, label) => {
      element.addEventListener('click', () => {
        console.log(`Clique rastreado: ${label}`);
        // Aqui você pode integrar com Google Analytics, etc:
        // gtag('event', 'click', { event_category: 'contato', event_label: label });
      });
    };

    const emailBtn = document.getElementById('email');
    const whatsappBtn = document.getElementById('whatsapp');
    const instagramBtn = document.getElementById('instagram');
    const linkedinBtn = document.getElementById('linkedin');
    const whatsappFloat = document.getElementById('whatsapp-float');

    if (emailBtn) trackClick(emailBtn, 'Email');
    if (whatsappBtn) trackClick(whatsappBtn, 'WhatsApp - Contato');
    if (instagramBtn) trackClick(instagramBtn, 'Instagram');
    if (linkedinBtn) trackClick(linkedinBtn, 'LinkedIn');
    if (whatsappFloat) trackClick(whatsappFloat, 'WhatsApp - Flutuante');
  };

  // =============== LOADING DE IMAGENS LAZY ===============
  const initLazyLoading = () => {
    // Navegadores modernos já suportam loading="lazy" nativamente
    // Este código é um fallback para navegadores antigos
    if ('loading' in HTMLImageElement.prototype) {
      // Suporte nativo, nada a fazer
      return;
    }

    // Fallback para navegadores antigos
    const images = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  };

  // =============== PREVENIR SPAM DE CLIQUES ===============
  const initClickThrottle = () => {
    const buttons = document.querySelectorAll('a[href^="https://wa.me"]');
    
    buttons.forEach(button => {
      let isThrottled = false;

      button.addEventListener('click', () => {
        if (isThrottled) return;

        isThrottled = true;
        setTimeout(() => {
          isThrottled = false;
        }, 3000); // 3 segundos de throttle
      });
    });
  };

  // =============== ACESSIBILIDADE - FOCO VISÍVEL ===============
  const initAccessibility = () => {
    // Remove outline quando usa mouse, mantém quando usa teclado
    let isUsingMouse = false;

    document.addEventListener('mousedown', () => {
      isUsingMouse = true;
      document.body.classList.add('using-mouse');
    });

    document.addEventListener('keydown', () => {
      isUsingMouse = false;
      document.body.classList.remove('using-mouse');
    });
  };

  // =============== INICIALIZAÇÃO ===============
  const init = () => {
    // Espera o DOM estar pronto
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }

    console.log('🎯 Rafael Ribeiro Advocacia — Site Premium Carregado');

    // Executar todas as funções
    atualizarAno();
    initHeaderScroll();
    initScrollAnimations();
    initSmoothScroll();
    initWhatsAppFloat();
    initAnalytics();
    initLazyLoading();
    initClickThrottle();
    initAccessibility();

    // Adicionar classe de loaded no body
    document.body.classList.add('site-loaded');
  };

  // Inicia quando o DOM estiver pronto
  init();

  // =============== CSS ADICIONAL VIA JS (OPCIONAL) ===============
  const addDynamicStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
      /* Animação de Fade-In */
      .fade-in-element {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
      }

      .fade-in-visible {
        opacity: 1;
        transform: translateY(0);
      }

      /* Outline apenas para navegação por teclado */
      .using-mouse *:focus {
        outline: none;
      }

      /* Loading state */
      body:not(.site-loaded) {
        opacity: 0;
      }

      body.site-loaded {
        opacity: 1;
        transition: opacity 0.3s ease;
      }
    `;
    document.head.appendChild(style);
  };

  addDynamicStyles();

})();

/* ========================= UTILITÁRIOS GLOBAIS ========================= */

/**
 * Debounce function para otimizar eventos
 * @param {Function} func - Função a ser executada
 * @param {number} wait - Tempo de espera em ms
 */
window.debounce = function(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function para otimizar eventos
 * @param {Function} func - Função a ser executada
 * @param {number} limit - Limite de tempo em ms
 */
window.throttle = function(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};