import { type ReactNode } from 'react'

export default function TableHead({ children }: { children: ReactNode }) {
    return (
        <thead className="bg-gray-200 whitespace-nowrap">
            {children}
        </thead>

    )
}
