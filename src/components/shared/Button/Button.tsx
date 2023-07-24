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
  button1: 'flex items-center rounded text-button1 px-10 py-3.5',
  button2: 'flex items-center rounded text-button2 px-2 py-1.5',
  button3: 'flex justify-between items-center px-5 py-2',
  // NOTE : 그림자 효과가 있는 것 같은데 시안 상에서 자세히 확인되지 않으므로 물어보고 반영 예정
  button4: 'flex justify-center items-center rounded-full w-[4.5rem] h-[4.5rem]',
};

const variantMap: Record<VariantType, string> = {
  primary: 'bg-grayscale-700 text-white',
  secondary: 'bg-grayscale-200 text-primary',
  nudge: 'bg-nudge text-grayscale-500',
  link: 'bg-black text-white',
  rounded: 'bg-black text-white text-accent-eng',
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
        className,
        button,
        { [buttonVariant]: disabled ? false : true },
        { 'bg-grayscale-300 text-white': disabled ? true : false },
      )}
      disabled={disabled}
      {...restProps}
    >
      {children}
    </button>
  );
}
