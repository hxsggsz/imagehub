import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { type AppType } from 'next/app'
import { api } from '@/utils/api'
import '@/styles/globals.css'
import { Header } from '@/components/header'
import Head from 'next/head'

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <Head>
        <title>ImageHub</title>
        <meta name="description" content="A place to upload your images" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <SessionProvider session={session}>
        <Component {...pageProps} />
        <Header />
      </SessionProvider>
    </>
  )
}

export default api.withTRPC(MyApp)
