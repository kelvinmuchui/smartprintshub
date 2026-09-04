import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import SeoHead from './components/SeoHead.tsx';
import PrintingWestlandsPage from './components/PrintingWestlandsPage.tsx';
import './index.css';

const isPrintingWestlandsPage = window.location.pathname.replace(/\/+$/, '') === '/printing-in-westlands';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isPrintingWestlandsPage ? (
      <>
        <SeoHead isLocalLandingPage />
        <PrintingWestlandsPage />
      </>
    ) : (
      <>
        <SeoHead />
        <App />
      </>
    )}
  </StrictMode>,
);
