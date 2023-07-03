import { useRouter } from 'next/router'
import { Card } from '../card'
import { CameraPlus } from '@phosphor-icons/react'
import { Form } from '../form'
import { Button } from '../button'
import Link from 'next/link'

interface FoldersProps {}

const menu = [
  { label: 'teste', onSelect: (id: string) => console.log('teste', id) },
]

export const Folders = ({}: FoldersProps) => {
  const router = useRouter()

  return (
    <div className="flex h-screen w-full flex-col items-center gap-8 overflow-y-auto bg-cyan-900 py-4 scrollbar scrollbar-track-inherit scrollbar-thumb-cyan-100 scrollbar-thumb-rounded-lg scrollbar-w-2 max-md:absolute max-md:inset-0 max-md:z-20">
      {router.query.new ? (
        <>
          <Form.Back />
          <Form.Root>
            <Form.Media>
              <CameraPlus size={28} weight="bold" /> - Add media
            </Form.Media>
            <Form.Input placeholder="Folder's name" />
            <Form.Preview image="/background-default1.jpg" />
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
              <Link href={{ pathname: '/', query: { new: '1' } }}>
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
