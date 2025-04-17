import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  preflight: true,
  include: ['./src/**/*.{js,jsx,ts,tsx}'],
  exclude: [],
  theme: {
    extend: {
      tokens: {
        colors: {
          primary: { value: '#0d6efd' },
          secondary: { value: '#6c757d' },
          success: { value: '#198754' },
          danger: { value: '#dc3545' },
          warning: { value: '#ffc107' },
          info: { value: '#0dcaf0' },
          light: { value: '#f8f9fa' },
          dark: { value: '#212529' },
          gray: {
            50: { value: '#f8f9fa' },
            100: { value: '#e9ecef' },
            200: { value: '#dee2e6' },
            300: { value: '#ced4da' },
            400: { value: '#adb5bd' },
            500: { value: '#6c757d' },
            600: { value: '#495057' },
            700: { value: '#343a40' },
            800: { value: '#212529' },
            900: { value: '#1a1a1a' }
          }
        },
        spacing: {
          '1': { value: '0.25rem' },
          '2': { value: '0.5rem' },
          '3': { value: '1rem' },
          '4': { value: '1.5rem' },
          '5': { value: '3rem' }
        },
        fontSizes: {
          '1': { value: '0.875rem' },
          '2': { value: '1rem' },
          '3': { value: '1.25rem' },
          '4': { value: '1.5rem' },
          '5': { value: '2rem' }
        }
      },
      semanticTokens: {
        colors: {
          primary: {
            value: '#0d6efd',
            hover: { value: '#0d6efd99' }
          }
        }
      }
    }
  },
  outdir: 'styled-system',
  jsxFramework: 'react'
}); 