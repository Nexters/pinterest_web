import type { HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLDivElement>;

export function Dimmed(props: Props) {
  return (
    <div
      className='tw-fixed tw-left-0 tw-top-0 tw-h-full tw-w-full tw-bg-black tw-opacity-60'
      {...props}
    />
  );
}
