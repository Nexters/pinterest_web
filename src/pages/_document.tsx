import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head />
      <body>
        <div id='portal-root'></div>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
