const revealOnScroll = () => {
    const items = document.querySelectorAll('[data-reveal]');

    if (!items.length || !('IntersectionObserver' in window)) {
        items.forEach((item) => item.classList.add('opacity-100', 'translate-y-0'));
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    items.forEach((item) => {
        item.classList.add('opacity-0', 'translate-y-6', 'transition-all', 'duration-700');
        observer.observe(item);
    });
};

export default revealOnScroll;
