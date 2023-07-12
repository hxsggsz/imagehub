import { X } from '@phosphor-icons/react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { type ChangeEvent, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { File } from '../../components/files/index'
import * as Modal from '@radix-ui/react-dialog'
import { useUploadThing } from '@/utils/uploadthing'
import toast from 'react-hot-toast'

export default function Folder() {
  const router = useRouter()
  const { id } = router.query

  const [isOpen, setIsOpen] = useState(false)
  const [imageToUpload, setImageToUpload] = useState<File[]>([])

  function handleImage(ev: ChangeEvent<HTMLInputElement>) {
    const { files } = ev.target
    if (!files) return
    void startUpload(Array.from(files))
  }

  const { startUpload, isUploading } = useUploadThing('imageUploader', {
    onClientUploadComplete: (files) => {
      files?.forEach((file) => {
        console.log('without regex', file.fileUrl)
        const fileName = file.fileUrl.match('_([^_]+)$')

        if (fileName) {
          console.log('with regex', fileName[1])
          // make the post here
        }
      })
    },
    onUploadError: () => {
      toast.error('error occurred while uploading photo')
    },
  })

  return (
    <>
      <main className="grid h-screen place-items-center">
        {/* image list */}
        <File.Root setIsOpen={setIsOpen}>
          <File.Image image="/background-default1.jpg" />
          <File.Title title="name" />
        </File.Root>
        <input
          id="mediaPicker"
          name="mediaPicker"
          accept="image/*"
          type="file"
          onChange={handleImage}
        />
      </main>

      <Modal.Root open={isOpen} onOpenChange={setIsOpen}>
        <Modal.Overlay className="fixed inset-0 z-50 bg-black/60" />
        <AnimatePresence>
          {/* this condition is for framer motion do the exit animation because that's how AnimatePresence works */}
          {isOpen && (
            <Modal.Content
              forceMount
              className="fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%]"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <Modal.Close className="fixed right-0 top-0 rounded-lg bg-cyan-700 p-1 text-cyan-100">
                  <X size={32} weight="bold" />
                </Modal.Close>
                <Image
                  width={800}
                  height={800}
                  alt="image"
                  src="/background-default1.jpg"
                  className="rounded-md border-2 border-b-4 border-cyan-700"
                />
              </motion.div>
            </Modal.Content>
          )}
        </AnimatePresence>
      </Modal.Root>
    </>
  )
}
