// Prevent runtime crash in restricted environments where window.fetch has only a getter
try {
  const originalFetch = window.fetch;
  if (originalFetch) {
    let currentFetch = originalFetch;
    Object.defineProperty(window, 'fetch', {
      configurable: true,
      enumerable: true,
      get() {
        return currentFetch;
      },
      set(val) {
        currentFetch = val;
      }
    });

    if (typeof globalThis !== 'undefined') {
      try {
        Object.defineProperty(globalThis, 'fetch', {
          configurable: true,
          enumerable: true,
          get() {
            return currentFetch;
          },
          set(val) {
            currentFetch = val;
          }
        });
      } catch (e) {}
    }
  }
} catch (e) {
  console.warn('[Fetch Patch TS] Failed to redefine fetch:', e);
}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
