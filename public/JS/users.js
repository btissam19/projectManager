document.addEventListener('DOMContentLoaded', function() {
            const nameElements = document.querySelectorAll('[data-email]');
            nameElements.forEach(el => {
                const email = el.getAttribute('data-email');
                const name = email.split('@')[0].split('.').join(' ');
                el.textContent = name;
            });
        });