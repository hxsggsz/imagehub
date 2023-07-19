import { type ButtonHTMLAttributes, type ReactNode } from 'react'
import { Button } from '../button'

interface SubmitProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  IsLoading?: boolean
}

export const Submit = ({ children, IsLoading, ...props }: SubmitProps) => {
  return (
    <Button
      isFull
      {...props}
      type="submit"
      className="w-full"
      isLoading={IsLoading}
    >
      {children}
    </Button>
  )
}
