import { type InputHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type InputProps = InputHTMLAttributes<HTMLInputElement>

export const Input = ({ ...props }: InputProps) => {
  return (
    <input
      {...props}
      className={twMerge(
        'w-full border-inherit bg-inherit text-lg text-cyan-50 outline-none placeholder:text-slate-400',
        props.className,
      )}
    />
  )
}
