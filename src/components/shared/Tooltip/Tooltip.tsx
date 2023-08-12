import { type HTMLAttributes, type MouseEventHandler, type PropsWithChildren, useState } from 'react';
import { Icon } from '@/components/shared/Icon';

interface Props extends HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean;
  text: string;
}

export function Tooltip({ children, isOpen: isOpenFromProps = true, text, ...restProps }: PropsWithChildren<Props>) {
  const [isOpen, setIsOpen] = useState(isOpenFromProps);

  const handleClickClose: MouseEventHandler<SVGSVGElement> = () => {
    setIsOpen(false);
  };

  return (
    <div className='tw-relative' {...restProps}>
      {children}
      {isOpen && (
        <div className='tw-text-body2-accent tw-absolute tw-right-full tw-top-1/2 tw-flex tw-w-[200px] -tw-translate-x-1 -tw-translate-y-1/2 tw-items-center tw-justify-between tw-gap-1 tw-rounded tw-bg-nudge tw-px-2 tw-py-1 after:tw-absolute after:tw-right-0 after:tw-h-2.5 after:tw-w-2.5 after:tw-translate-x-1/2 after:tw-rotate-45 after:tw-bg-nudge after:tw-content-[""]'>
          <p className='tw-shrink-0'>{text}</p>
          <Icon iconType='Close' className='tw-cursor-pointer tw-fill-grayscale-700' onClick={handleClickClose} />
        </div>
      )}
    </div>
  );
}
