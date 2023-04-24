import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { AdminPage, ChallengePage, MainPage, ModePage, MusicListPage, PracticePage, UserPage } from './pages/index.tsx';

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
        <RouterProvider router={router} />
        <App />
    </React.StrictMode>
);
