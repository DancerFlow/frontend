import React, { createContext, useReducer, useEffect } from 'react';

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

    useEffect(() => {
        if (localStorage.getItem('currentUser')) {
            const currentUser = JSON.parse(localStorage.getItem('currentUser') || '');
            logIn({ login: true, admin: currentUser.admin });
        } else {
            logOut();
        }
    }, []);

    const logIn = (userState: UserState) => {
        localStorage.setItem('currentUser', JSON.stringify(userState));
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
