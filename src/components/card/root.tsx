import {
  type SetStateAction,
  type ReactNode,
  type Dispatch,
  useEffect,
} from 'react'
import { useLongPress } from '@/hooks/useLongPress'
import { CheckCircle } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'

interface RootProps {
  children: ReactNode
  id: string
  folderList: string[]
  setFolderList: Dispatch<SetStateAction<string[]>>
}

export const Root = ({
  children,
  id,
  folderList,
  setFolderList,
}: RootProps) => {
  const router = useRouter()

  const { event, handlers } = useLongPress(id, folderList, setFolderList)

  const findThisFolder = folderList.find((folderId) => folderId === id)

  useEffect(() => {
    event === 'click' && void router.replace(`/folder/${id}`)
  }, [event])

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: findThisFolder ? 0.9 : 1 }}
      exit={{ opacity: 0, scale: 0 }}
      {...handlers}
      className="z-10 max-w-lg cursor-pointer rounded-xl border-2 border-b-8 border-r-8 border-cyan-100 bg-cyan-100 transition-all hover:border-cyan-700 active:border-b-4 active:border-r-4"
    >
      {findThisFolder && (
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
