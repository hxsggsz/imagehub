import { api } from '@/utils/api'
import { CreateFolder } from '@/components/createFolder'
import { Folders } from '@/components/folders'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  const hello = api.example.hello.useQuery({ text: 'from tRPC' })

  return (
    <>
      <main className="grid min-h-screen grid-cols-2 place-items-center max-md:hidden">
        <CreateFolder />
        <Folders />
      </main>
      <div className="grid min-h-screen place-items-center md:hidden">
        <CreateFolder />
        {router.query.folders || router.query.new ? <Folders /> : ''}
      </div>
    </>
  )
}
