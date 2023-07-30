import type { ChangeEventHandler, InputHTMLAttributes } from 'react';
import { forwardRef, useId } from 'react';
import { useControllableState } from '@/hooks';
import { cn } from '@/utils/cn';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  value?: string;
  captionPosition?: 'top' | 'bottom';
  caption?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

/**
 * value를 전달하지 않으면 내부에서 상태가 관리됩니다.
 * @example
 * ```tsx
 * <Input label='Label' placeholder='placeholder text' maxLength={10} />
 * ```
 * value를 전달하여 외부에서 상태를 제어할 수 있습니다.
 * @example
 * ```tsx
 * const [value, setValue] = useState('');
 * return <Input label='Label' placeholder='placeholder text' maxLength={10} value={value} onValueChange={(value) => setValue(value)} />
 * ```
 */
export const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      id: idFromProps,
      label,
      value: valueFromProps,
      captionPosition = 'bottom',
      caption,
      defaultValue = '',
      maxLength,
      onValueChange,
      className,
      ...restProps
    },
    ref,
  ) => {
    const [value, setValue] = useControllableState({
      state: valueFromProps,
      defaultState: defaultValue,
      onChange: onValueChange,
    });
    const id = useId();

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      if (maxLength && e.target.value.length > maxLength) {
        return;
      }
      setValue(e.target.value);
    };

    return (
      <div className='tw-flex tw-flex-col tw-text-black'>
        {label && (
          <div className='tw-mb-3 tw-flex tw-w-full tw-items-center'>
            <label htmlFor={idFromProps ?? id} className='tw-flex tw-items-center tw-gap-2.5'>
              <h1 className='tw-text-accent-eng'>{label}</h1>
              {caption && captionPosition === 'top' && (
                <p className='tw-text-caption tw-text-grayscale-400'>{caption}</p>
              )}
            </label>
            {maxLength && (
              <span className='tw-text-body2 tw-ml-auto tw-text-grayscale-400'>
                {value.length}/{maxLength}
              </span>
            )}
          </div>
        )}
        <input
          ref={ref}
          id={idFromProps ?? id}
          value={value}
          maxLength={maxLength}
          onChange={handleInputChange}
          className={cn(
            'tw-text-body2 tw-w-full tw-rounded tw-border tw-border-transparent tw-bg-grayscale-100 tw-px-2.5 tw-py-2 tw-outline-none placeholder:tw-text-grayscale-300 focus:tw-border-grayscale-300 active:tw-border-grayscale-300',
            className,
          )}
          {...restProps}
        />
        {caption && captionPosition === 'bottom' && (
          <p className='tw-text-caption tw-mt-1 tw-text-grayscale-400'>{caption}</p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
