/**
 * ==========================================
 * 🚀 CARTÃO DIGITAL - RAFAEL RIBEIRO
 * Funcionalidades JavaScript - Versão Corrigida
 * ==========================================
 */

// =================== CONFIGURAÇÕES GERAIS ===================
const CONFIG = {
    linkedin: {
        url: 'https://www.linkedin.com/in/rhribeiro-adv/',
        alertMessage: 'Por favor, forneça o link do LinkedIn correto!'
    },
    vibration: {
        duration: 50,
        enabled: true
    },
    analytics: {
        enabled: false // Definir como true se quiser tracking
    },
    contacts: {
        whatsapp: '5516999999999', // Substitua pelo número real
        email: 'rafael@example.com' // Substitua pelo email real
    }
};

// =================== INICIALIZAÇÃO ===================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 Cartão Digital carregado com sucesso!');
    
    try {
        initializeAnimations();
        initializeInteractions();
        setupAccessibility();
        setupErrorHandling();
        
        // Log para debug
        if (isDevMode()) {
            console.log('🔧 Modo desenvolvimento ativo');
            console.log('📊 CONFIG:', CONFIG);
        }
    } catch (error) {
        console.error('❌ Erro na inicialização:', error);
    }
});

// =================== UTILITÁRIOS ===================
function isDevMode() {
    return window.location.hostname === 'localhost' || 
           window.location.hostname === '127.0.0.1' ||
           window.location.hostname.includes('file://');
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// =================== ANIMAÇÕES ===================
function initializeAnimations() {
    try {
        const contactItems = document.querySelectorAll('.contact-item');
        const buttons = document.querySelectorAll('.btn');
        const interactiveText = document.querySelector('.interactive-text');
        
        // Verificar se os elementos existem antes de aplicar animações
        if (contactItems.length > 0) {
            contactItems.forEach((item, index) => {
                if (item && item.style) {
                    item.style.animationDelay = `${0.2 + index * 0.1}s`;
                    item.style.animation = 'fadeInUp 0.6s ease-out forwards';
                }
            });
        }
        
        // Animação do texto interativo
        if (interactiveText && interactiveText.style) {
            interactiveText.style.animationDelay = '0.5s';
            interactiveText.style.animation = 'fadeInUp 0.6s ease-out forwards';
        }
        
        // Animação sequencial dos botões
        if (buttons.length > 0) {
            buttons.forEach((btn, index) => {
                if (btn && btn.style) {
                    btn.style.animationDelay = `${0.6 + index * 0.1}s`;
                    btn.style.animation = 'fadeInUp 0.6s ease-out forwards';
                }
            });
        }
        
        console.log('✅ Animações inicializadas');
    } catch (error) {
        console.error('❌ Erro ao inicializar animações:', error);
    }
}

// =================== INTERAÇÕES ===================
function initializeInteractions() {
    try {
        const buttons = document.querySelectorAll('.btn');
        const logoContainer = document.querySelector('.logo-container');
        
        // Adicionar event listeners aos botões com verificação
        if (buttons.length > 0) {
            buttons.forEach(btn => {
                if (btn) {
                    btn.addEventListener('click', handleButtonClick);
                    btn.addEventListener('mouseenter', handleButtonHover);
                    btn.addEventListener('mouseleave', handleButtonLeave);
                    
                    // Adicionar suporte para toque
                    btn.addEventListener('touchstart', handleTouchStart, { passive: true });
                    btn.addEventListener('touchend', handleTouchEnd, { passive: true });
                }
            });
        }
        
        // Easter egg no logo com debounce
        if (logoContainer) {
            let clickCount = 0;
            const resetClickCount = debounce(() => { clickCount = 0; }, 2000);
            
            logoContainer.addEventListener('click', function() {
                clickCount++;
                resetClickCount();
                
                if (clickCount === 5) {
                    showEasterEgg();
                    clickCount = 0;
                }
            });
        }
        
        // Detectar preferências do sistema
        detectSystemPreferences();
        
        console.log('✅ Interações inicializadas');
    } catch (error) {
        console.error('❌ Erro ao inicializar interações:', error);
    }
}

// =================== MANIPULADORES DE EVENTOS ===================
function handleButtonClick(event) {
    try {
        const button = event.currentTarget;
        const buttonType = getButtonType(button);
        
        // Prevenir múltiplos cliques
        if (button.disabled) return;
        button.disabled = true;
        setTimeout(() => { button.disabled = false; }, 300);
        
        // Vibração tátil (com verificação)
        if (CONFIG.vibration.enabled && navigator.vibrate) {
            navigator.vibrate(CONFIG.vibration.duration);
        }
        
        // Animação de clique
        animateButtonPress(button);
        
        // Ação específica do botão
        executeButtonAction(buttonType, button);
        
        // Analytics (se habilitado)
        if (CONFIG.analytics.enabled) {
            trackButtonClick(buttonType);
        }
        
        console.log(`📱 Botão ${buttonType} clicado`);
    } catch (error) {
        console.error('❌ Erro no clique do botão:', error);
    }
}

function handleButtonHover(event) {
    const button = event.currentTarget;
    if (button) {
        button.classList.add('btn-hovered');
    }
}

function handleButtonLeave(event) {
    const button = event.currentTarget;
    if (button) {
        button.classList.remove('btn-hovered');
    }
}

function handleTouchStart(event) {
    const button = event.currentTarget;
    if (button) {
        button.classList.add('btn-touched');
    }
}

function handleTouchEnd(event) {
    const button = event.currentTarget;
    if (button) {
        button.classList.remove('btn-touched');
    }
}

// =================== AÇÕES DOS BOTÕES ===================
function executeButtonAction(buttonType, button) {
    switch (buttonType) {
        case 'WhatsApp':
            openWhatsApp();
            break;
        case 'Email':
            openEmail();
            break;
        case 'LinkedIn':
            handleLinkedInClick();
            break;
        default:
            console.warn('Tipo de botão não reconhecido:', buttonType);
    }
}

function openWhatsApp() {
    const phoneNumber = CONFIG.contacts.whatsapp;
    const message = encodeURIComponent('Olá! Vim através do seu cartão digital.');
    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    
    if (phoneNumber && phoneNumber !== '5516999999999') {
        window.open(url, '_blank', 'noopener,noreferrer');
    } else {
        showCustomAlert('Número do WhatsApp não configurado!');
    }
}

function openEmail() {
    const email = CONFIG.contacts.email;
    const subject = encodeURIComponent('Contato via Cartão Digital');
    const body = encodeURIComponent('Olá Rafael,\n\nVim através do seu cartão digital e gostaria de entrar em contato.\n\nAtenciosamente,');
    
    if (email && email !== 'rafael@example.com') {
        window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    } else {
        showCustomAlert('Email não configurado!');
    }
}

function handleLinkedInClick() {
    const linkedinUrl = CONFIG.linkedin.url;
    
    if (linkedinUrl && linkedinUrl !== 'https://linkedin.com/in/rafael-ribeiro') {
        window.open(linkedinUrl, '_blank', 'noopener,noreferrer');
    } else {
        showCustomAlert(CONFIG.linkedin.alertMessage);
    }
}

// =================== UTILITÁRIOS DE INTERFACE ===================
function animateButtonPress(button) {
    if (!button || !button.style) return;
    
    button.style.transform = 'translateY(-1px) scale(0.98)';
    setTimeout(() => {
        if (button.style) {
            button.style.transform = '';
        }
    }, 150);
}

function getButtonType(button) {
    if (!button || !button.classList) return 'Desconhecido';
    
    if (button.classList.contains('whatsapp')) return 'WhatsApp';
    if (button.classList.contains('email')) return 'Email';
    if (button.classList.contains('linkedin')) return 'LinkedIn';
    return 'Desconhecido';
}

// =================== ALERTAS CUSTOMIZADOS ===================
function showCustomAlert(message) {
    try {
        // Verificar se já existe um alert
        const existingAlert = document.querySelector('.custom-alert');
        if (existingAlert) {
            existingAlert.remove();
        }
        
        const alertDiv = document.createElement('div');
        alertDiv.className = 'custom-alert';
        alertDiv.setAttribute('role', 'dialog');
        alertDiv.setAttribute('aria-modal', 'true');
        alertDiv.setAttribute('aria-labelledby', 'alert-title');
        
        alertDiv.innerHTML = `
            <div class="alert-content">
                <p id="alert-title">${message}</p>
                <button class="alert-btn" onclick="this.closest('.custom-alert').remove()" aria-label="Fechar alerta">OK</button>
            </div>
        `;
        
        // Estilos inline para o alert customizado
        Object.assign(alertDiv.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: '1000',
            backdropFilter: 'blur(5px)',
            animation: 'fadeIn 0.3s ease-out'
        });
        
        const alertContent = alertDiv.querySelector('.alert-content');
        Object.assign(alertContent.style, {
            background: '#ffffff',
            padding: '30px',
            borderRadius: '15px',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
            maxWidth: '300px',
            margin: '20px',
            animation: 'slideIn 0.3s ease-out'
        });
        
        const alertButton = alertContent.querySelector('.alert-btn');
        Object.assign(alertButton.style, {
            background: '#D4AF37',
            color: '#ffffff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '20px',
            marginTop: '15px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '14px',
            transition: 'all 0.3s ease'
        });
        
        // Adicionar hover effect
        alertButton.addEventListener('mouseenter', () => {
            alertButton.style.background = '#B8941F';
        });
        
        alertButton.addEventListener('mouseleave', () => {
            alertButton.style.background = '#D4AF37';
        });
        
        document.body.appendChild(alertDiv);
        
        // Focar no botão para acessibilidade
        alertButton.focus();
        
        // Remover após 5 segundos
        setTimeout(() => {
            if (alertDiv && alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 5000);
        
        // Permitir fechar com ESC
        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                alertDiv.remove();
                document.removeEventListener('keydown', handleEsc);
            }
        };
        document.addEventListener('keydown', handleEsc);
        
    } catch (error) {
        console.error('❌ Erro ao mostrar alert:', error);
        // Fallback para alert nativo
        alert(message);
    }
}

function showEasterEgg() {
    const messages = [
        '🎉 Você encontrou o Easter Egg!',
        '⚖️ Direito Civil em ação!',
        '🏠 Especialista em Imobiliário!',
        '📞 Entre em contato!'
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    showCustomAlert(randomMessage);
    
    // Adicionar confete se disponível
    if (typeof confetti !== 'undefined') {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
    
    console.log('🎉 Easter Egg ativado!');
}

// =================== ACESSIBILIDADE ===================
function setupAccessibility() {
    try {
        // Navegação por teclado
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', function() {
            document.body.classList.remove('keyboard-navigation');
        });
        
        // Configurar atributos ARIA
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(btn => {
            if (btn) {
                btn.setAttribute('role', 'button');
                btn.setAttribute('tabindex', '0');
                
                // Adicionar texto descritivo
                const buttonType = getButtonType(btn);
                btn.setAttribute('aria-label', `Abrir ${buttonType}`);
                
                // Suporte para Enter e Space
                btn.addEventListener('keydown', function(event) {
                    if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        this.click();
                    }
                });
            }
        });
        
        console.log('✅ Acessibilidade configurada');
    } catch (error) {
        console.error('❌ Erro ao configurar acessibilidade:', error);
    }
}

// =================== DETECÇÃO DE SISTEMA ===================
function detectSystemPreferences() {
    try {
        // Modo escuro
        if (window.matchMedia) {
            const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
            
            if (darkModeQuery.matches) {
                console.log('🌙 Modo escuro detectado');
                document.body.setAttribute('data-theme', 'dark');
            }
            
            // Listener para mudanças
            darkModeQuery.addEventListener('change', (e) => {
                if (e.matches) {
                    document.body.setAttribute('data-theme', 'dark');
                } else {
                    document.body.removeAttribute('data-theme');
                }
            });
        }
        
        // Movimento reduzido
        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (motionQuery.matches) {
            console.log('🎭 Movimento reduzido detectado');
            document.body.classList.add('reduce-motion');
        }
        
    } catch (error) {
        console.error('❌ Erro ao detectar preferências:', error);
    }
}

// =================== TRATAMENTO DE ERROS ===================
function setupErrorHandling() {
    window.addEventListener('error', function(event) {
        console.error('❌ Erro global capturado:', {
            message: event.message,
            filename: event.filename,
            lineno: event.lineno,
            colno: event.colno,
            error: event.error
        });
    });
    
    window.addEventListener('unhandledrejection', function(event) {
        console.error('❌ Promise rejeitada:', event.reason);
    });
}

// =================== ANALYTICS (OPCIONAL) ===================
function trackButtonClick(buttonType) {
    try {
        // Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', 'click', {
                event_category: 'Button',
                event_label: buttonType,
                value: 1
            });
        }
        
        // Google Analytics Universal
        if (typeof ga !== 'undefined') {
            ga('send', 'event', 'Button', 'click', buttonType, 1);
        }
        
        console.log(`📊 Analytics: ${buttonType} button clicked`);
    } catch (error) {
        console.error('❌ Erro no tracking:', error);
    }
}

// =================== PERFORMANCE ===================
function lazyLoadElements() {
    try {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('loaded');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '10px'
            });
            
            document.querySelectorAll('.contact-item, .btn').forEach(el => {
                if (el) observer.observe(el);
            });
        }
    } catch (error) {
        console.error('❌ Erro no lazy loading:', error);
    }
}

// =================== FUNCIONALIDADES EXTRAS ===================
function shareCard() {
    try {
        const shareData = {
            title: 'Rafael Ribeiro - Advogado',
            text: 'Especialista em Direito Civil e Imobiliário',
            url: window.location.href
        };
        
        if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
            navigator.share(shareData);
        } else {
            // Fallback para clipboard
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(window.location.href).then(() => {
                    showCustomAlert('Link copiado para a área de transferência!');
                }).catch(() => {
                    fallbackCopyToClipboard(window.location.href);
                });
            } else {
                fallbackCopyToClipboard(window.location.href);
            }
        }
    } catch (error) {
        console.error('❌ Erro ao compartilhar:', error);
        fallbackCopyToClipboard(window.location.href);
    }
}

function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCustomAlert('Link copiado para a área de transferência!');
    } catch (error) {
        showCustomAlert('Não foi possível copiar o link.');
    }
    
    document.body.removeChild(textArea);
}

// =================== DETECÇÃO DE DISPOSITIVO ===================
function getDeviceInfo() {
    const userAgent = navigator.userAgent || '';
    
    return {
        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent),
        isIOS: /iPad|iPhone|iPod/.test(userAgent),
        isAndroid: /Android/.test(userAgent),
        isSafari: /Safari/.test(userAgent) && !/Chrome/.test(userAgent),
        isChrome: /Chrome/.test(userAgent),
        isFirefox: /Firefox/.test(userAgent),
        userAgent: userAgent,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight
    };
}

// =================== EXPORTAR FUNÇÕES GLOBAIS ===================
window.RafaelRibeiroCard = {
    handleLinkedInClick,
    shareCard,
    getDeviceInfo,
    showCustomAlert,
    CONFIG
};

// =================== INICIALIZAÇÃO FINAL ===================
// Chamar lazy loading após carregamento
if (document.readyState === 'complete') {
    lazyLoadElements();
} else {
    window.addEventListener('load', lazyLoadElements);
}

// Log de inicialização
console.log('🎯 Rafael Ribeiro - Cartão Digital v2.0');
console.log('📱 Funcionalidades carregadas:', {
    animations: '✅',
    interactions: '✅',
    accessibility: '✅',
    responsive: '✅',
    errorHandling: '✅',
    performance: '✅'
});

// Log de informações do dispositivo em modo dev
if (isDevMode()) {
    console.log('📊 Device Info:', getDeviceInfo());
}
