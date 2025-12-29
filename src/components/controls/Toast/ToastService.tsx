import { createContext, useContext } from "react";

const ToastContext = createContext<any>(null);

export const useToast = () => useContext(ToastContext);

export default ToastContext;
