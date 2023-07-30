import { ButtonHTMLAttributes, MouseEventHandler, PropsWithChildren } from 'react';
import clsx from 'clsx';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: string;
  onClick: MouseEventHandler<HTMLElement>;
}

const colorMap: { [key: string]: string } = {
  primary: 'tw-text-black tw-text-button1 tw-p-2.5',
  secondary: 'tw-text-grayscale-300 tw-text-button1 tw-p-2.5',
  danger: 'tw-text-danger tw-text-button1 tw-p-2.5',
};

export function TextButton({
  children,
  color = 'primary',
  onClick,
  className,
  ...restProps
}: PropsWithChildren<Props>) {
  return (
    <button className={clsx(className, colorMap[color])} onClick={onClick} {...restProps}>
      {children}
    </button>
  );
}
