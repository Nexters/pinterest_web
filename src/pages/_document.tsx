import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='ko'>
      <Head>
        <link
          href='https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css'
          rel='stylesheet'
        />
      </Head>
      <body>
        <div id='portal-root'></div>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
