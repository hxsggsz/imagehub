import { type ReactNode } from 'react'

interface ContentProps {
  children: ReactNode
  title: string
}

export const Content = ({ children, title }: ContentProps) => {
  return (
    <section className="flex max-w-[220px] items-center justify-between ">
      <h1 className="max-w-[90%] truncate text-xl font-bold">{title}</h1>
      {children}
    </section>
  )
}
