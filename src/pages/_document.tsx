import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='ko'>
      <Head />
      <body>
        <div id='portal-root'></div>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
