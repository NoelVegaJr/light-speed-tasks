import ProjectManagerProvider from '@/context/projects-context'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { trpc } from '@/utils/trpc';
import Layout from '@/components/Layout';

function App({ Component, pageProps }: AppProps) {
  return (
    <ProjectManagerProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ProjectManagerProvider>
  )
}

export default trpc.withTRPC(App);
