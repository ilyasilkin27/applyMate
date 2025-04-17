import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { globalStyles } from './styles';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <div className={globalStyles}>
      <App />
    </div>
  </React.StrictMode>
);
