import { type ReactNode } from 'react'

export default function TableTh({ children }: { children: ReactNode }) {
    return (
        <th scope="col" className="px-3 py-3 text-start text-xs font-medium text-gray-700 uppercase">
            {children}
        </th>
    )
}
