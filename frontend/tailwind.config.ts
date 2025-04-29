import tailwindcssAnimate from 'tailwindcss-animate'

const config = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx,mdx}',
    './node_modules/@shadcn/ui/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    'bg-hhred',
    'bg-hhred-dark',
    'text-hhred',
    'text-hhtext',
    'text-hhsecondary',
    'border-hhred',
    'border-hhtext',
    'border-hhgreen',
    'text-hhgreen',
    'bg-hhgreen',
    'bg-hhgray',
    'bg-hhgray2',
    'bg-hhbg',
    'text-white',
    'bg-white',
  ],
  theme: {
    extend: {
      colors: {
        hhred: '#D6001C',
        'hhred-dark': '#B80018',
        hhgreen: '#00B341',
        hhgray: '#f5f6f7',
        hhgray2: '#e5e6e7',
        hhbg: '#f8f9fa',
        hhtext: '#222426',
        hhsecondary: '#6a6a6a',
        border: '#e5e7eb',
        input: '#e5e7eb',
        ring: '#d1d5db',
        background: '#fff',
        foreground: '#222426',
        primary: {
          DEFAULT: '#d6001c',
          foreground: '#fff',
        },
        secondary: {
          DEFAULT: '#f5f6f7',
          foreground: '#222426',
        },
        muted: {
          DEFAULT: '#f5f6f7',
          foreground: '#6a6a6a',
        },
        accent: {
          DEFAULT: '#e5e6e7',
          foreground: '#222426',
        },
        destructive: {
          DEFAULT: '#d6001c',
          foreground: '#fff',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Arial', 'Helvetica Neue', 'Helvetica', 'sans-serif'],
      },
      borderRadius: {
        lg: '0.5rem',
        md: '0.375rem',
        sm: '0.25rem',
      },
      boxShadow: {
        card: '0 2px 8px 0 rgba(34,36,38,0.08)',
      },
    },
  },
  plugins: [tailwindcssAnimate],
}

export default config
