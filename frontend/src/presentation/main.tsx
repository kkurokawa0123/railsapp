import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { MessageProvider } from '@/presentation/providers/MessageProvider';
import { LoadingProvider } from '@/presentation/providers/LoadingProvider';
import './index.css';
import App from './App';

const root = createRoot(document.getElementById('root') as Element);

root.render(
  <BrowserRouter>
    <LoadingProvider>
      <MessageProvider>
        <App />
      </MessageProvider>
    </LoadingProvider>
  </BrowserRouter>,
);
