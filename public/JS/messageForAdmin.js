
    document.addEventListener('DOMContentLoaded', function() {
        const nameElements = document.querySelectorAll('[data-email]');
        const initialElements = document.querySelectorAll('[data-initial]');

        nameElements.forEach(el => {
            const email = el.getAttribute('data-email');
            const name = email.split('@')[0].split('.').join(' ');
            el.textContent = name;
        });

        initialElements.forEach(el => {
            const username = el.getAttribute('data-initial');
            const initial = username[0].toUpperCase();
            el.textContent = initial;
        });
    });
