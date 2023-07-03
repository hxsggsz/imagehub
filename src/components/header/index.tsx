import { signIn, signOut, useSession } from 'next-auth/react'
import * as Avatar from '@radix-ui/react-avatar'

export const Header = () => {
  const { data: session } = useSession()

  return (
    <header className="fixed left-0 top-0 flex items-center py-3 pl-8 max-md:w-full max-md:border-b-2 max-md:border-slate-900/20">
      {session ? (
        <div className="flex items-center gap-2">
          <Avatar.Root className="inline-flex h-12 w-12 select-none items-center justify-center overflow-hidden rounded-full align-middle">
            <Avatar.Image
              className="h-full w-full rounded-[inherit] object-cover"
              src={session.user.image!}
              alt={`profile picture from ${session.user.name!}`}
            />
            <Avatar.Fallback className="flex h-full w-full items-center justify-center bg-slate-700/10" />
          </Avatar.Root>

          <div className="">
            <p className="text-slate-900/60">
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
          onClick={() => void signIn()}
          className="flex cursor-pointer items-center gap-2 text-slate-900/60 underline hover:text-slate-900/40"
        >
          <div className="h-12 w-12 rounded-full bg-slate-700/10" />
          <p>Login with Github!</p>
        </div>
      )}
    </header>
  )
}
