import { useRouter } from 'next/router'
import { Card } from '../card'
import { CameraPlus } from '@phosphor-icons/react'
import { Form } from '../form'
import { Button } from '../button'
import Link from 'next/link'
import { useUploadThing } from '@/utils/uploadthing'
import { type ChangeEvent, type FormEvent, useState } from 'react'
import { api } from '@/utils/api'
import { useSession } from 'next-auth/react'

const menu = [
  { label: 'teste', onSelect: (id: string) => console.log('teste', id) },
]

export const Folders = () => {
  const router = useRouter()
  const [files, setFiles] = useState('')
  const [error, setError] = useState('')
  const { data: session } = useSession()
  const [folderName, setFolderName] = useState('')
  const [imageToUpload, setImageToUpload] = useState<File[]>([])
  const { data: folders } = api.folders.getAll.useQuery(undefined, {
    enabled: session?.user !== undefined,
  })
  const createFolder = api.folders.createFolder.useMutation({})

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
    if (folderName.length < 3 || folderName.length > 30) {
      setError('name too big or too short')
      return
    }

    imageToUpload && void startUpload(imageToUpload)

    createFolder.mutate({
      name: folderName,
    })

    if (createFolder.isSuccess) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      router.push('/')
      setError('')
    }
  }

  return (
    <div className="flex h-screen w-full flex-col items-center gap-8 overflow-y-auto bg-cyan-900 py-4 scrollbar scrollbar-track-inherit scrollbar-thumb-cyan-100 scrollbar-thumb-rounded-lg scrollbar-w-2 max-md:absolute max-md:inset-0 max-md:z-20">
      {router.query.new ? (
        <>
          <Form.Back />
          <Form.Root onSubmit={handleSubmit}>
            <Form.Input
              value={folderName}
              onChange={(ev) => setFolderName(ev.currentTarget.value)}
              placeholder="Folder's name"
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
              Add media
            </Form.Media>
            <Form.Preview image={files} />
            <Form.Submit disabled={createFolder.isLoading}>teste</Form.Submit>
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

          {folders && folders.length > 1 ? (
            folders.map((folder) => (
              <Card.Root key={folder.id}>
                <Card.Image image={folder.backgroundImage} />
                <Card.Content title={folder.name} date="1 hour">
                  <Card.Menu id={folder.id} items={menu} />
                </Card.Content>
              </Card.Root>
            ))
          ) : (
            <h1>teste</h1>
          )}
        </>
      )}
    </div>
  )
}
