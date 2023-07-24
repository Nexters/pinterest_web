import Image from 'next/image';
import type { ComponentProps } from 'react';
import { cn } from '@/utils/cn';

type Props = ComponentProps<typeof Image>;

export function ImageFrame({
  alt,
  fill = true,
  sizes = '475px',
  placeholder = 'empty',
  className,
  ...restProps
}: Props) {
  return (
    <div className='relative aspect-[3/4] overflow-hidden'>
      <Image
        alt={alt}
        fill={fill}
        sizes={sizes}
        placeholder={placeholder}
        className={cn('h-auto w-full object-cover object-center', className)}
        {...restProps}
      />
    </div>
  );
}
