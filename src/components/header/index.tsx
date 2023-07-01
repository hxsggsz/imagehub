import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import * as Avatar from "@radix-ui/react-avatar";

export const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="fixed left-0 top-0 flex w-screen items-center justify-between border-b border-sky-900 py-3 pr-8 shadow-md">
      <Link href="/">
        <Image width={100} height={100} src="/favicon.png" alt="page logo" />
      </Link>

      {session ? (
        <div className="flex items-center gap-2">
          <div className="text-end">
          {/* eslint-disable-next-line @typescript-eslint/restrict-template-expressions */}
            <p>{`@${session.user.name}`}</p>
            <p onClick={() => void signOut()} className="cursor-pointer text-sm text-red-700 hover:underline">log off</p>
          </div>
          <Avatar.Root className="inline-flex h-12 w-12 select-none items-center justify-center overflow-hidden rounded-full align-middle">
          <Avatar.Image
            className="h-full w-full rounded-[inherit] object-cover"
            src={session.user.image!}
            alt={`profile picture from ${session.user.name!}`}
          />
          <Avatar.Fallback className="flex h-full w-full items-center justify-center bg-slate-700/10" />
        </Avatar.Root>
        </div>
      ) : (
        <div
          onClick={() => void signIn()}
          className="flex cursor-pointer items-center gap-2 text-slate-900/60 underline hover:text-slate-900/40"
          >
          <p>Login with Github!</p>
          <div className="h-12 w-12 rounded-full bg-slate-700/10" />
        </div>
      )}
    </header>
  );
};
