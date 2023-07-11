import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { File } from '../../components/files/index'

export default function Folder() {
  const router = useRouter()
  const { id } = router.query

  const [isClicked, setIsClicked] = useState(false)
  const [isDbClicked, setIsDbClicked] = useState(false)

  return (
    <main className="grid h-screen place-items-center">
      {/* image list */}
      <File.Root>
        <File.Image image="/background-default1.jpg" />
        <File.Title title="name" />
      </File.Root>
    </main>
    // carousel image dbclick
    // <div
    //   className="absolute inset-0 z-50 flex h-screen
    //   w-screen items-center justify-center bg-black/80"
    // >
    //   <Image
    //     width={800}
    //     height={800}
    //     alt="image"
    //     src="/background-default1.jpg"
    //     className="rounded-md border-2 border-b-4 border-cyan-700"
    //   />
    //   <div className="absolute flex w-screen items-center justify-between px-2">
    //     <button className="rounded-lg bg-cyan-700 p-1 text-cyan-100">
    //       <CaretLeft size={32} weight="bold" />
    //     </button>
    //     <button className="rounded-lg bg-cyan-700 p-1 text-cyan-100">
    //       <CaretRight size={32} weight="bold" />
    //     </button>
    //   </div>
    // </div>
  )
}
