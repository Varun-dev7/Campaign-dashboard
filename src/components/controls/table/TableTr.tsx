import type { HTMLAttributes, ReactNode } from "react";

function TableTr({
  children,
  ...props
}: HTMLAttributes<HTMLTableRowElement> & {
  children: ReactNode;
}) {
  return (
    <tr
      {...props}
      className="hover:bg-slate-50 divide-x divide-gray-300"
    >
      {children}
    </tr>
  );
}

export default TableTr;
