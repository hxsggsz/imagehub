import { useRouter } from 'next/router'
import { Card } from '../card'
import { useState } from 'react'
import { CameraPlus } from '@phosphor-icons/react'
import { Form } from '../form'

interface FoldersProps {}

const menu = [
  { label: 'teste', onSelect: (id: string) => console.log('teste', id) },
]

export const Folders = ({}: FoldersProps) => {
  const router = useRouter()
  const [test, setTest] = useState('')

  return (
    <div className="flex h-screen w-full flex-col items-center gap-8 overflow-y-auto bg-cyan-900 scrollbar scrollbar-track-inherit scrollbar-thumb-cyan-100 scrollbar-thumb-rounded-lg scrollbar-w-2">
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
