document.addEventListener('DOMContentLoaded', () => {

    // ДЛЯ ОТЗЫВОВ
    const cards = document.querySelectorAll('#reviews-grid .review-card');
    const counter = document.getElementById('review-counter');
    const btnPrev = document.getElementById('btn-review-prev');
    const btnNext = document.getElementById('btn-review-next');

    // ДЛЯ ПЕРЕКЛЮЧЕНИЯ МЕЖДУ ГОРОДАМИ
    const btnHeaderStavropol = document.getElementById('btn-branch-stavropol');
    const btnHeaderMikhailovsk = document.getElementById('btn-branch-mikhailovsk');

    const btnContactsStavropol = document.getElementById('btn-contacts-stavropol');
    const btnContactsMikhailovsk = document.getElementById('btn-contacts-mikhailovsk');

    const blockStavropol = document.getElementById('contacts-stavropol');
    const blockMikhailovsk = document.getElementById('contacts-mikhailovsh');

    const heroCityName = document.getElementById('hero-city-name');
    const heroSubtitle = document.querySelector('h1 + p');

    const headerActiveClasses = ['bg-white', 'text-rose-600', 'shadow-2xs'];
    const headerInactiveClasses = ['text-slate-600', 'hover:text-slate-900'];

    const contactsActiveClasses = ['active-btn', 'bg-white', 'text-rose-600', 'shadow-sm'];

    // ДЛЯ МОБИЛЬНОГО МЕНЮ
    const burger = document.getElementById('btn-toggle-mobile-menu');
    const mobileMenu = document.getElementById('mobile-menu');


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
            btnHeaderStavropol.classList.add(...headerActiveClasses);
            btnHeaderStavropol.classList.remove(...headerInactiveClasses);
            btnHeaderMikhailovsk.classList.remove(...headerActiveClasses);
            btnHeaderMikhailovsk.classList.add(...headerInactiveClasses);

            btnContactsStavropol.classList.add(...contactsActiveClasses);
            btnContactsMikhailovsk.classList.remove(...contactsActiveClasses);

            blockStavropol.classList.add('active-contact');
            blockMikhailovsk.classList.remove('active-contact');

            if (heroCityName) heroCityName.textContent = 'В СТАВРОПОЛЕ';
            if (heroSubtitle) {
                heroSubtitle.textContent = 'ЗАНЯТИЯ С ЛОГОПЕДОМ В СТАВРОПОЛЕ, ОНЛАЙН ЗАНЯТИЯ ИЗ ЛЮБОЙ ТОЧКИ МИРА';
            }

        } else if (city === 'mikhailovsk') {
              btnHeaderMikhailovsk.classList.add(...headerActiveClasses);
              btnHeaderMikhailovsk.classList.remove(...headerInactiveClasses);
              btnHeaderStavropol.classList.remove(...headerActiveClasses);
              btnHeaderStavropol.classList.add(...headerInactiveClasses);

              btnContactsMikhailovsk.classList.add(...contactsActiveClasses);
              btnContactsStavropol.classList.remove(...contactsActiveClasses);

              blockMikhailovsk.classList.add('active-contact');
              blockStavropol.classList.remove('active-contact');

              if (heroCityName) heroCityName.textContent = 'В МИХАЙЛОВСКЕ';
              if (heroSubtitle) {
                    heroSubtitle.textContent = 'ЗАНЯТИЯ С ЛОГОПЕДОМ В МИХАЙЛОВСКЕ, ОНЛАЙН ЗАНЯТИЯ ИЗ ЛЮБОЙ ТОЧКИ МИРА';
              }
        }
    }


    btnHeaderStavropol?.addEventListener('click', () => switchBranch('stavropol'));
    btnContactsStavropol?.addEventListener('click', () => switchBranch('stavropol'));

    btnHeaderMikhailovsk?.addEventListener('click', () => switchBranch('mikhailovsk'));
    btnContactsMikhailovsk?.addEventListener('click', () => switchBranch('mikhailovsk'));

});
