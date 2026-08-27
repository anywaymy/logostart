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


    // ИНИЦИАЛИЗАЦИЯ SWIPER
    const swiperReviews = new Swiper('.swiper-reviews', {
        loop: false, // Включаем бесконечный режим
        spaceBetween: 24, // Расстояние между карточками отзыва
        speed: 400, // Скорость перелистывания по клику в мс

        // Подключаем ваши стрелочки из HTML по ID
        navigation: {
            nextEl: '#btn-review-next',
            prevEl: '#btn-review-prev',
        },

        // Подключаем кастомный счетчик цифр
        pagination: {
            el: '.swiper-pagination-custom',
            type: 'fraction', // Режим fraction автоматически генерирует строку вида "1 / 5"
        },

        // Настройка сетки для разных мониторов
        breakpoints: {
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
        }
    });

    const swiperGallery = new Swiper('.swiper-gallery', {
        loop: true,
        breakpoints: {
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
        },

        spaceBetween: 20,

        speed: 4000,

        autoplay: {
          delay: 0,
          disableOnInteraction: false,
        },
    });


    // ИНИЦИАЛИЗАЦИЯ LUCIDE
    if (window.lucide) {
        window.lucide.createIcons();
    }


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

    // ОТПРАВКА ФОРМЫ
    document.getElementById('inline-lead-form').addEventListener('submit', async function(e) {
        e.preventDefault();

        const form = this;
        const submitBtn = form.querySelector('button[type="submit"]');

        submitBtn.disabled = true;

        try {
            const formData = new FormData(form);

            const response = await fetch(form.action, {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                alert('Спасибо! Заявка успешно отправлена.');
                form.reset();
            } else {
                alert(result.message || 'Ошибка при отправке. Попробуйте позже.');
            }
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Произошла ошибка сети. Проверьте подключение.');
        } finally {
            submitBtn.disabled = false;
        }
    });

});
