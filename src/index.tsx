import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './Components/app/App';
import { AuthProvider } from '../src/Components/AuthContext';

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

