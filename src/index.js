import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { App } from './components/App';
import { CurrentUserProvider } from './contexts/user';
import { TooltipProvider } from './contexts/tooltip';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <CurrentUserProvider>
      <TooltipProvider>
        <App />
      </TooltipProvider>
    </CurrentUserProvider>
  </BrowserRouter>
);
