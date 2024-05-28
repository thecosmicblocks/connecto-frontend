"use client"
import {
    createContext,
    useContext,
    useReducer
} from 'react';

export type ToastProps = {
    id: string;
    message: string;
    type: string;
}

type ToastContextType = {
    toasts: ToastProps[];
}
const context: ToastContextType = {toasts: []}
const ToastStateContext = createContext(context);
const ToastDispatchContext = createContext({} as any);

function ToastReducer(state: any, action: { type: any; toast: ToastProps; id: any; }) {
    switch (action.type) {
        case 'ADD_TOAST': {
            return {
                ...state,
                toasts: [ ...state.toasts, action.toast ],
            };
        }
        case 'DELETE_TOAST': {
            const updatedToasts = state.toasts.filter((e: { id: any; }) => e.id != action.id);
            return {
                ...state,
                toasts: updatedToasts,
            };
        }
        default: {
            throw new Error('unhandled action');
        }
    }
}

type ToastProviderProps = {
    children: React.ReactNode;
}

export function ToastProvider({children}: ToastProviderProps) {
    const [ state, dispatch ] = useReducer(ToastReducer, {
        toasts: [],
    })

    return (
        <ToastStateContext.Provider value={state}>
            <ToastDispatchContext.Provider value={dispatch as unknown as null}>
                {children}
            </ToastDispatchContext.Provider>
        </ToastStateContext.Provider>
    );
}

export const useToastStateContext = () => useContext(ToastStateContext);
export const useToastDispatchContext = () => useContext(ToastDispatchContext);