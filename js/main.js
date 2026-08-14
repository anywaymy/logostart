document.addEventListener('DOMContentLoaded', () => {

    // ДЛЯ ОТЗЫВОВ
    const cards = document.querySelectorAll('#reviews-grid .review-card');
    const counter = document.getElementById('review-counter');
    const btnPrev = document.getElementById('btn-review-prev');
    const btnNext = document.getElementById('btn-review-next');

    // ДЛЯ ПЕРЕКЛЮЧЕНИЯ МЕЖДУ ГОРОДАМИ
    const btnContactsStavropol = document.getElementById('btn-contacts-stavropol');
    const btnContactsMikhailovsk = document.getElementById('btn-contacts-mikhailovsk');

    const blockStavropol = document.getElementById('contacts-stavropol');
    const blockMikhailovsk = document.getElementById('contacts-mikhailovsh');
    const contactsActiveClasses = ['active-btn', 'bg-white', 'text-rose-600', 'shadow-sm'];

    // ДЛЯ МОБИЛЬНОГО МЕНЮ
    const burger = document.getElementById('btn-toggle-mobile-menu');
    const mobileMenu = document.getElementById('mobile-menu');

    // ДЛЯ ЯНДЕКС КАРТ
    const contactsSection = document.getElementById('contacts');


    // МОБИЛЬНОЕ МЕНЮ
    if  (burger) {
        burger.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // FAQ
    document.addEventListener('click', function (e) {
        const clickedButton = e.target.closest('.question');

        if (!clickedButton) return;

        const answer = clickedButton.nextElementSibling;
        const icon = clickedButton.querySelector('svg');

        answer.classList.toggle('hidden');

        icon.classList.toggle('rotate-180');
    });


    if (window.lucide) {
        window.lucide.createIcons();
    }


    // Carousel
    if (cards.length > 0) {

        let currentIndex = 0;
        const total = cards.length;

        function updateCarousel() {
            if (counter) {
                counter.textContent = `${currentIndex + 1} / ${total}`;
            }

        const visibleIndices = [
            currentIndex,
            (currentIndex + 1) % total,
            (currentIndex + 2) % total,
        ];

        cards.forEach((card, idx) => {
            const pos = visibleIndices.indexOf(idx);
            if (pos !== -1) {
            card.style.display = 'flex';
            card.style.order = String(pos + 1);

            if (pos === 0) {

              card.classList.add('border-[#E31E24]', 'shadow-md', 'ring-2', 'ring-[#E31E24]/20', 'scale-[1.01]');
              card.classList.remove('border-slate-200/90', 'shadow-xs');
            } else {

              card.classList.remove('border-[#E31E24]', 'shadow-md', 'ring-2', 'ring-[#E31E24]/20', 'scale-[1.01]');
              card.classList.add('border-slate-200/90', 'shadow-xs');
            }
          } else {
                card.style.display = 'none';
            }
            });
        }

        if (btnPrev) {
            btnPrev.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + total) % total;
                updateCarousel();
            });
        }

        if (btnNext) {
            btnNext.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % total;
                updateCarousel();
            });
        }

        updateCarousel();
    }

    // ПЕРЕКЛЮЧЕНИЕ ГОРОДОВ
    function switchBranch(city) {
        if (city === 'stavropol') {
            btnContactsStavropol.classList.add(...contactsActiveClasses);
            btnContactsMikhailovsk.classList.remove(...contactsActiveClasses);

            blockStavropol.classList.add('active-contact');
            blockMikhailovsk.classList.remove('active-contact');

        } else if (city === 'mikhailovsk') {
              btnContactsMikhailovsk.classList.add(...contactsActiveClasses);
              btnContactsStavropol.classList.remove(...contactsActiveClasses);

              blockMikhailovsk.classList.add('active-contact');
              blockStavropol.classList.remove('active-contact');
        }
    }


    btnContactsStavropol?.addEventListener('click', () => switchBranch('stavropol'));
    btnContactsMikhailovsk?.addEventListener('click', () => switchBranch('mikhailovsk'));


    // ДЛЯ ЯНДЕКС КАРТ
    if (contactsSection) {
        const loadMapIframes = () => {
            const iframes = contactsSection.querySelectorAll('iframe.lazy-iframe');
            iframes.forEach(iframe => {
                if (iframe.dataset.src) {
                iframe.src = iframe.dataset.src;
                iframe.removeAttribute('data-src');
            }
        });
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
            loadMapIframes();
            observer.disconnect();
        }
    });
    }, { rootMargin: '300px' });

        observer.observe(contactsSection);
}

});
