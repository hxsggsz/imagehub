import { type ButtonHTMLAttributes, type ReactNode } from 'react'

interface MediaProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export const Media = ({ children, ...props }: MediaProps) => {
  return (
    <div className="flex w-full justify-start">
      <button {...props} className="flex items-center gap-2 text-cyan-100">
        {children}
      </button>
    </div>
  )
}
