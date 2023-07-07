import { type FormHTMLAttributes, type ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface RootProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode
}

export const Root = ({ children, ...props }: RootProps) => {
  return (
    <form
      {...props}
      className={twMerge(
        'flex w-full flex-col place-items-center gap-4 px-4',
        props.className,
      )}
    >
      {children}
    </form>
  )
}
