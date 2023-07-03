import { ArrowLeft } from '@phosphor-icons/react'
import Link from 'next/link'

export const Back = () => {
  return (
    <Link
      href="/"
      className="flex w-full items-center justify-start gap-4 pl-4 pt-4 text-cyan-100"
    >
      <ArrowLeft size={18} weight="bold" />
    </Link>
  )
}
