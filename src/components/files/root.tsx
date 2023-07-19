import { useLongPress } from '@/hooks/useLongPress'
import { CheckCircle } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import {
  type ReactNode,
  type Dispatch,
  type SetStateAction,
  useEffect,
} from 'react'

interface RootProps {
  children: ReactNode
  id: string
  fileId: string[]
  setFileId: Dispatch<SetStateAction<string[]>>
  setIsOpen: Dispatch<SetStateAction<boolean>>
  image: string
  setImageModal: Dispatch<SetStateAction<string>>
}

export const Root = ({
  children,
  id,
  setFileId,
  fileId,
  setIsOpen,
  image,
  setImageModal,
}: RootProps) => {
  const { event, handlers } = useLongPress(id, fileId, setFileId)

  const findThisFile = fileId.find((fileId) => fileId === id)

  useEffect(() => {
    if (event === 'click') {
      setImageModal(image)
      setIsOpen((prev) => !prev)
    }
  }, [event])

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: findThisFile ? 0.9 : 1 }}
      exit={{ opacity: 0, scale: 0 }}
      {...handlers}
      className="relative grid cursor-pointer place-items-center rounded-md border-2 border-b-4 border-cyan-700 p-2"
    >
      {findThisFile && (
        <CheckCircle
          size={40}
          weight="fill"
          className="absolute right-2 top-2 text-cyan-700"
        />
      )}
      {children}
    </motion.div>
  )
}
