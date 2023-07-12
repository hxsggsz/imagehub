import { type ReactNode, type Dispatch, type SetStateAction } from 'react'

interface RootProps {
  children: ReactNode
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const Root = ({ children, setIsOpen }: RootProps) => {
  return (
    <div
      onClick={() => setIsOpen((prev) => !prev)}
      className="grid cursor-pointer place-items-center rounded-md p-2"
    >
      {children}
    </div>
  )
}
