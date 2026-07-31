const revealOnScroll = () => {
    const items = document.querySelectorAll('[data-reveal]');

    if (!items.length) {
        return;
    }

    document.documentElement.classList.add('js-reveal');

    const reveal = (item) => {
        item.classList.add('is-revealed');
    };

    if (!('IntersectionObserver' in window)) {
        items.forEach(reveal);
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    reveal(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12, rootMargin: '0px 0px -24px 0px' }
    );

    items.forEach((item) => observer.observe(item));
};

export default revealOnScroll;
