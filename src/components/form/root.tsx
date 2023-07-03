import { type FormHTMLAttributes, type ReactNode } from 'react'

interface RootProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode
}

export const Root = ({ children, ...props }: RootProps) => {
  return (
    <form
      {...props}
      className="relative grid w-full place-items-center gap-4 px-4"
    >
      {children}
    </form>
  )
}
