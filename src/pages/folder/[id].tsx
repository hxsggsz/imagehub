import { X } from '@phosphor-icons/react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { type ChangeEvent, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { File } from '../../components/files/index'
import * as Modal from '@radix-ui/react-dialog'
import { useUploadThing } from '@/utils/uploadthing'
import toast from 'react-hot-toast'
import { api } from '@/utils/api'
import { Button } from '@/components/button'

export default function Folder() {
  const router = useRouter()
  const { id } = router.query

  const folderId = id && id.toString()

  const [isOpen, setIsOpen] = useState(false)

  const ctx = api.useContext()
  const allFiles = api.files.getAll.useQuery({ id: folderId! })
  const createFile = api.files.newFile.useMutation({
    onError: (err) => {
      if (err?.shape?.message) {
        toast.error(err.shape.message)
      }
    },
    onSuccess: () => {
      toast.success('files deleted successfully')
      void ctx.folders.getAll.invalidate()
    },
  })

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

        if (fileName && id && fileName[1]) {
          console.log('with regex', fileName[1])
          createFile.mutate({
            FoldersId: id.toString(),
            name: fileName[1],
            image: file.fileUrl,
            imageKey: file.fileKey,
          })
        }
      })
    },
    onUploadError: () => {
      toast.error('error occurred while uploading photo')
    },
  })

  return (
    <>
      <div className="mt-20 flex gap-4 px-4 pr-8">
        <Button>
          <label>
            Add file
            <input
              id="mediaPicker"
              name="mediaPicker"
              accept="image/*"
              type="file"
              className="hidden"
              onChange={handleImage}
            />
          </label>
        </Button>
        <Button>
          <label>
            Add file
            <input
              id="mediaPicker"
              name="mediaPicker"
              accept="image/*"
              type="file"
              className="hidden"
              onChange={handleImage}
            />
          </label>
        </Button>
      </div>

      <main className="grid h-screen place-items-center">
        {allFiles.data?.map((file) => (
          <>
            <File.Root key={file.id} setIsOpen={setIsOpen}>
              <File.Image image={file.image} />
              <File.Title title={file.name} />
            </File.Root>

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
                        alt={`${file.name} image`}
                        src={file.image}
                        className="rounded-md border-2 border-b-4 border-cyan-700"
                      />
                    </motion.div>
                  </Modal.Content>
                )}
              </AnimatePresence>
            </Modal.Root>
          </>
        ))}
      </main>
    </>
  )
}
