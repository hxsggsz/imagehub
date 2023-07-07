import { type FormEvent, type ReactNode } from 'react'
import { useRouter } from 'next/router'
import { Form } from '../form'
import { CaretLeft, PaperPlaneRight } from '@phosphor-icons/react'
import Link from 'next/link'

interface ContentProps {
  children: ReactNode
  title: string
  id: string
  date: string
  handleSubmit: (id: string, ev: FormEvent<HTMLFormElement>) => void
}

export const Content = ({
  children,
  title,
  id,
  date,
  handleSubmit,
}: ContentProps) => {
  const router = useRouter()
  const { folders } = router.query
  return (
    <div className="w-full p-4">
      <section className="flex items-center justify-between rounded-ss-xl text-slate-700">
        {folders === id ? (
          <Form.Root
            className="flex flex-row"
            onSubmit={(ev) => handleSubmit(id, ev)}
          >
            <Link href={{ pathname: '/', query: { folders: 'open' } }}>
              <CaretLeft size={30} weight="bold" />
            </Link>
            <Form.Input
              autoFocus
              placeholder={title}
              name="updateFolderName"
              className="text-cyan-950"
            />
            <button type="submit">
              <PaperPlaneRight size={30} weight="bold" />
            </button>
          </Form.Root>
        ) : (
          <h1 className="text-2xl font-bold">{title}</h1>
        )}
        {children}
      </section>
      <h1 className="rounded-b-xl pr-4 pt-2 text-end text-lg font-medium text-slate-500 hover:rounded-b-xl">
        {date}
      </h1>
    </div>
  )
}
