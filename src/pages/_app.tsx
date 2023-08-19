import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Hydrate, ModalProvider, QueryProvider } from '@/providers';
import 'bootstrap/dist/css/bootstrap.min.css';
import { montserrat, pretendard } from '@/styles/fonts';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
        />
      </Head>
      <QueryProvider>
        <ModalProvider>
          <Hydrate state={pageProps.dehydratedState}>
            <main className={`${pretendard.variable} ${montserrat.variable}`}>
              <Component {...pageProps} />
            </main>
          </Hydrate>
        </ModalProvider>
      </QueryProvider>
    </>
  );
}
