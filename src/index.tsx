import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './components/app/app';
import { AuthProvider } from './components/auth-context';

import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

