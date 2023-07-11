import { useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'

interface RootProps {
  children: ReactNode
}

export const Root = ({ children }: RootProps) => {
  const [isClicked, setIsClicked] = useState(false)

  return (
    <motion.div
      animate={{ scale: isClicked ? [0.9, 1] : 1 }}
      transition={{ duration: 0.3 }}
      onClick={() => setIsClicked((prev) => !prev)}
      className="grid cursor-pointer place-items-center rounded-md p-2"
    >
      {children}
    </motion.div>
  )
}
