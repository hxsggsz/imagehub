import { type ReactNode } from 'react'

interface RootProps {
  children: ReactNode
}

export const Root = ({ children }: RootProps) => {
  return (
    <div className="max-w-lg cursor-pointer rounded-xl border-2 border-b-8 border-r-8 border-cyan-100 bg-cyan-100 transition-all hover:border-cyan-700 active:border-b-4 active:border-r-4 max-lg:mx-6">
      {children}
    </div>
  )
}
