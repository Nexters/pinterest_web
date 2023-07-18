import { Montserrat } from 'next/font/google';
import localFont from 'next/font/local';

const pretendard = localFont({
  src: [
    {
      path: '../../public/fonts/Pretendard-Regular.subset.woff2',
      weight: '400',
    },
    {
      path: '../../public/fonts/Pretendard-Medium.subset.woff2',
      weight: '500',
    },
    {
      path: '../../public/fonts/Pretendard-SemiBold.subset.woff2',
      weight: '600',
    },
    {
      path: '../../public/fonts/Pretendard-Bold.subset.woff2',
      weight: '700',
    },
  ],
  variable: '--font-pretendard',
  style: 'normal',
  display: 'swap',
});

const montserrat = Montserrat({
  variable: '--font-montserrat',
  weight: ['400', '600'],
  style: 'normal',
  display: 'swap',
  subsets: ['latin'],
});

export { pretendard, montserrat };
