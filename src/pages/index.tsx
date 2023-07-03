import { api } from '@/utils/api'
import { CreateFolder } from '@/components/createFolder'
import { Folders } from '@/components/folders'

export default function Home() {
  const hello = api.example.hello.useQuery({ text: 'from tRPC' })

  return (
    <main className="grid min-h-screen grid-cols-2 place-items-center">
      <CreateFolder />
      <Folders />
    </main>
  )
}
