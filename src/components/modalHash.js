const modalHash = () => {
    const modals = document.querySelectorAll('[data-modal]');

    if (!modals.length) {
        return;
    }

    const getOpenModal = () => document.querySelector('[data-modal].is-open');

    const openModal = (modal) => {
        modal.classList.add('is-open');
        modal.removeAttribute('hidden');
        modal.removeAttribute('inert');
        modal.setAttribute('aria-modal', 'true');
        document.body.classList.add('overflow-hidden');
        window.location.hash = modal.id;

        const focusable = modal.querySelector('input, textarea, button');
        if (focusable) {
            focusable.focus();
        }
    };

    const closeModal = (modal) => {
        modal.classList.remove('is-open');
        modal.setAttribute('hidden', '');
        modal.setAttribute('inert', '');
        modal.removeAttribute('aria-modal');
        document.body.classList.remove('overflow-hidden');

        if (window.location.hash === '#' + modal.id) {
            history.replaceState(null, null, ' ');
        }
    };

    modals.forEach((modal) => {
        const openers = document.querySelectorAll(`[data-modal-open="${modal.id}"]`);
        const closers = modal.querySelectorAll('[data-modal-close]');

        openers.forEach((opener) => {
            opener.addEventListener('click', (event) => {
                event.preventDefault();
                openModal(modal);
            });
        });

        closers.forEach((closer) => {
            closer.addEventListener('click', () => closeModal(modal));
        });

        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal(modal);
            }
        });
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            const openModalEl = getOpenModal();
            if (openModalEl) {
                closeModal(openModalEl);
            }
        }
    });

    addEventListener('hashchange', () => {
        const openModalEl = getOpenModal();
        if (openModalEl && window.location.hash !== '#' + openModalEl.id) {
            closeModal(openModalEl);
        }
    });

    if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target && target.matches('[data-modal]')) {
            openModal(target);
        }
    }
};

export default modalHash;
