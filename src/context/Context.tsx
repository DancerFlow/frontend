import React, { createContext, useReducer, useEffect } from 'react';
import { useGetUserVerifyQuery } from '../api/useGetUserVerifyQuery';
import { Status, UserVerify } from '../interface';
import { AxiosError } from 'axios';

interface UserState {
    login: boolean;
    admin: boolean;
}
interface BgmState {
    bgm: boolean;
}
interface State {
    userState: UserState;
    bgmState: BgmState;
}
type Action = { type: 'LOGIN_SUCCESS'; payload: UserState } | { type: 'LOGOUT' } | { type: 'BGM_CONTROL'; payload: BgmState };

const initialState: State = {
    userState: { login: false, admin: false },
    bgmState: { bgm: false }
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

        case 'BGM_CONTROL':
            return {
                ...state,
                bgmState: action.payload
            };
        default:
            return state;
    }
};

interface ContextType {
    logIn?: (userState: UserState) => void;
    logOut?: () => void;
    verifyUser?: () => void;
    bgmControl?: (bgmState: BgmState) => void;
    state: State;
}

export const GlobalContext = createContext<ContextType | State>(initialState);

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

    const bgmControl = (bgmState: BgmState) => {
        dispatch({
            type: 'BGM_CONTROL',
            payload: bgmState
        });
    };

    return (
        <GlobalContext.Provider
            value={{
                logIn,
                logOut,
                verifyUser,
                bgmControl,
                state
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
