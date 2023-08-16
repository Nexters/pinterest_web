import Image from 'next/image';
import { cn } from '@/utils/cn';

interface LoadingProps {
  darkMode?: boolean;
  message?: string;
  className?: string;
}

export const LoadingView = ({ darkMode, message, className }: LoadingProps) => {
  return (
    <div
      className={cn(
        'tw-w-100 tw-flex tw-h-[100vh] tw-flex-col tw-items-center tw-justify-center tw-gap-8',
        className,
      )}
    >
      <Image
        src={darkMode ? '/images/grafi_light.svg' : '/images/grafi_light.svg'}
        width={100}
        height={100}
        alt='film_image'
      />
      <p className='tw-text-body1 tw-text-gray-400'>
        {message ? message : '그라피를 불러오는 중입니다.'}
      </p>
    </div>
  );
};
