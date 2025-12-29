import type { TdHTMLAttributes, ReactNode } from "react";

function TableTd({
  children,
  ...props
}: TdHTMLAttributes<HTMLTableCellElement> & {
  children: ReactNode;
}) {
  return (
    <td
      {...props}
      className="px-2 py-2 pl-8 whitespace-nowrap text-sm font-medium text-gray-800"
    >
      {children}
    </td>
  );
}

export default TableTd;
