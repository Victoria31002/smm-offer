import Swiper from 'swiper';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import GLightbox from 'glightbox';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'glightbox/dist/css/glightbox.min.css';

const videoGallery = () => {
    const root = document.querySelector('[data-video-swiper]');

    if (!root) {
        return;
    }

    const lightbox = GLightbox({
        selector: '[data-video-gallery]',
        touchNavigation: true,
        loop: true,
        autoplayVideos: true,
        plyr: {
            config: {
                ratio: '9:16',
                muted: false,
                hideControls: false,
            },
        },
    });

    const syncHash = (isOpen) => {
        if (isOpen) {
            if (window.location.hash !== '#lightbox') {
                window.history.pushState(null, '', '#lightbox');
            }
            return;
        }

        if (window.location.hash === '#lightbox') {
            window.history.replaceState(null, '', window.location.pathname + window.location.search);
        }
    };

    lightbox.on('open', () => syncHash(true));
    lightbox.on('close', () => syncHash(false));

    window.addEventListener('hashchange', () => {
        if (window.location.hash !== '#lightbox' && lightbox.lightboxOpen) {
            lightbox.close();
        }
    });

    const gallerySwiper = new Swiper(root, {
        modules: [Navigation, Pagination, A11y],
        slidesPerView: 1.15,
        spaceBetween: 16,
        centeredSlides: false,
        grabCursor: true,
        loop: false,
        watchOverflow: true,
        navigation: {
            nextEl: root.querySelector('.swiper-button-next'),
            prevEl: root.querySelector('.swiper-button-prev'),
        },
        pagination: {
            el: root.querySelector('.swiper-pagination'),
            clickable: true,
        },
        breakpoints: {
            640: {
                slidesPerView: 2.1,
                spaceBetween: 18,
            },
            1024: {
                slidesPerView: 3.2,
                spaceBetween: 22,
            },
        },
        a11y: {
            prevSlideMessage: 'Предыдущее видео',
            nextSlideMessage: 'Следующее видео',
        },
    });

    return gallerySwiper;
};

export default videoGallery;
