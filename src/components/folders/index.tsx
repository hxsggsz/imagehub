import { Card } from '../card'

interface FoldersProps {}

const menu = [
  { label: 'teste', onSelect: (id: string) => console.log('teste', id) },
]

export const Folders = ({}: FoldersProps) => {
  return (
    <div className="flex h-screen w-full flex-col items-center gap-8 overflow-y-auto bg-cyan-900 py-4 scrollbar scrollbar-track-inherit scrollbar-thumb-cyan-100 scrollbar-thumb-rounded-lg scrollbar-w-2">
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
    </div>
  )
}
