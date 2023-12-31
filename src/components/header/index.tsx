import { signIn, signOut, useSession } from 'next-auth/react'
import * as Avatar from '@radix-ui/react-avatar'

export const Header = () => {
  const { data: session } = useSession()

  return (
    <header className="fixed left-0 top-0 flex w-full items-center py-3 pl-8 backdrop-blur-sm max-md:w-full max-md:border-b-2 max-md:border-slate-900/20">
      {session ? (
        <div className="flex items-center justify-end gap-3">
          <Avatar.Root className="inline-flex h-12 w-12 select-none items-center justify-center overflow-hidden rounded-full align-middle">
            <Avatar.Image
              className="h-full w-full rounded-[inherit] object-cover"
              src={session.user.image!}
              alt={`profile picture from ${session.user.name!}`}
            />
            <Avatar.Fallback className="flex h-full w-full items-center justify-center bg-slate-700/10" />
          </Avatar.Root>

          <div className="flex flex-col justify-end">
            <p>
              Hi,{' '}
              <span className="font-medium text-cyan-700">
                {session.user.name}
              </span>
            </p>
            <p
              onClick={() => void signOut()}
              className="cursor-pointer text-sm text-red-700 hover:underline"
            >
              log off
            </p>
          </div>
        </div>
      ) : (
        <div
          onClick={() => void signIn('github')}
          className="flex  cursor-pointer items-center gap-2 underline hover:opacity-40"
        >
          <div className="h-12 w-12 animate-pulse rounded-full" />
          <p>Login with Github!</p>
        </div>
      )}
    </header>
  )
}
