import type { AppProps } from 'next/app';
import { montserrat, pretendard } from '@/styles/fonts';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${pretendard.variable} ${montserrat.variable}`}>
      <Component {...pageProps} />
    </main>
  );
}
