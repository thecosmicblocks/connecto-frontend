import { useToastDispatchContext } from "@app/context/ToastContext";

export const useToast = (delay = 4000) => {
    const dispatch = useToastDispatchContext();

    function toast(type: any, message: any) {
        const id = Math.random().toString(36).substr(2, 9);
        dispatch({
            type: "ADD_TOAST",
            toast: {
                type,
                message,
                id,
            },
        });

        setTimeout(() => {
            dispatch({type: "DELETE_TOAST", id});
        }, delay);
    }

    return toast;
}