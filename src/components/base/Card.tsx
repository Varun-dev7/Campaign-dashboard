import type { ReactNode } from "react";

interface CardProps {
  title?: string;
  children: ReactNode;
}

export default function Card({ title, children }: CardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      {title && (
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
}
