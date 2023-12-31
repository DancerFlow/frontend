import React, { lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import './index.css';
import Test from './pages/challengePage/Game.jsx';
import ScoreExtraction from './pages/challengePage/Score/index';
import { theme } from './theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Rootlayout from './layouts/Rootlayout';
import { GlobalContextProvider } from './context/Context';

const queryClient = new QueryClient();

import {
    AdminPage,
    ChallengePage,
    MainPage,
    ModePage,
    MusicListPage,
    PracticePage,
    UserPage,
    ResultPage,
    PracticeResultPage
} from './pages/index';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Rootlayout />,
        children: [
            {
                path: '',
                element: <MainPage />
            },
            {
                path: '/admin',
                element: <AdminPage />
            },
            {
                path: '/challenge',
                element: <ChallengePage />,
                children: [
                    {
                        path: '/challenge/:musicId',
                        element: <Test />
                    },
                    {
                        path: '/challenge/score/:musicId',
                        element: <ScoreExtraction />
                    }
                ]
            },
            {
                path: '/mode',
                element: <ModePage />
            },
            {
                path: '/musiclist/:mode',
                element: <MusicListPage />
            },
            {
                path: '/practice/:musicId',
                element: <PracticePage />
            },
            {
                path: '/user',
                element: <UserPage />
            },
            {
                path: '/result',
                element: <ResultPage />
            },

            {
                path: '/practice/result/:musicId',
                element: <PracticeResultPage />
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <GlobalContextProvider>
                    <RouterProvider router={router} />
                    <App />
                </GlobalContextProvider>
            </ThemeProvider>
        </QueryClientProvider>
    </React.StrictMode>
);
