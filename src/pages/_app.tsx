import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import { Hydrate, QueryProvider } from '@/providers';
import 'bootstrap/dist/css/bootstrap.min.css';
import { montserrat, pretendard } from '@/styles/fonts';
import '@/styles/globals.css';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <QueryProvider>
      <Hydrate state={pageProps.dehydratedState}>
        <main className={`${pretendard.variable} ${montserrat.variable}`}>
          {getLayout(<Component {...pageProps} />)}
        </main>
      </Hydrate>
    </QueryProvider>
  );
}
