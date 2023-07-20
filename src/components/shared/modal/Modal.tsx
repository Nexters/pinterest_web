import type { MouseEventHandler, PropsWithChildren } from 'react';
import { Portal } from '@/components/shared';

interface Props {
  isOpen?: boolean;
  title: string;
  onCancel?: MouseEventHandler<HTMLElement>;
  onSave?: MouseEventHandler<HTMLButtonElement>;
}

export function Modal({ children, isOpen, title, onCancel, onSave }: PropsWithChildren<Props>) {
  if (!isOpen) return null;

  return (
    <Portal>
      <div className='fixed left-0 top-0 h-full w-full bg-black opacity-60' onClick={onCancel} />
      <div className='translate fixed left-1/2 top-1/2 flex h-[432px] w-[336px] -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded bg-white px-5 pb-6 shadow-lg'>
        <div className='text-main-headline h-[88px] pb-[30px] pt-[38px]'>
          <h2>{title}</h2>
        </div>
        <div className='flex w-full flex-1 flex-col gap-6'>{children}</div>
        <div className='gap flex w-full items-center gap-3'>
          {/* TODO: button 컴포넌트 완성되면 붙이기 */}
          <button
            className='text-button1 flex-1 rounded bg-grayscale-200 py-[14px] text-grayscale-600'
            onClick={onCancel}
          >
            취소
          </button>
          <button
            className='text-button1 flex-1 rounded bg-grayscale-600 py-[14px] text-grayscale-200'
            onClick={onSave}
          >
            저장
          </button>
        </div>
      </div>
    </Portal>
  );
}
