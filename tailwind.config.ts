import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Space theme colors
        'space-dark': '#0B0D17',
        'space-blue': '#D0D6F9',
        'space-white': '#FFFFFF',
        'space-light': '#383B4B',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        'bellefair': ['Bellefair', 'serif'],
        'barlow': ['Barlow', 'sans-serif'],
        'barlow-condensed': ['Barlow Condensed', 'sans-serif'],
        sans: ['var(--font-geist-sans)', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      fontSize: {
        // Typography scale based on the designs
        'heading-1': ['9.375rem', { lineHeight: '1.1' }],     // 150px
        'heading-2': ['6.25rem', { lineHeight: '1.1' }],      // 100px
        'heading-3': ['3.5rem', { lineHeight: '1.1' }],       // 56px
        'heading-4': ['2rem', { lineHeight: '1.1' }],         // 32px
        'heading-5': ['1.75rem', { lineHeight: '1.2' }],      // 28px
        'subheading-1': ['1.75rem', { lineHeight: '1.3' }],   // 28px
        'subheading-2': ['0.875rem', { lineHeight: '1.2' }],  // 14px
        'nav-text': ['1rem', { lineHeight: '1.2' }],          // 16px
        'body-text': ['1.125rem', { lineHeight: '1.8' }],     // 18px
      },
      letterSpacing: {
        'nav': '2.7px',
        'heading': '4.75px',
        'subheading': '2.35px',
      },
      screens: {
        'mobile': '375px',
        'tablet': '768px',
        'desktop': '1440px',
      },
      backgroundImage: {
        // Background images for different sections
        'home-mobile': "url('/assets/home/background-home-mobile.jpg')",
        'home-tablet': "url('/assets/home/background-home-tablet.jpg')",
        'home-desktop': "url('/assets/home/background-home-desktop.jpg')",
        'destination-mobile': "url('/assets/destination/background-destination-mobile.jpg')",
        'destination-tablet': "url('/assets/destination/background-destination-tablet.jpg')",
        'destination-desktop': "url('/assets/destination/background-destination-desktop.jpg')",
        'crew-mobile': "url('/assets/crew/background-crew-mobile.jpg')",
        'crew-tablet': "url('/assets/crew/background-crew-tablet.jpg')",
        'crew-desktop': "url('/assets/crew/background-crew-desktop.jpg')",
        'technology-mobile': "url('/assets/technology/background-technology-mobile.jpg')",
        'technology-tablet': "url('/assets/technology/background-technology-tablet.jpg')",
        'technology-desktop': "url('/assets/technology/background-technology-desktop.jpg')",
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'scale-up': 'scaleUp 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleUp: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      }
    },
  },
  plugins: [],
} satisfies Config;