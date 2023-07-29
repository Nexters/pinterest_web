import type { MouseEventHandler, PropsWithChildren } from 'react';
import { Dimmed, Portal } from '@/components/shared';

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
      <Dimmed onClick={onCancel} />
      <div className='tw-translate tw-fixed tw-left-1/2 tw-top-1/2 tw-flex tw-h-[432px] tw-w-[336px] tw--translate-x-1/2 tw--translate-y-1/2 tw-flex-col tw-items-center tw-rounded tw-bg-white tw-px-5 tw-pb-6 tw-shadow-lg'>
        <div className='tw-text-main-headline tw-h-[88px] tw-pb-[30px] tw-pt-[38px]'>
          <h2>{title}</h2>
        </div>
        <div className='tw-flex tw-w-full tw-flex-1 tw-flex-col tw-gap-6'>{children}</div>
        <div className='tw-gap tw-flex tw-w-full tw-items-center tw-gap-3'>
          {/* TODO: button 컴포넌트 완성되면 붙이기 */}
          <button
            className='tw-text-button1 tw-flex-1 tw-rounded tw-bg-grayscale-200 tw-py-[14px] tw-text-grayscale-600'
            onClick={onCancel}
          >
            취소
          </button>
          <button
            className='tw-text-button1 tw-flex-1 tw-rounded tw-bg-grayscale-600 tw-py-[14px] tw-text-grayscale-200'
            onClick={onSave}
          >
            저장
          </button>
        </div>
      </div>
    </Portal>
  );
}
