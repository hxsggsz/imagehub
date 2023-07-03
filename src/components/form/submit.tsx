import { type ButtonHTMLAttributes, type ReactNode } from 'react'
import { Button } from '../button'

interface SubmitProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export const Submit = ({ children, ...props }: SubmitProps) => {
  return (
    <Button {...props} isFullScreen>
      {children}
    </Button>
  )
}
