import { type ReactNode, type Dispatch, type SetStateAction } from 'react'

interface RootProps {
  children: ReactNode
  setIsOpen: Dispatch<SetStateAction<boolean>>
  image: string
  setImageModal: Dispatch<SetStateAction<string>>
}

export const Root = ({
  children,
  setIsOpen,
  image,
  setImageModal,
}: RootProps) => {
  return (
    <div
      onClick={() => {
        setImageModal(image)
        setIsOpen((prev) => !prev)
      }}
      className="grid cursor-pointer place-items-center rounded-md p-2"
    >
      {children}
    </div>
  )
}
