import { useState } from "react";
import type { ReactNode } from "react";
import Toaster from "./Toaster";
import ToastContext from "./ToastService";

type Toast = {
    id: number;
    component: ReactNode;
    icon?: ReactNode;
    type?: string;
};

type ToastProviderProps = {
    children: ReactNode;
};

export default function ToastProvider({ children }: ToastProviderProps) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const open = (
        component: ReactNode,
        icon?: ReactNode,
        type?: string,
        timeout = 3000
    ) => {
        const id = Date.now();
        setToasts((toasts) => [...toasts, { id, component, icon, type }]);
        setTimeout(() => close(id), timeout);
        return id;
    };

    const close = (id: number) => {
        setToasts((toasts) => toasts.filter((toast) => toast.id !== id));
    };

    return (
        <ToastContext.Provider value={{ open, close }}>
            {children}

            <div className="fixed space-y-2 bottom-4 right-4 z-100">
                {toasts.map(({ id, component, icon, type }) => (
                    <Toaster key={id} close={close} id={id} icon={icon} type={type as "danger" | "success" | "info"}>
                        {component}
                    </Toaster>
                ))}
            </div>
        </ToastContext.Provider>
    );
}
