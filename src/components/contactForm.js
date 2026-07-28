const contactForm = () => {
    const forms = document.querySelectorAll('[data-contact-form]');

    if (!forms.length) {
        return;
    }

    const apiEndpoints = () => {
        const endpoints = ['/api/contact'];

        const isLocalhost = window.location.hostname === 'localhost'
            || window.location.hostname === '127.0.0.1';

        if (isLocalhost && window.location.port !== '3001') {
            endpoints.push('http://localhost:3001/api/contact');
        }

        return endpoints;
    };

    const sendContact = async (payload) => {
        let lastError = null;

        for (const url of apiEndpoints()) {
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });

                if (response.ok) {
                    return response;
                }

                lastError = new Error(`Request failed: ${response.status}`);
            } catch (error) {
                lastError = error;
            }
        }

        throw lastError || new Error('Request failed');
    };

    const showStatus = (status, message, isError = false) => {
        if (!status) {
            return;
        }

        status.textContent = message;
        status.classList.remove(
            'hidden',
            'bg-accent/15',
            'text-accent',
            'bg-coral/15',
            'text-coral-soft'
        );
        status.classList.add(
            isError ? 'bg-coral/15' : 'bg-accent/15',
            isError ? 'text-coral-soft' : 'text-accent'
        );
    };

    forms.forEach((form) => {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const submitButton = form.querySelector('[type="submit"]');
            const status = form.querySelector('[data-form-status]');
            const formData = new FormData(form);
            const source = form.closest('[id]')?.id
                || form.closest('section')?.id
                || 'contact';

            if (submitButton) {
                submitButton.disabled = true;
            }

            if (status) {
                status.classList.add('hidden');
            }

            try {
                await sendContact({
                    name: formData.get('name'),
                    tel: formData.get('tel'),
                    message: formData.get('message') || '',
                    source,
                });

                showStatus(status, 'Спасибо! Заявка отправлена — свяжусь с вами в ближайшее время.');
                form.reset();
            } catch {
                const isLocalhost = window.location.hostname === 'localhost'
                    || window.location.hostname === '127.0.0.1';

                showStatus(
                    status,
                    isLocalhost
                        ? 'Не удалось отправить заявку. Запустите npm start и откройте сайт по адресу http://localhost:8081'
                        : 'Не удалось отправить заявку. Попробуйте позже или напишите в Telegram.',
                    true
                );
            } finally {
                if (submitButton) {
                    submitButton.disabled = false;
                }
            }
        });
    });
};

export default contactForm;
