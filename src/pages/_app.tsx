import type { AppProps } from 'next/app';
import { Hydrate, QueryProvider } from '@/providers';
import { montserrat, pretendard } from '@/styles/fonts';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryProvider>
      <Hydrate state={pageProps.dehydratedState}>
        <main className={`${pretendard.variable} ${montserrat.variable}`}>
          <Component {...pageProps} />
        </main>
      </Hydrate>
    </QueryProvider>
  );
}
