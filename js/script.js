<script>
        // Adiciona animação de entrada aos elementos
        document.addEventListener('DOMContentLoaded', function() {
            const contactItems = document.querySelectorAll('.contact-item');
            const buttons = document.querySelectorAll('.btn');
            
            contactItems.forEach((item, index) => {
                item.style.animationDelay = `${0.2 + index * 0.1}s`;
                item.style.animation = 'slideUp 0.6s ease-out forwards';
            });
            
            buttons.forEach((btn, index) => {
                btn.style.animationDelay = `${0.5 + index * 0.1}s`;
                btn.style.animation = 'slideUp 0.6s ease-out forwards';
            });
        });

        // Efeito de vibração no clique dos botões
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', function() {
                if (navigator.vibrate) {
                    navigator.vibrate(50);
                }
            });
        });
    </script>
