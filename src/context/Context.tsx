import React, { createContext, useReducer, useEffect } from 'react';

const initialState = {
    userState: { login: false, admin: false, userId: '' },

    userLoading: true
};

const Reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            console.log('%c로그인!', 'color: #d93d1a;');
            return {
                ...state,
                userState: action.payload,
                userLoading: false
            };
        case 'LOGIN_FAILURE':
            return {
                ...state,
                userLoading: false
            };

        case 'LOGOUT':
            console.log('%c로그아웃!', 'color: #d93d1a;');
            return {
                ...state,
                userState: { login: false, admin: false, userId: '' }
            };
 
        default:
            return state;
    }
};

export const GlobalContext = createContext(initialState);

export const GlobalContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, initialState);

    useEffect(() => {
        localStorage.setItem('cartData', JSON.stringify(state.cart));
    }, [state.cart]);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            logOut();
        } else {
            getVerify({ token: token });
        }
    }, []);

    const logIn = (data) => {
        dispatch({
            type: 'LOGIN_SUCCESS',
            payload: data
        });
    };

    const logOut = () => {
        dispatch({
            type: 'LOGOUT'
        });
    };


    };
    return (
        <GlobalContext.Provider
            value={{
                logIn,
                logOut,
                userState: state.userState,
                cart: state.cart,
                userLoading: state.userLoading,
                addToCart,
                updateCart,
                increaseQuantity,
                decreaseQuantity,
                removeItem,
                removeAllItem
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
