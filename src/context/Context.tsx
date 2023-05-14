import React, { createContext, useReducer, useEffect } from 'react';
import { useGetUserVerifyQuery } from '../api/useGetUserVerifyQuery';
import { Status, UserVerify } from '../interface';
import { AxiosError } from 'axios';

interface UserState {
    login: boolean;
    admin: boolean;
}
interface State {
    userState: UserState;
}
type Action = { type: 'LOGIN_SUCCESS'; payload: UserState } | { type: 'LOGOUT' };

const initialState: State = {
    userState: { login: false, admin: false }
};

const Reducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            console.log('%c로그인!', 'color: #d93d1a;');
            return {
                ...state,
                userState: action.payload
            };

        case 'LOGOUT':
            console.log('%c로그아웃!', 'color: #d93d1a;');
            return {
                ...state,
                userState: { login: false, admin: false }
            };

        default:
            return state;
    }
};

export const GlobalContext = createContext(initialState);

export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    const { data, refetch } = useGetUserVerifyQuery({
        onSuccess: (data: UserVerify) => {
            console.log(data);

            logIn({ login: data.isLoggedIn, admin: data.isAdmin });
        },
        onError: (error: AxiosError<Status>) => {
            if (error.response?.data.message === 'COOKIE NOT FOUND') {
                console.log('로그인이 만료되었습니다.');
                logOut();
            }
        },
        retry: false
    });

    const logIn = (userState: UserState) => {
        dispatch({
            type: 'LOGIN_SUCCESS',
            payload: userState
        });
    };

    const logOut = () => {
        dispatch({
            type: 'LOGOUT'
        });
    };

    const verifyUser = async () => {
        refetch();
    };

    return (
        <GlobalContext.Provider
            value={{
                logIn,
                logOut,
                verifyUser,
                state
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
