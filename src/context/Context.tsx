import React, { createContext, useReducer, useEffect } from 'react';

interface UserState {
    login: boolean;
    admin: boolean;
    token?: string;
}
interface State {
    userState: UserState;
}
type Action = { type: 'LOGIN_SUCCESS'; payload: UserState } | { type: 'LOGOUT' };

const initialState: State = {
    userState: { login: false, admin: false, token: '' }
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
                userState: { login: false, admin: false, token: '' }
            };

        default:
            return state;
    }
};

export const GlobalContext = createContext(initialState);

export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(Reducer, initialState);

    useEffect(() => {
        console.log('context call');
        if (localStorage.getItem('currentUser')) {
            const currentUser = JSON.parse(localStorage.getItem('currentUser') || '');
            logIn({ login: true, admin: currentUser.admin, token: currentUser.token });
        } else {
            logOut();
        }
    }, []);

    const logIn = (state: UserState) => {
        localStorage.setItem('currentUser', JSON.stringify(state));
        dispatch({
            type: 'LOGIN_SUCCESS',
            payload: state
        });
    };

    const logOut = () => {
        dispatch({
            type: 'LOGOUT'
        });
    };

    return (
        <GlobalContext.Provider
            value={{
                logIn,
                logOut,
                state
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
