import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "@/utils/api";
import Image from "next/image";
import { DotsThreeVertical } from "@phosphor-icons/react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Card } from "@/components/card";

const menu = [
  { label: "teste", onSelect: (id: string) => console.log('teste', id)}
]

export default function Home() {
  const { data: sessionData } = useSession();
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <main className="mt-28 flex min-h-full flex-col items-center ">
      <div className="flex justify-center">
        {!sessionData && (
          <h1 onClick={() => void signIn()} className="text-2xl opacity-60">
            <span className="cursor-pointer underline hover:opacity-50">
              Login
            </span>{" "}
            to upload your images
          </h1>
        )}
        <Card.Root>
          <Card.Image image="/background-default1.jpg" />
          <Card.Content title="title of the folder" date="1 hour">
            <Card.Menu id="teste" items={menu} />  
          </Card.Content>
        </Card.Root>
        {/* root */}
        <div className="rounded-xl border-2 border-b-4 border-r-4 border-slate-900 transition-all hover:border-b-8 hover:border-r-8 active:border-b-4 active:border-r-4">
          <Image
            width={400}
            height={100}
            alt="test"
            className="rounded-t-md"
            src="/background-default1.jpg"
          />
          {/* content */}
          <div className="p-4">

          <section className="flex items-center justify-between rounded-ss-xl">
            {/* title maximo 30 */}
            <h1 className="text-2xl font-bold">title of the folder</h1>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <DotsThreeVertical
                  className="cursor-pointer hover:rounded-full hover:bg-slate-900/10"
                  size={32}
                  weight="bold"
                />
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  className="min-w-[220px] rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
                  sideOffset={5}
                >
                  <DropdownMenu.Item  className="group relative flex h-[25px] cursor-pointer select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] leading-none outline-none hover:bg-slate-500 hover:text-slate-100">
                    Open folder
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="group relative flex h-[25px] cursor-pointer select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] leading-none outline-none hover:bg-slate-500 hover:text-slate-100 data-[disabled]:pointer-events-none">
                    Edit folder name
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="group relative flex h-[25px] cursor-pointer select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] leading-none text-red-600 outline-none hover:bg-slate-500 hover:text-slate-100 data-[disabled]:pointer-events-none">
                    Delete folder
                  </DropdownMenu.Item>
                  <DropdownMenu.Arrow className="fill-white" />
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </section>

            <h1 className="rounded-b-xl pr-4 pt-2 text-end text-lg hover:rounded-b-xl">
              1 hour
            </h1>
            
          </div>
        
        </div>
      </div>

    </main>
  );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
