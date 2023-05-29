import { ThemeCustomProvider } from '@providers/theme.providers';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import './styles/global.scss';

const Main: React.FC = () => {
  return (
    <ThemeCustomProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeCustomProvider>
  );
};

const container = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);

root.render(<Main />);
