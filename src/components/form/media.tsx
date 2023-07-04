import { type ReactNode } from 'react'

interface MediaProps {
  children: ReactNode
}

export const Media = ({ children }: MediaProps) => {
  return (
    <label className="flex w-full cursor-pointer items-center justify-start gap-4 text-cyan-100">
      {children}
    </label>
  )
}
