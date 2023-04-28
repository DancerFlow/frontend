import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { AdminPage, ChallengePage, MainPage, ModePage, MusicListPage, PracticePage, UserPage } from './pages/index.tsx';
import { theme } from './theme.ts';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainPage />
    },
    {
        path: '/admin',
        element: <AdminPage />
    },
    {
        path: '/challenge',
        element: <ChallengePage />
    },
    {
        path: '/mode',
        element: <ModePage />
    },
    {
        path: '/musiclist',
        element: <MusicListPage />
    },
    {
        path: '/practice',
        element: <PracticePage />
    },
    {
        path: '/user',
        element: <UserPage />
    }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
            <App />
        </ThemeProvider>
    </React.StrictMode>
);
