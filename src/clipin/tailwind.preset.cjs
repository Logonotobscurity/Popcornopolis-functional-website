/** Tailwind v3 preset for the CLIPIN migration layer. */
module.exports = {
  theme: {
    extend: {
      colors: {
        cream: '#FAF1EB',
        brown: '#613223',
        yellow: '#FED455',
        blue: '#84C4EC',
        red: '#E22733',
        orange: '#E7730D',
        ink: '#412015',
        soft: '#F8EBE2',
      },
      maxWidth: {
        content: '1180px',
      },
      spacing: {
        gutter: '30px',
        section: '64px',
      },
      borderRadius: {
        card: '25px',
        organic: '120px',
        pill: '9999px',
      },
      boxShadow: {
        halo: '0 0 0 10px rgba(254, 212, 85, .22)',
        haloSm: '0 0 0 5px rgba(254, 212, 85, .22)',
      },
      transitionDuration: {
        fast: '200ms',
        DEFAULT: '300ms',
        slow: '400ms',
      },
      fontFamily: {
        faro: ['Faro', 'sans-serif'],
        turbinado: ['Turbinado', 'sans-serif'],
        sofia: ['Sofia Pro', 'sans-serif'],
      },
    },
  },
};
