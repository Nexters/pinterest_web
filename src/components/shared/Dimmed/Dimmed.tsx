import type { HTMLAttributes, PropsWithChildren } from 'react';

type Props = HTMLAttributes<HTMLDivElement>;

export function Dimmed({ children, ...props }: PropsWithChildren<Props>) {
  return (
    <div
      className='tw-fixed tw-left-0 tw-top-0 tw-z-10 tw-h-full tw-w-full tw-bg-black tw-opacity-60'
      {...props}
    >
      {children}
    </div>
  );
}
