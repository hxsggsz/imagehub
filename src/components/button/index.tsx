import { type ButtonHTMLAttributes, type ReactNode } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { twMerge } from 'tailwind-merge'
import { Loading } from '../loading.tsx/loading'
import { motion } from 'framer-motion'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  asChild?: boolean
  isLoading?: boolean
}

export const Button = ({
  children,
  asChild,
  isLoading,
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot : 'button'

  return (
    <motion.div layout className="relative w-full">
      <Comp
        {...props}
        className={twMerge(
          'absolute flex cursor-pointer items-center justify-center gap-2 rounded-xl border-[1px] border-b-[6px] border-slate-900 bg-cyan-700 px-6 py-2 text-2xl font-bold text-cyan-50 transition-all hover:bg-cyan-900 active:translate-y-2 active:border-b-[1px] disabled:cursor-not-allowed disabled:bg-slate-800 disabled:opacity-70 max-md:w-full',
          props.className,
        )}
      >
        {isLoading ? <Loading /> : children}
      </Comp>
    </motion.div>
  )
}
