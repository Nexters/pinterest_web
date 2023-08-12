import { type HTMLAttributes } from 'react';
import { PhotoCut } from '@/types';
import { Icon, ImageFrame } from '@/components/shared';
import { cn } from '@/utils/cn';

const FILM_HOLE_COUNT = 11;
const FILM_MAX_COUNT = 10;

interface Props extends HTMLAttributes<HTMLDivElement> {
  title: string;
  photos?: PhotoCut[];
  onEditTitle: () => void;
}

export function CameraRoll({
  title,
  photos = [],
  onEditTitle,
  className,
  ...restProps
}: Props) {
  return (
    <div
      className={cn('tw-ml-5 tw-bg-grayscale-700', className)}
      {...restProps}
    >
      <div className='tw-flex tw-items-center tw-justify-between tw-py-2 tw-pl-3.5 tw-pr-5'>
        <div className='tw-flex tw-items-center tw-gap-1'>
          <h2 className='tw-text-body1 tw-text-grayscale-200'>{title}</h2>
          <Icon
            iconType='Edit'
            className='tw-cursor-pointer tw-fill-grayscale-400'
            onClick={onEditTitle}
          />
        </div>
        <span className='tw-text-caption-eng tw-text-grayscale-100'>{`${photos.length} Cuts`}</span>
      </div>
      <div className='tw-flex tw-gap-2.5 tw-overflow-x-scroll tw-scrollbar-hide'>
        {photos.map(({ photo_cut_id, title, image }) => (
          <div
            key={photo_cut_id}
            className='tw-aspect-[3/4] tw-h-[250px] tw-bg-grayscale-400'
          >
            <ImageFrame src={image} alt={title} />
          </div>
        ))}
        {Array.from({ length: FILM_MAX_COUNT - photos.length }, (_, idx) => (
          <div
            key={idx}
            className='tw-aspect-[3/4] tw-h-[250px] tw-bg-grayscale-400'
          />
        ))}
      </div>
      <div className='tw-flex tw-items-center tw-gap-4 tw-px-3.5 tw-py-2'>
        {[...Array(FILM_HOLE_COUNT)].map((_, idx) => (
          <div
            key={idx}
            className='tw-h-3 tw-w-6 tw-shrink-0 tw-gap-4 tw-rounded tw-bg-grayscale-400'
          />
        ))}
      </div>
    </div>
  );
}
