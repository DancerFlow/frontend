import React, { createContext, useReducer, useContext } from 'react';

interface BgmState {
    bgm: boolean;
}
interface State {
    bgmState: BgmState;
}

interface ContextType {
    bgmControl: (bgmState: BgmState) => void;
    state: State;
}

type Action = { type: 'BGM_CONTROL'; payload: BgmState };

const reducerInitialState: State = {
    bgmState: { bgm: false }
};

const initialState: ContextType = {
    bgmControl: () => {},
    state: reducerInitialState
};

const Reducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'BGM_CONTROL':
            return {
                ...state,
                bgmState: action.payload
            };
        default:
            return state;
    }
};

export const BgmContext = createContext<ContextType>(initialState);

export const BgmContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(Reducer, reducerInitialState);

    const bgmControl = (bgmState: BgmState) => {
        sessionStorage.setItem('noShowPopup', 'true');
        dispatch({
            type: 'BGM_CONTROL',
            payload: bgmState
        });
    };

    return (
        <BgmContext.Provider
            value={{
                bgmControl,
                state
            }}
        >
            {children}
        </BgmContext.Provider>
    );
};

export const useBgmContext = () => useContext(BgmContext);
