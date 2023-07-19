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
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useFolders } from '@/hooks/useFolders'
import { toast } from 'react-hot-toast'

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
        console.log(file)
        handlers.createFolder.mutate({
          name: states.fileName,
          backgroundImage: file.fileUrl,
          backgroundImageKey: file.fileKey,
        })
      })
    },
    onUploadError: () => {
      toast.error('error occurred while uploading photo')
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

  function resetFolderList() {
    setFolderList([])
  }

  return (
    <div className="flex h-screen w-full flex-col bg-cyan-900 pt-4 max-md:absolute max-md:inset-0 max-md:z-20">
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
            {handlers.createFolder.error?.data?.zodError?.fieldErrors.name && (
              <Form.Error>
                {handlers.createFolder.error.data.zodError.fieldErrors.name}
              </Form.Error>
            )}
            <Form.Submit
              className="float-right"
              IsLoading={handlers.createFolder.isLoading || isUploading}
              disabled={
                handlers.createFolder.isLoading ||
                isUploading ||
                states.fileName === ''
              }
            >
              create
            </Form.Submit>
          </Form.Root>
        </>
      ) : (
        <>
          <AnimatePresence>
            {handlers.allFolders.isLoading ? (
              <div className="grid w-full place-items-center max-lg:px-6">
                <Card.Skeleton />
                <Card.Skeleton />
                <Card.Skeleton />
                <Card.Skeleton />
              </div>
            ) : handlers.allFolders.data &&
              handlers.allFolders.data.length > 0 ? (
              <>
                <motion.div
                  initial={{ y: -100 }}
                  animate={{ y: 0 }}
                  exit={{ y: -100 }}
                  className="my-14 flex w-full items-center gap-4 px-4"
                >
                  <Button
                    asChild
                    isFull
                    className="w-full"
                    onClick={resetFolderList}
                  >
                    <Link href="/">
                      <X size={30} weight="bold" />
                    </Link>
                  </Button>

                  <Button isFull className="w-full" asChild>
                    <Link href={{ pathname: '/', query: { new: 'open' } }}>
                      <FolderNotchPlus size={30} weight="fill" />
                    </Link>
                  </Button>

                  {folderList.length > 0 && (
                    <Button
                      isFull
                      onClick={() => {
                        resetFolderList()
                        handlers.deleteManyFolders.mutate({
                          id: folderList,
                        })
                      }}
                      className="w-full"
                    >
                      <div className="relative px-3">
                        <Trash size={30} weight="fill" />
                        <span className="absolute -top-1 right-0 h-6 w-6 rounded-full bg-cyan-900 text-base">
                          {folderList.length}
                        </span>
                      </div>
                    </Button>
                  )}
                </motion.div>

                <ul className="flex h-screen w-full flex-col gap-4 overflow-y-auto py-4 scrollbar scrollbar-track-inherit scrollbar-thumb-cyan-100 scrollbar-thumb-rounded-lg scrollbar-w-2 max-lg:px-6">
                  {handlers.allFolders.data.map((folder) => (
                    <motion.li
                      className="flex w-full flex-col items-center"
                      key={folder.id}
                    >
                      <Card.Root
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
                    </motion.li>
                  ))}
                </ul>
              </>
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
