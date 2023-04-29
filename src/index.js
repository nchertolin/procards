import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import FormsProvider from './providers/FormsProvider';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ToastContainer} from 'react-toastify';


const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false
        }
    }
});

root.render(
    <FormsProvider>
        <QueryClientProvider client={queryClient}>
            <App/>
            <ToastContainer closeOnClick pauseOnHover theme='colored'/>
        </QueryClientProvider>
    </FormsProvider>
);