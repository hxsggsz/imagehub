import { type ReactNode } from 'react'

interface RootProps {
  children: ReactNode
}

export const Root = ({ children }: RootProps) => {
  return (
    <div className="max-w-lg rounded-xl border-2 border-b-4 border-r-4 border-cyan-700 bg-cyan-100 transition-all hover:border-b-8 hover:border-r-8 active:border-b-4 active:border-r-4">
      {children}
    </div>
  )
}
