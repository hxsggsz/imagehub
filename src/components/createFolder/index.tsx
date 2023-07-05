import { signIn, useSession } from 'next-auth/react'
import { Button } from '../button'
import { FolderNotchPlus } from '@phosphor-icons/react'
import Image from 'next/image'
import Link from 'next/link'

export const CreateFolder = () => {
  const { data: sessionData } = useSession()
  return (
    <>
      {sessionData ? (
        <div>
          <Image
            width={100}
            height={100}
            className="mr-12"
            src="/favicon.png"
            alt="logo"
          />
          <h1 className="mb-2 w-full text-4xl font-bold text-cyan-700">
            Create a Folder
          </h1>
          <p className="mb-2 text-2xl">
            Add a new folder to organize your files
          </p>
          <Button className="max-md:hidden" asChild>
            <Link href={{ pathname: '/', query: { new: 'open' } }}>
              <FolderNotchPlus size={24} weight="bold" />
              Create new Folder
            </Link>
          </Button>

          <Button className="md:hidden" asChild>
            <Link href={{ pathname: '/', query: { folders: 'open' } }}>
              <FolderNotchPlus size={24} weight="bold" />
              See your folders
            </Link>
          </Button>
        </div>
      ) : (
        <h1
          onClick={() => void signIn('github')}
          className="text-2xl opacity-60"
        >
          <span className="cursor-pointer underline hover:opacity-50">
            Login
          </span>{' '}
          to upload your images
        </h1>
      )}
    </>
  )
}
