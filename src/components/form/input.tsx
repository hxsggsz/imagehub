import { type InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement>

export const Input = ({ ...props }: InputProps) => {
  return (
    <input
      {...props}
      className="w-full border-inherit bg-inherit text-lg text-cyan-100 outline-none placeholder:text-slate-400"
    />
  )
}
