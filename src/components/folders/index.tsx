import { useRouter } from 'next/router'
import { Card } from '../card'
import { CameraPlus } from '@phosphor-icons/react'
import { Form } from '../form'
import { Button } from '../button'
import Link from 'next/link'
import { useUploadThing } from '@/utils/uploadthing'
import { type ChangeEvent, type FormEvent, useState } from 'react'

interface FoldersProps {}

const menu = [
  { label: 'teste', onSelect: (id: string) => console.log('teste', id) },
]

export const Folders = ({}: FoldersProps) => {
  const router = useRouter()
  const [files, setFiles] = useState('')
  const [imageToUpload, setImageToUpload] = useState<File[]>([])

  function handleImage(ev: ChangeEvent<HTMLInputElement>) {
    const { files } = ev.target
    if (!files) return
    setImageToUpload(Array.from(files))
    const preview = URL.createObjectURL(files[0]!)
    setFiles(preview)
  }

  const { startUpload } = useUploadThing('imageUploader', {
    onClientUploadComplete: (file) => {
      console.log('uploaded successfully!', file)
    },
    onUploadError: () => {
      alert('error occurred while uploading')
    },
  })

  function handleSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault()
    void startUpload(imageToUpload)
  }

  return (
    <div className="flex h-screen w-full flex-col items-center gap-8 overflow-y-auto bg-cyan-900 py-4 scrollbar scrollbar-track-inherit scrollbar-thumb-cyan-100 scrollbar-thumb-rounded-lg scrollbar-w-2 max-md:absolute max-md:inset-0 max-md:z-20">
      {router.query.new ? (
        <>
          <Form.Back />
          <Form.Root onSubmit={handleSubmit}>
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
              Add media
            </Form.Media>
            <Form.Input placeholder="Folder's name" />
            <Form.Preview image={files} />
            <Form.Submit>teste</Form.Submit>
          </Form.Root>
        </>
      ) : (
        <>
          <div className="mb-20 flex w-full items-center gap-4 px-4 md:hidden">
            <Button asChild>
              <Link href="/">Close</Link>
            </Button>
            <Button asChild>
              <Link href={{ pathname: '/', query: { new: 'open' } }}>
                Create new Folder
              </Link>
            </Button>
          </div>
          <Card.Root>
            <Card.Image image="/background-default1.jpg" />
            <Card.Content title="title of the folder" date="1 hour">
              <Card.Menu id="teste" items={menu} />
            </Card.Content>
          </Card.Root>
          <Card.Root>
            <Card.Image image="/background-default1.jpg" />
            <Card.Content title="title of the folder" date="1 hour">
              <Card.Menu id="teste" items={menu} />
            </Card.Content>
          </Card.Root>
        </>
      )}
    </div>
  )
}
