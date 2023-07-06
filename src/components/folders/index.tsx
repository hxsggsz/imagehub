import { useRouter } from 'next/router'
import { Card } from '../card'
import { CameraPlus, FolderNotchPlus, X } from '@phosphor-icons/react'
import { Form } from '../form'
import { Button } from '../button'
import Link from 'next/link'
import { useUploadThing } from '@/utils/uploadthing'
import { type ChangeEvent, type FormEvent, useState } from 'react'
import { api } from '@/utils/api'
import { imageDefault } from '@/utils/imageDefault'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { AnimatePresence } from 'framer-motion'
import Image from 'next/image'

dayjs.extend(relativeTime)

export const Folders = () => {
  const router = useRouter()

  const [files, setFiles] = useState('')
  const [fileName, setFileName] = useState('')
  const [imageToUpload, setImageToUpload] = useState<File[]>([])

  const allFolders = api.folders.getAll.useQuery()
  const ctx = api.useContext()
  const deleteFolder = api.folders.deleteFolder.useMutation({
    onSuccess: () => ctx.folders.getAll.invalidate(),
  })
  const createFolder = api.folders.createFolder.useMutation({
    onSuccess: () => {
      setFiles('')
      setFileName('')
      void ctx.folders.getAll.invalidate()
      void router.replace({ pathname: '/', query: { folders: 'open' } })
    },
  })

  const menu = [
    {
      label: 'Delete folder',
      onSelect: (id: string) => deleteFolder.mutate({ id }),
    },
  ]

  /**
   * todo:
   * make this component more clean and separete the logic on custom hooks
   */

  function handleImage(ev: ChangeEvent<HTMLInputElement>) {
    const { files } = ev.target
    if (!files) return
    setImageToUpload(Array.from(files))
    const preview = URL.createObjectURL(files[0]!)
    setFiles(preview)
  }

  const { startUpload, isUploading } = useUploadThing('imageUploader', {
    onClientUploadComplete: (file) => {
      // eslint-disable-next-line array-callback-return
      file?.map((file) => {
        createFolder.mutate({
          name: fileName,
          backgroundImage: file.fileUrl,
          backgroundImageKey: file.fileKey,
        })
      })
    },
    onUploadError: () => {
      console.error('error occurred while uploading photo')
    },
  })

  async function handleSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault()
    const random = Math.floor(Math.random() * 6 + 1)
    await startUpload(imageToUpload).then(
      (res) =>
        res?.length === 0 && // if the res is empty create new folder with image placeholder
        createFolder.mutate({
          name: fileName,
          backgroundImage: imageDefault(random),
        }),
    )
    setImageToUpload([])
  }

  return (
    <div className="flex h-screen w-full  flex-col items-center gap-8 overflow-y-auto bg-cyan-900 py-4 scrollbar scrollbar-track-inherit scrollbar-thumb-cyan-100 scrollbar-thumb-rounded-lg scrollbar-w-2 max-lg:px-6 max-md:absolute max-md:inset-0 max-md:z-20">
      {router.query.new ? (
        <>
          <Form.Back />
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <Form.Root onSubmit={handleSubmit}>
            <Form.Input
              value={fileName}
              placeholder="Folder's name"
              onChange={(ev) => setFileName(ev.currentTarget.value)}
            />
            <Form.Media>
              <input
                id="mediaPicker"
                name="mediaPicker"
                className="hidden"
                accept="image/*"
                type="file"
                onChange={handleImage}
              />
              <CameraPlus size={28} weight="bold" />
              Add media (optional)
            </Form.Media>
            <Form.Preview image={files} />
            {createFolder.error && (
              <Form.Error>
                {createFolder.error?.data?.zodError?.fieldErrors.name ||
                  createFolder.error.message}
              </Form.Error>
            )}
            <Form.Submit
              IsLoading={createFolder.isLoading || isUploading}
              disabled={createFolder.isLoading || isUploading}
            >
              teste
            </Form.Submit>
          </Form.Root>
        </>
      ) : (
        <>
          <div className="mb-20 flex w-full items-center gap-4 px-4 md:hidden">
            <Button asChild>
              <Link href="/">
                <X size={30} weight="bold" />
              </Link>
            </Button>
            <Button asChild>
              <Link href={{ pathname: '/', query: { new: 'open' } }}>
                <FolderNotchPlus size={30} weight="bold" />
              </Link>
            </Button>
          </div>

          <AnimatePresence>
            {allFolders.isLoading ? (
              <>
                <Card.Skeleton />
                <Card.Skeleton />
                <Card.Skeleton />
                <Card.Skeleton />
              </>
            ) : allFolders.data && allFolders.data.length > 0 ? (
              allFolders.data.map((folder) => (
                <Card.Root key={folder.id}>
                  <Card.Image image={folder.backgroundImage} />
                  <Card.Content
                    title={folder.name}
                    date={dayjs(folder.createdAt).fromNow()}
                  >
                    <Card.Menu id={folder.id} items={menu} />
                  </Card.Content>
                </Card.Root>
              ))
            ) : (
              <div className="grid h-full place-items-center text-cyan-50">
                <h1 className="text-4xl font-bold">
                  There&apos;s no folder yet
                </h1>
                <Image
                  quality={100}
                  width={500}
                  height={500}
                  src="/empty.png"
                  alt="woman holding a big empty folder"
                  className="w-full"
                />
                <h2 className="text-3xl font-semibold">
                  Create your first folder{' '}
                  <Link
                    className="underline hover:text-cyan-50/40"
                    href={{ pathname: '/', query: { new: 'open' } }}
                  >
                    Here
                  </Link>
                </h2>
              </div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  )
}
