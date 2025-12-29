import type { ReactNode } from "react";

function Table({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-full inline-block align-middle">
        <div className="border border-gray-300 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-300">
            {children}
          </table>
        </div>
      </div>
    </div>
  );
}

export default Table;
