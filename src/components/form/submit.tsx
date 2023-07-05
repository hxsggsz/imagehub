import { type ButtonHTMLAttributes, type ReactNode } from 'react'
import { Button } from '../button'

interface SubmitProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  IsLoading?: boolean
}

export const Submit = ({ children, IsLoading, ...props }: SubmitProps) => {
  return (
    <Button {...props} isLoading={IsLoading} className="w-full">
      {children}
    </Button>
  )
}
