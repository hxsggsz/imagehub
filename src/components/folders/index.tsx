import { useRouter } from 'next/router'
import { Card } from '../card'
import { CameraPlus, FolderNotchPlus, Trash, X } from '@phosphor-icons/react'
import { Form } from '../form'
import { Button } from '../button'
import Link from 'next/link'
import { useUploadThing } from '@/utils/uploadthing'
import { type ChangeEvent, type FormEvent, useState } from 'react'
import { imageDefault } from '@/utils/imageDefault'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useFolders } from '@/hooks/useFolders'

dayjs.extend(relativeTime)

export const Folders = () => {
  const router = useRouter()
  const { states, handlers } = useFolders()

  const [folderList, setFolderList] = useState<string[]>([])
  const [imageToUpload, setImageToUpload] = useState<File[]>([])

  const menu = [
    {
      label: 'Delete folder',
      isDelete: true,
      onSelect: (id: string) => handlers.deleteFolder.mutate({ id }),
    },
    {
      label: 'Edit name',
      onSelect: (id: string) =>
        router.replace({ pathname: '/', query: { folders: id } }),
    },
  ]

  /**
   * todo:
   * make this component more clean and separete the logic on custom hooks
   * separete the image logic in a custom hook
   * add toast notification for delete one or many folders and when create a new folder
   */

  function handleImage(ev: ChangeEvent<HTMLInputElement>) {
    const { files } = ev.target
    if (!files) return
    setImageToUpload(Array.from(files))
    const preview = URL.createObjectURL(files[0]!)
    states.setFiles(preview)
  }

  const { startUpload, isUploading } = useUploadThing('imageUploader', {
    onClientUploadComplete: (files) => {
      files?.forEach((file) => {
        handlers.createFolder.mutate({
          name: states.fileName,
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
        handlers.createFolder.mutate({
          name: states.fileName,
          backgroundImage: imageDefault(random),
        }),
    )
    setImageToUpload([])
  }

  function handleFolderName(id: string, ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault()
    const formData = new FormData(ev.currentTarget)
    const name = formData.get('updateFolderName')
    if (name) {
      handlers.updateFolderName.mutate({
        id,
        name: name.toString(),
      })
    }
  }

  return (
    <div className="flex h-screen w-full  flex-col items-center gap-8 overflow-y-auto bg-cyan-900 py-4 scrollbar scrollbar-track-inherit scrollbar-thumb-cyan-100 scrollbar-thumb-rounded-lg scrollbar-w-2 max-lg:px-6 max-md:absolute max-md:inset-0 max-md:z-20">
      {router.query.new ? (
        <>
          <Form.Back />
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <Form.Root onSubmit={handleSubmit}>
            <Form.Input
              value={states.fileName}
              placeholder="Folder's name"
              onChange={(ev) => states.setFileName(ev.currentTarget.value)}
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
            <Form.Preview image={states.files} />
            {handlers.createFolder.error && (
              <Form.Error>
                {handlers.createFolder.error?.data?.zodError?.fieldErrors
                  .name || handlers.createFolder.error.message}
              </Form.Error>
            )}
            <Form.Submit
              IsLoading={handlers.createFolder.isLoading || isUploading}
              disabled={handlers.createFolder.isLoading || isUploading}
            >
              teste
            </Form.Submit>
          </Form.Root>
        </>
      ) : (
        <>
          <div
            className={`mb-20 flex w-full items-center gap-4 px-4 ${
              folderList.length === 0 ? 'hidden' : ''
            }`}
          >
            <Button className="w-full" asChild>
              <Link href="/">
                <X size={30} weight="bold" />
              </Link>
            </Button>
            <Button className="w-full" asChild>
              <Link href={{ pathname: '/', query: { new: 'open' } }}>
                <FolderNotchPlus size={30} weight="fill" />
              </Link>
            </Button>
            <Button
              onClick={() =>
                handlers.deleteManyFolders.mutate({
                  id: folderList,
                })
              }
              className="w-full"
            >
              <Trash size={30} weight="fill" />
            </Button>
          </div>

          <AnimatePresence>
            {handlers.allFolders.isLoading ? (
              <>
                <Card.Skeleton />
                <Card.Skeleton />
                <Card.Skeleton />
                <Card.Skeleton />
              </>
            ) : handlers.allFolders.data &&
              handlers.allFolders.data.length > 0 ? (
              handlers.allFolders.data.map((folder) => (
                <Card.Root
                  key={folder.id}
                  id={folder.id}
                  folderList={folderList}
                  setFolderList={setFolderList}
                >
                  <Card.Image image={folder.backgroundImage} />
                  <Card.Content
                    id={folder.id}
                    title={folder.name}
                    handleSubmit={handleFolderName}
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
                  width={500}
                  height={300}
                  quality={100}
                  src="/empty.png"
                  alt="woman holding a big empty folder"
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
