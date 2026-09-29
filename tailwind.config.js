export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        kanit: ['Kanit', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        dark: {
          950: '#06070A',
          900: '#090A0F',
          850: '#0E1118',
          800: '#141824',
          700: '#1F2639',
        },
        cyan: {
          accent: '#00E5FF',
        }
      },
      animation: {
        'marquee-slow': 'marquee 35s linear infinite',
        'marquee-reverse': 'marquee-rev 35s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-rev': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      }
    }
  },
  plugins: []
}
