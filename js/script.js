/**
 * ==========================================
 * 🚀 CARTÃO DIGITAL - RAFAEL RIBEIRO
 * Funcionalidades JavaScript
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
    }
};

// =================== INICIALIZAÇÃO ===================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 Cartão Digital carregado com sucesso!');
    
    initializeAnimations();
    initializeInteractions();
    setupAccessibility();
    
    // Log para debug
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('🔧 Modo desenvolvimento ativo');
    }
});

// =================== ANIMAÇÕES ===================
function initializeAnimations() {
    const contactItems = document.querySelectorAll('.contact-item');
    const buttons = document.querySelectorAll('.btn');
    const interactiveText = document.querySelector('.interactive-text');
    
    // Animação sequencial dos itens de contato
    contactItems.forEach((item, index) => {
        item.style.animationDelay = `${0.2 + index * 0.1}s`;
        item.style.animation = 'fadeInUp 0.6s ease-out forwards';
    });
    
    // Animação do texto interativo
    if (interactiveText) {
        interactiveText.style.animationDelay = '0.5s';
        interactiveText.style.animation = 'fadeInUp 0.6s ease-out forwards';
    }
    
    // Animação sequencial dos botões
    buttons.forEach((btn, index) => {
        btn.style.animationDelay = `${0.6 + index * 0.1}s`;
        btn.style.animation = 'fadeInUp 0.6s ease-out forwards';
    });
}

// =================== INTERAÇÕES ===================
function initializeInteractions() {
    const buttons = document.querySelectorAll('.btn');
    const logoContainer = document.querySelector('.logo-container');
    
    // Adicionar event listeners aos botões
    buttons.forEach(btn => {
        btn.addEventListener('click', handleButtonClick);
        btn.addEventListener('mouseenter', handleButtonHover);
        btn.addEventListener('mouseleave', handleButtonLeave);
    });
    
    // Easter egg no logo
    if (logoContainer) {
        let clickCount = 0;
        logoContainer.addEventListener('click', function() {
            clickCount++;
            if (clickCount === 5) {
                showEasterEgg();
                clickCount = 0;
            }
        });
    }
    
    // Detectar modo escuro do sistema
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        console.log('🌙 Modo escuro detectado');
    }
}

// =================== MANIPULADORES DE EVENTOS ===================
function handleButtonClick(event) {
    const button = event.currentTarget;
    const buttonType = getButtonType(button);
    
    // Vibração tátil
    if (CONFIG.vibration.enabled && navigator.vibrate) {
        navigator.vibrate(CONFIG.vibration.duration);
    }
    
    // Animação de clique
    button.style.transform = 'translateY(-1px) scale(0.98)';
    setTimeout(() => {
        button.style.transform = '';
    }, 150);
    
    // Analytics (se habilitado)
    if (CONFIG.analytics.enabled) {
        trackButtonClick(buttonType);
    }
    
    console.log(`📱 Botão ${buttonType} clicado`);
}

function handleButtonHover(event) {
    const button = event.currentTarget;
    
    // Adicionar classe de hover personalizada se necessário
    button.classList.add('btn-hovered');
}

function handleButtonLeave(event) {
    const button = event.currentTarget;
    
    // Remover classe de hover personalizada
    button.classList.remove('btn-hovered');
}

// =================== FUNCIONALIDADES ESPECÍFICAS ===================
function handleLinkedInClick() {
    if (CONFIG.linkedin.url && CONFIG.linkedin.url !== 'https://linkedin.com/in/rafael-ribeiro') {
        window.open(CONFIG.linkedin.url, '_blank');
    } else {
        showCustomAlert(CONFIG.linkedin.alertMessage);
    }
}

function getButtonType(button) {
    if (button.classList.contains('whatsapp')) return 'WhatsApp';
    if (button.classList.contains('email')) return 'Email';
    if (button.classList.contains('linkedin')) return 'LinkedIn';
    return 'Desconhecido';
}

// =================== UTILIDADES ===================
function showCustomAlert(message) {
    // Alert customizado mais elegante que o alert() padrão
    const alertDiv = document.createElement('div');
    alertDiv.className = 'custom-alert';
    alertDiv.innerHTML = `
        <div class="alert-content">
            <p>${message}</p>
            <button onclick="this.parentElement.parentElement.remove()">OK</button>
        </div>
    `;
    
    // Estilos inline para o alert customizado
    alertDiv.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        backdrop-filter: blur(5px);
    `;
    
    const alertContent = alertDiv.querySelector('.alert-content');
    alertContent.style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 15px;
        text-align: center;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        max-width: 300px;
        margin: 20px;
    `;
    
    const alertButton = alertContent.querySelector('button');
    alertButton.style.cssText = `
        background: #D4AF37;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 20px;
        margin-top: 15px;
        cursor: pointer;
        font-weight: 600;
    `;
    
    document.body.appendChild(alertDiv);
    
    // Remover após 5 segundos
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
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
        confetti();
    }
}

// =================== ACESSIBILIDADE ===================
function setupAccessibility() {
    // Navegação por teclado
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Anunciar mudanças para leitores de tela
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.setAttribute('role', 'button');
        btn.setAttribute('tabindex', '0');
    });
}

// =================== ANALYTICS (OPCIONAL) ===================
function trackButtonClick(buttonType) {
    // Integração com Google Analytics, se disponível
    if (typeof gtag !== 'undefined') {
        gtag('event', 'click', {
            event_category: 'Button',
            event_label: buttonType,
            value: 1
        });
    }
    
    // Ou outro sistema de analytics
    console.log(`📊 Analytics: ${buttonType} button clicked`);
}

// =================== PERFORMANCE ===================
// Lazy loading para elementos não críticos
function lazyLoadElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
            }
        });
    });
    
    document.querySelectorAll('.contact-item, .btn').forEach(el => {
        observer.observe(el);
    });
}

// =================== MODO ESCURO (FUTURO) ===================
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// =================== COMPARTILHAMENTO ===================
function shareCard() {
    if (navigator.share) {
        navigator.share({
            title: 'Rafael Ribeiro - Advogado',
            text: 'Especialista em Direito Civil e Imobiliário',
            url: window.location.href
        });
    } else {
        // Fallback para dispositivos sem Web Share API
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            showCustomAlert('Link copiado para a área de transferência!');
        });
    }
}

// =================== DETECÇÃO DE DISPOSITIVO ===================
function getDeviceInfo() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);
    
    return {
        isMobile,
        isIOS,
        isAndroid,
        userAgent: navigator.userAgent
    };
}

// =================== EXPORTAR FUNÇÕES GLOBAIS ===================
// Disponibilizar funções para uso global se necessário
window.RafaelRibeiroCard = {
    handleLinkedInClick,
    shareCard,
    toggleDarkMode,
    getDeviceInfo
};

// =================== LOG DE INICIALIZAÇÃO ===================
console.log('🎯 Rafael Ribeiro - Cartão Digital v1.0');
console.log('📱 Funcionalidades carregadas:', {
    animations: '✅',
    interactions: '✅',
    accessibility: '✅',
    responsive: '✅'
});
