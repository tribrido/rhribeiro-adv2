/* ========================= RAFAEL RIBEIRO — MAIN.JS PREMIUM ========================= */

(function () {
  'use strict';

  /* ========================= UTILIDADES ========================= */

  const onDOMReady = (fn) => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  };

  /* ========================= ANO DINÂMICO ========================= */

  const atualizarAno = () => {
    const anoElement = document.getElementById('ano');
    if (anoElement) {
      anoElement.textContent = new Date().getFullYear();
    }
  };

  /* ========================= HEADER SCROLL ========================= */

  const initHeaderScroll = () => {
    const header = document.getElementById('header');
    if (!header) return;

    let ticking = false;

    const update = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      header.classList.toggle('scrolled', scrollY > 80);
      ticking = false;
    };

    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          requestAnimationFrame(update);
          ticking = true;
        }
      },
      { passive: true }
    );
  };

  /* ========================= FADE-IN AO SCROLL ========================= */

  const initScrollAnimations = () => {
    const elements = document.querySelectorAll('#contato, footer');
    if (!elements.length) return;

    if (!('IntersectionObserver' in window)) {
      elements.forEach(el => el.classList.add('fade-in-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    elements.forEach(el => {
      el.classList.add('fade-in-element');
      observer.observe(el);
    });
  };

  /* ========================= SMOOTH SCROLL ========================= */

  const initSmoothScroll = () => {
    const header = document.getElementById('header');

    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', e => {
        const href = link.getAttribute('href');
        if (!href || href === '#') return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        const offset = header ? header.offsetHeight : 0;

        window.scrollTo({
          top: target.offsetTop - offset,
          behavior: 'smooth'
        });
      });
    });
  };

  /* ========================= WHATSAPP FLUTUANTE ========================= */

  const initWhatsAppFloat = () => {
    const btn = document.getElementById('whatsapp-float');
    if (!btn) return;

    let lastScroll = 0;
    let ticking = false;

    btn.style.transition = 'transform 0.3s ease, opacity 0.3s ease';

    const update = () => {
      const current = window.scrollY;
      if (current > lastScroll && current > 300) {
        btn.style.transform = 'translateY(120px)';
        btn.style.opacity = '0';
      } else {
        btn.style.transform = 'translateY(0)';
        btn.style.opacity = '1';
      }
      lastScroll = current;
      ticking = false;
    };

    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          requestAnimationFrame(update);
          ticking = true;
        }
      },
      { passive: true }
    );
  };

  /* ========================= ANALYTICS SIMPLES ========================= */

  const initAnalytics = () => {
    const map = {
      email: 'Email',
      whatsapp: 'WhatsApp Contato',
      instagram: 'Instagram',
      linkedin: 'LinkedIn',
      'whatsapp-float': 'WhatsApp Flutuante'
    };

    Object.entries(map).forEach(([id, label]) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('click', () =>
          console.log(`Clique rastreado: ${label}`)
        );
      }
    });
  };

  /* ========================= ACESSIBILIDADE ========================= */

  const initAccessibility = () => {
    document.addEventListener('mousedown', () =>
      document.body.classList.add('using-mouse')
    );
    document.addEventListener('keydown', () =>
      document.body.classList.remove('using-mouse')
    );
  };

  /* ========================= CSS DINÂMICO ========================= */

  const addDynamicStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
      .fade-in-element {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity .8s ease, transform .8s ease;
      }
      .fade-in-visible {
        opacity: 1;
        transform: translateY(0);
      }
      .using-mouse *:focus {
        outline: none;
      }
      body:not(.site-loaded) {
        opacity: 0;
      }
      body.site-loaded {
        opacity: 1;
        transition: opacity .3s ease;
      }
    `;
    document.head.appendChild(style);
  };

  /* ========================= INIT ========================= */

  onDOMReady(() => {
    console.log('🎯 Rafael Ribeiro Advocacia — Site Premium Carregado');

    atualizarAno();
    initHeaderScroll();
    initScrollAnimations();
    initSmoothScroll();
    initWhatsAppFloat();
    initAnalytics();
    initAccessibility();
    addDynamicStyles();

    document.body.classList.add('site-loaded');
  });
})();

/* ========================= UTILITÁRIOS GLOBAIS ========================= */

window.debounce = function (fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
};

window.throttle = function (fn, limit) {
  let locked = false;
  return (...args) => {
    if (!locked) {
      fn.apply(this, args);
      locked = true;
      setTimeout(() => (locked = false), limit);
    }
  };
};
