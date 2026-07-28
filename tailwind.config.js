/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './index.html',
        './src/**/*.{js,html}',
    ],
    theme: {
        extend: {
            colors: {
                accent: {
                    DEFAULT: '#2EE6C5',
                    light: '#7AFFE0',
                    dark: '#14B8A6',
                },
                coral: {
                    DEFAULT: '#FF7A59',
                    soft: '#FF9B82',
                    deep: '#E85A3A',
                },
                brand: {
                    ink: '#070B14',
                    surface: '#0E1524',
                    panel: '#141C2E',
                    sky: '#5BB8FF',
                },
            },
            fontFamily: {
                sans: ['Outfit', 'system-ui', '-apple-system', 'sans-serif'],
            },
            backgroundImage: {
                'hero-gradient': 'linear-gradient(135deg, #14B8A6 0%, #2EE6C5 40%, #5BB8FF 70%, #FF7A59 100%)',
                'hero-gradient-soft': 'linear-gradient(135deg, rgba(46,230,197,0.22) 0%, rgba(91,184,255,0.12) 50%, rgba(255,122,89,0.18) 100%)',
                'card-gradient': 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(46,230,197,0.08) 45%, rgba(255,122,89,0.06) 100%)',
                'page-base': 'linear-gradient(180deg, #070B14 0%, #0E1524 45%, #121A2C 100%)',
                'mesh-violet': 'radial-gradient(at 12% 18%, rgba(46,230,197,0.22) 0, transparent 42%), radial-gradient(at 88% 10%, rgba(91,184,255,0.16) 0, transparent 40%), radial-gradient(at 72% 88%, rgba(255,122,89,0.14) 0, transparent 44%)',
                'mesh-warm': 'radial-gradient(at 10% 78%, rgba(255,122,89,0.18) 0, transparent 46%), radial-gradient(at 90% 22%, rgba(46,230,197,0.14) 0, transparent 40%), radial-gradient(at 48% 0%, rgba(91,184,255,0.12) 0, transparent 42%)',
                'mesh-soft': 'radial-gradient(at 0% 45%, rgba(46,230,197,0.14) 0, transparent 48%), radial-gradient(at 100% 55%, rgba(255,122,89,0.1) 0, transparent 48%)',
                'section-glow': 'linear-gradient(135deg, rgba(14,21,36,0.98) 0%, rgba(20,28,46,0.96) 48%, rgba(11,16,28,0.98) 100%)',
            },
            boxShadow: {
                glow: '0 0 36px -10px rgba(46, 230, 197, 0.45), 0 0 20px -14px rgba(255, 122, 89, 0.3)',
                'glow-lg': '0 24px 60px -16px rgba(7, 11, 20, 0.85), 0 0 32px -12px rgba(46, 230, 197, 0.35)',
                card: '0 14px 36px -18px rgba(0, 0, 0, 0.65), 0 2px 10px -2px rgba(255, 255, 255, 0.04)',
            },
            animation: {
                'blob-float': 'blob-float 9s ease-in-out infinite',
                'blob-float-delayed': 'blob-float 11s ease-in-out 2s infinite',
                'gradient-shift': 'gradient-shift 6s ease infinite',
            },
            keyframes: {
                'blob-float': {
                    '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
                    '33%': { transform: 'translate(24px, -18px) scale(1.06)' },
                    '66%': { transform: 'translate(-16px, 12px) scale(0.96)' },
                },
                'gradient-shift': {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
            },
        },
    },
    plugins: [],
};
