import { type ReactNode } from 'react'

interface ErrorProps {
  children: ReactNode
}

export const Error = ({ children }: ErrorProps) => {
  return (
    <span className="w-full text-left text-lg font-semibold text-red-600">
      {children}
    </span>
  )
}
