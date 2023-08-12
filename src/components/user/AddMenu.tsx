import { MouseEventHandler } from 'react';
import { Dimmed, Portal } from '@/components/shared';
import { cn } from '@/utils/cn';

interface Props {
  isOpen: boolean;
  onClose: MouseEventHandler<HTMLDivElement>;
  onAddFilm: MouseEventHandler<HTMLDivElement>;
  onUploadPhoto: MouseEventHandler<HTMLDivElement>;
}

const menuStyle =
  'tw-w-full tw-cursor-pointer tw-py-[22px] tw-text-blue tw-flex tw-justify-center tw-items-center hover:tw-bg-grayscale-100';

export function AddMenu({ isOpen, onClose, onAddFilm, onUploadPhoto }: Props) {
  if (!isOpen) return null;

  return (
    <Portal>
      <Dimmed onClick={onClose} />
      <div className='tw-fixed tw-left-1/2 tw-top-1/2 tw-z-10 tw-w-[335px] -tw-translate-x-1/2 -tw-translate-y-1/2 tw-overflow-hidden tw-rounded tw-bg-white'>
        <div className={cn(menuStyle, 'tw-border-b')} onClick={onAddFilm}>
          새로운 필름 추가
        </div>
        <div className={menuStyle} onClick={onUploadPhoto}>
          포토컷 올리기
        </div>
      </div>
    </Portal>
  );
}
