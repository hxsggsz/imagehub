import { type ButtonHTMLAttributes, type ReactNode } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { twMerge } from 'tailwind-merge'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  asChild?: boolean
}

export const Button = ({ children, asChild, ...props }: ButtonProps) => {
  const Comp = asChild ? Slot : 'button'

  return (
    <div className="relative w-full">
      <Comp
        {...props}
        className={twMerge(
          'absolute flex items-center gap-2 rounded-xl border-[1px] border-b-[6px] border-slate-900 bg-cyan-700 px-6 py-2 font-semibold text-cyan-100 transition-all hover:bg-cyan-900 active:translate-y-2 active:border-b-[1px] max-md:w-full',
          props.className,
        )}
      >
        {children}
      </Comp>
    </div>
  )
}
