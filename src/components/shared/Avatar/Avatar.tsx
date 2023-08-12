import Image from 'next/image';
import type { ComponentProps, MouseEventHandler } from 'react';
import { Profile } from '@/pages/user/[id]';
import clsx from 'clsx';
import { cn } from '@/utils/cn';

const PLACEHOLDER_SRC = '/images/avatar-placeholder.png';
const HINT_TEXT = '한줄소개를 작성해주세요';

interface AvatarProps {
  nickname: string;
  src?: string;
  displayMeta?: boolean;
  description?: string;
  viewCount?: number;
  onEditProfile?: (info: Profile) => void;
}

type Props = AvatarProps &
  Omit<ComponentProps<typeof Image>, keyof AvatarProps | 'alt'>;

export function Avatar({
  src = PLACEHOLDER_SRC,
  nickname,
  displayMeta = false,
  description = '',
  viewCount = 0,
  className,
  onEditProfile,
  ...restProps
}: Props) {
  const handleEditProfile: MouseEventHandler<HTMLElement> = () => {
    if (onEditProfile) onEditProfile({ profileImage: src, nickname, description });
  };

  return (
    <div
      className={cn(
        'tw-flex tw-items-center tw-gap-5 tw-text-primary',
        className,
      )}
    >
      <div
        className='tw-relative tw-h-20 tw-w-20 tw-cursor-pointer tw-overflow-hidden tw-rounded-full'
        onClick={handleEditProfile}
      >
        <Image src={src} alt={nickname} fill className='tw-object-contain tw-object-center' {...restProps} />
      </div>
      {displayMeta && (
        <div className='tw-flex tw-flex-col tw-gap-3'>
          <div className='tw-flex tw-items-center tw-gap-2.5' onClick={handleEditProfile}>
            <strong className='tw-text-accent-eng'>{nickname}</strong>
            <span className='tw-text-caption-eng tw-text-grayscale-500'>{`Total ${viewCount}`}</span>
          </div>
          <p
            className={clsx('tw-text-body2-accent', !description && 'tw-text-grayscale-300')}
            onClick={handleEditProfile}
          >
            {description.length === 0 && HINT_TEXT}
          </p>
        </div>
      )}
    </div>
  );
}
