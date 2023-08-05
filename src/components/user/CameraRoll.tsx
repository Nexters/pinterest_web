import { type HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

const FILM_HOLE_COUNT = 11;

interface Props extends HTMLAttributes<HTMLDivElement> {
  title: string;
  photos?: string[];
}

export function CameraRoll({ title, photos = [], className, ...restProps }: Props) {
  const srcs = Array.from({ length: 10 }, (_, i) => photos[i] ?? '');

  return (
    <div className={cn('tw-ml-5 tw-bg-grayscale-700', className)} {...restProps}>
      <div className='tw-flex tw-items-center tw-justify-between tw-py-2 tw-pl-3.5 tw-pr-5'>
        <h2 className='tw-text-body1 tw-text-grayscale-200'>{title}</h2>
        <span className='tw-text-caption-eng tw-text-grayscale-100'>{`${photos.length} Cuts`}</span>
      </div>
      <div className='tw-flex tw-gap-2.5 tw-overflow-x-scroll tw-scrollbar-hide'>
        {srcs.map((photo, idx) => (
          <div key={idx} className='tw-aspect-[3/4] tw-h-[250px] tw-bg-grayscale-400' />
        ))}
      </div>
      <div className='tw-flex tw-items-center tw-gap-4 tw-px-3.5 tw-py-2'>
        {[...Array(FILM_HOLE_COUNT)].map((_, idx) => (
          <div key={idx} className='tw-h-3 tw-w-6 tw-shrink-0 tw-gap-4 tw-rounded tw-bg-grayscale-400' />
        ))}
      </div>
    </div>
  );
}