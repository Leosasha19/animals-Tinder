import { createRoot } from 'react-dom/client';
import App from './app/App.tsx';
import { Provider } from 'react-redux';
import { store } from './redux/store/store.ts';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
