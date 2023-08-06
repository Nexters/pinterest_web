import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '@/utils/cn';

type ButtonType = 'button1' | 'button2' | 'button3' | 'button4';
type VariantType = 'primary' | 'secondary' | 'nudge' | 'link' | 'rounded';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: VariantType;
  disabled?: boolean;
}

// NOTE : buttonMap, variantMap tailwind-config에 뺄 것
const buttonMap: Record<ButtonType, string> = {
  button1: 'tw-flex tw-items-center tw-rounded tw-text-button1 tw-px-10 tw-py-3.5',
  button2: 'tw-flex tw-items-center tw-rounded tw-text-button2 tw-px-2 tw-py-1.5',
  button3: 'tw-flex tw-justify-between tw-items-center tw-px-5 tw-py-2',
  // NOTE : 그림자 효과가 있는 것 같은데 시안 상에서 자세히 확인되지 않으므로 물어보고 반영 예정
  button4: 'tw-flex tw-justify-center tw-items-center tw-rounded-full tw-w-[4.5rem] tw-h-[4.5rem]',
};

const variantMap: Record<VariantType, string> = {
  primary: 'tw-bg-grayscale-700 tw-text-white',
  secondary: 'tw-bg-grayscale-200 tw-text-primary',
  nudge: 'tw-bg-nudge tw-text-grayscale-500',
  link: 'tw-bg-black tw-text-white',
  rounded: 'tw-bg-black tw-text-white tw-text-accent-eng',
};

const variantType: Record<VariantType, ButtonType> = {
  primary: 'button1',
  secondary: 'button1',
  nudge: 'button2',
  link: 'button3',
  rounded: 'button4',
};

export function Button({ children, variant = 'primary', disabled, className, ...restProps }: PropsWithChildren<Props>) {
  const button = buttonMap[variantType[variant]];
  const buttonVariant = variantMap[variant];

  return (
    <button
      className={cn(
        button,
        { [buttonVariant]: disabled ? false : true },
        { 'tw-bg-grayscale-300 tw-text-white': disabled ? true : false },
        className,
      )}
      disabled={disabled}
      {...restProps}
    >
      {children}
    </button>
  );
}
