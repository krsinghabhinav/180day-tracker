/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        bg: {
          primary: '#070B14',
          secondary: '#0D1120',
          card: '#111827',
          hover: '#1A2236',
        },
        brand: {
          blue: '#4F8EF7',
          indigo: '#6366F1',
          purple: '#8B5CF6',
          cyan: '#22D3EE',
          green: '#10B981',
          orange: '#F59E0B',
          red: '#F87171',
        },
        text: {
          primary: '#F1F5F9',
          secondary: '#94A3B8',
          muted: '#475569',
        },
        border: {
          subtle: 'rgba(255,255,255,0.06)',
          glow: 'rgba(79,142,247,0.3)',
        }
      },
      backgroundImage: {
        'glow-blue': 'radial-gradient(ellipse at center, rgba(79,142,247,0.15) 0%, transparent 70%)',
        'glow-purple': 'radial-gradient(ellipse at center, rgba(139,92,246,0.15) 0%, transparent 70%)',
        'hero-gradient': 'linear-gradient(135deg, #070B14 0%, #111827 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
        'brand-gradient': 'linear-gradient(135deg, #4F8EF7, #8B5CF6)',
        'success-gradient': 'linear-gradient(135deg, #10B981, #22D3EE)',
        'fire-gradient': 'linear-gradient(135deg, #F59E0B, #EF4444)',
      },
      boxShadow: {
        'glow-blue': '0 0 40px rgba(79,142,247,0.2)',
        'glow-purple': '0 0 40px rgba(139,92,246,0.2)',
        'glow-green': '0 0 40px rgba(16,185,129,0.2)',
        'card': '0 4px 24px rgba(0,0,0,0.4)',
        'card-hover': '0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(79,142,247,0.2)',
        'button': '0 4px 16px rgba(79,142,247,0.4)',
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'slide-up': 'slideUp 0.4s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'bounce-subtle': 'bounceSubtle 1s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(79,142,247,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(79,142,247,0.6)' },
        },
        slideUp: {
          from: { opacity: 0, transform: 'translateY(20px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(-2px)' },
          '50%': { transform: 'translateY(2px)' },
        }
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [],
};
