import { css } from '../styled-system/css';

export const globalStyles = css({
  ':root': {
    colorScheme: 'light',
  },
  'html, body': {
    margin: 0,
    padding: 0,
    height: '100%',
    backgroundColor: 'gray.50'
  },
  '*': {
    boxSizing: 'border-box'
  }
}); 