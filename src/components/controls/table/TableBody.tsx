import { type ReactNode } from 'react'

export default function TableBody({ children }: { children: ReactNode }) {
    return (
        <tbody className="divide-y divide-gray-300">
            {children}
        </tbody>
    )
}
