import Image from 'next/image';
import type { ComponentProps, MouseEventHandler } from 'react';
import clsx from 'clsx';
import { Icon } from '@/components/shared/Icon';
import { cn } from '@/utils/cn';

const PLACEHOLDER_SRC = '/images/avatar-placeholder.png';
const HINT_TEXT = '한줄소개를 작성해주세요';

interface AvatarProps {
  nickname: string;
  src?: string;
  displayMeta?: boolean;
  description?: string;
  viewCount?: number;
  isLogin?: boolean;
  onEditProfile?: () => void;
}

type Props = AvatarProps &
  Omit<ComponentProps<typeof Image>, keyof AvatarProps | 'alt'>;

export function Avatar({
  src = PLACEHOLDER_SRC,
  nickname,
  displayMeta = false,
  description = '',
  viewCount = 0,
  isLogin = false,
  className,
  onEditProfile,
  ...restProps
}: Props) {
  const handleEditProfile: MouseEventHandler<HTMLElement> = () => {
    if (!isLogin) return;

    if (onEditProfile) onEditProfile();
  };

  return (
    <div
      className={cn(
        'tw-flex tw-items-center tw-gap-5 tw-text-primary',
        className,
      )}
    >
      <div
        className={cn(
          'tw-relative tw-h-20 tw-w-20 tw-overflow-hidden tw-rounded-full',
          // isLogin && 'tw-cursor-pointer',
        )}
        onClick={handleEditProfile}
      >
        <Image
          src={src}
          alt={nickname}
          fill
          className='tw-object-contain tw-object-center'
          {...restProps}
        />
      </div>
      {displayMeta && (
        <div className='tw-flex tw-flex-col tw-gap-3'>
          <div className='tw-flex tw-items-center tw-gap-2.5'>
            <div
              className={cn(
                'tw-flex tw-items-center tw-gap-0.5',
                isLogin && 'tw-cursor-pointer',
              )}
              onClick={handleEditProfile}
            >
              <strong className='tw-text-accent-eng'>{nickname}</strong>
              {isLogin && (
                <Icon iconType='RightChevron' width={18} height={18} />
              )}
            </div>
            <span className='tw-text-caption-eng tw-text-grayscale-500'>{`Total ${viewCount}`}</span>
          </div>
          <p
            className={clsx(
              'tw-text-body2-accent',
              !description && 'tw-text-grayscale-300',
              isLogin && 'tw-cursor-pointer',
            )}
            onClick={handleEditProfile}
          >
            {description.length === 0 && HINT_TEXT}
          </p>
        </div>
      )}
    </div>
  );
}
