import { IoMdClose } from "react-icons/io";
import { GrInfo } from "react-icons/gr";
import type { ReactNode } from "react";

type ToasterProps = {
  children: ReactNode;
  close: (id: number) => void;
  id: number;
  icon?: ReactNode;
  type?: "danger" | "success" | "info";
};

export default function Toaster({
  children,
  close,
  id,
  icon,
  type,
}: ToasterProps) {
  const divColor = () => {
    switch (type) {
      case "danger":
        return "bg-red-100";
      case "success":
        return "bg-green-100";
      case "info":
        return "bg-blue-100";
      default:
        return "bg-gray-100";
    }
  };

  const iconColor = () => {
    switch (type) {
      case "danger":
        return "text-red-500";
      case "success":
        return "text-green-500";
      case "info":
        return "text-blue-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div
      id={String(id)}
      className={`flex items-center w-full max-w-xs p-4 text-gray-600 rounded-lg shadow-lg ${divColor()}`}
    >
      <div
        className={`inline-flex items-center justify-center flex-shrink-0 w-4 h-4 ${iconColor()} ${divColor()}`}
      >
        {icon ?? <GrInfo />}
      </div>

      <div className="px-2 text-sm font-normal">{children}</div>

      <button
        onClick={() => close(id)}
        type="button"
        className="ms-auto -mx-1.5 -my-1.5 text-gray-400 hover:text-gray-900 p-1.5 inline-flex items-center justify-center h-8 w-8"
      >
        <IoMdClose className="w-6 h-6" />
      </button>
    </div>
  );
}
