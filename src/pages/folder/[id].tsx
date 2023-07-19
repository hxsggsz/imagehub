import { Trash, X } from '@phosphor-icons/react'
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
import { Loading } from '@/components/loading.tsx/loading'

export default function Folder() {
  const router = useRouter()
  const { id } = router.query

  const folderId = id && id.toString()

  const [isOpen, setIsOpen] = useState(false)
  const [imageModal, setImageModal] = useState('')
  const [fileId, setFileId] = useState<string[]>([])

  const ctx = api.useContext()
  const allFiles = api.files.getAll.useQuery({ id: folderId! })
  const createFile = api.files.newFile.useMutation({
    onError: (err) => {
      if (err?.shape?.message) {
        toast.error(err.shape.message)
      }
    },
    onSuccess: () => {
      toast.success('image added successfully')
      void ctx.files.getAll.invalidate()
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
        const fileName = file.fileUrl.match('_([^_]+)$')

        if (fileName && id && fileName[1]) {
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
    <div className="h-screen w-screen overflow-y-auto scrollbar scrollbar-track-inherit scrollbar-thumb-cyan-100 scrollbar-thumb-rounded-lg scrollbar-w-2">
      <div className="mt-20 flex justify-end gap-4 px-4 pr-8">
        <Button isLoading={isUploading} disabled={isUploading}>
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
        {fileId.length > 0 && (
          <>
            <Button>
              <div className="relative px-3">
                <Trash size={30} weight="fill" />
                <span className="absolute -top-1 right-0 h-6 w-6 rounded-full bg-cyan-900 text-base">
                  {fileId.length}
                </span>
              </div>
            </Button>

            <Button onClick={() => setFileId([])}>
              <X size={30} weight="bold" />
            </Button>
          </>
        )}
      </div>

      {allFiles.isLoading ? (
        <div className="grid h-[70vh] place-items-center">
          <Loading />
        </div>
      ) : (
        <main className="grid grid-cols-3 place-items-center gap-10 py-4 max-md:grid-cols-2 max-sm:grid-cols-2 max-[490px]:grid-cols-1">
          {allFiles.data?.map((file) => (
            <File.Root
              key={file.id}
              id={file.id}
              image={file.image}
              setIsOpen={setIsOpen}
              fileId={fileId}
              setFileId={setFileId}
              setImageModal={setImageModal}
            >
              <File.Image image={file.image} />
              <File.Title title={file.name} />
            </File.Root>
          ))}

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
                      width={600}
                      height={600}
                      src={imageModal}
                      alt="image for modal"
                      className="max-h-[600px] rounded-md border-2 border-b-4 border-cyan-700 bg-slate-900 object-contain"
                    />
                  </motion.div>
                </Modal.Content>
              )}
            </AnimatePresence>
          </Modal.Root>
        </main>
      )}
    </div>
  )
}
