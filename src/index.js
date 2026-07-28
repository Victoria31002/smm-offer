import '../index.html';
import './styles/input.css';

import navbar from './components/navbar';
import modalHash from './components/modalHash';
import revealOnScroll from './components/revealOnScroll';
import contactForm from './components/contactForm';
import languageSwitcher from './components/languageSwitcher';
import videoGallery from './components/videoGallery';

document.addEventListener('DOMContentLoaded', () => {
    languageSwitcher();
    navbar();
    modalHash();
    revealOnScroll();
    contactForm();
    videoGallery();
});
