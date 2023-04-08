import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import AuthProvider from './providers/AuthProvider';
import FormsProvider from './providers/FormsProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         refetchOnWindowFocus: false,
         retry: false
      }
   }
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <React.StrictMode>
      <AuthProvider>
         <FormsProvider>
            <QueryClientProvider client={queryClient}>
               <App />
            </QueryClientProvider>
         </FormsProvider>
      </AuthProvider>
   </React.StrictMode>
);