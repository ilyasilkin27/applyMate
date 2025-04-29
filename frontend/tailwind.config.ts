import type { Config } from 'tailwindcss'
import tailwindcssAnimate from 'tailwindcss-animate'

const config: Config = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx,mdx}',
    './node_modules/@shadcn/ui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        hhred: '#D6001C',
        'hhred-dark': '#B80018',
        hhgray: '#f5f6f7',
        hhgray2: '#e5e6e7',
        hhtext: '#222426',
        hhsecondary: '#6a6a6a',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
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
