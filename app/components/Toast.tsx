"use client"
import React       from 'react'
import { Toast }   from 'flowbite-react'
import {
    HiCheck,
    HiExclamation
}                  from 'react-icons/hi'
import { twMerge } from 'tailwind-merge'
import {
    ToastProps,
    useToastDispatchContext,
    useToastStateContext
}                  from "@app/context/ToastContext";

const messageType = new Map()
messageType.set('error', ' text-red-500 dark:text-red')
messageType.set('success', 'text-green-500 dark:text-green-200')
export type GToastProps = {
    toast: ToastProps
    id?: string
}
export const GToast = ({toast}: GToastProps) => {
    const dispatch = useToastDispatchContext();


    const handleClose = () => {
        dispatch({type: 'DELETE_TOAST', id: toast.id})
    }
    return (
        <Toast className={
            twMerge('fixed right-10 top-20 ', `z-50`)}>
            <div
                className={twMerge(
                    'inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-white',
                    messageType.get(toast.type),
                )}>
                {toast.type === 'error' ? <HiExclamation className="h-5 w-5 bg-white"/> : <HiCheck className="h-5 w-5"/>}
            </div>
            <span
                className={twMerge(
                    'ml-3 text-xl font-normal',
                    messageType.get(toast.type),
                )
                }>
                {toast.message}
            </span>
            < Toast.Toggle onDismiss={handleClose}/>
        </Toast>
    )
}

export const ToastContainer = () => {
    const {toasts} = useToastStateContext();

    return (
        <div className="absolute bottom-10 z-50 w-full">
            <div className="mx-auto max-w-xl">
                {toasts &&
                    toasts.map((toast) => (
                        <GToast
                            toast={toast}
                            id={toast.id}
                            key={toast.id}
                        />
                    ))}
            </div>
        </div>
    )
}