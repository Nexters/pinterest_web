import type { AppProps } from 'next/app';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const a = 1;
  console.log(a);
  return <Component {...pageProps} />;
}
