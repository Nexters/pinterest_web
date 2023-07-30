import type { ChangeEventHandler, TextareaHTMLAttributes } from 'react';
import { forwardRef, useId } from 'react';
import { useControllableState } from '@/hooks';
import { cn } from '@/utils/cn';

const TEXTAREA_LINES = 4;

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  value?: string;
  caption?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

/**
 * value를 전달하지 않으면 내부에서 상태가 관리됩니다.
 * @example
 * ```tsx
 * <Textarea label='Label' placeholder='placeholder text' maxLength={10} />
 * ```
 * value를 전달하여 외부에서 상태를 제어할 수 있습니다.
 * @example
 * ```tsx
 * const [value, setValue] = useState('');
 * return <Textarea label='Label' placeholder='placeholder text' maxLength={10} value={value} onValueChange={(value) => setValue(value)} />
 * ```
 */
export const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  (
    {
      id: idFromProps,
      label,
      value: valueFromProps,
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

    const handleInputChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
      if (maxLength && e.target.value.length > maxLength) {
        return;
      }
      setValue(e.target.value);
    };

    return (
      <div className='tw-flex tw-flex-col tw-text-black'>
        {label && (
          <div className='tw-mb-3 tw-flex tw-w-full tw-items-center'>
            <label htmlFor={idFromProps ?? id} className='tw-text-accent-eng'>
              {label}
            </label>
            {maxLength && (
              <span className='tw-text-body2 tw-ml-auto tw-text-grayscale-400'>
                {value.length}/{maxLength}
              </span>
            )}
          </div>
        )}
        <textarea
          ref={ref}
          id={idFromProps ?? id}
          value={value}
          maxLength={maxLength}
          onChange={handleInputChange}
          rows={TEXTAREA_LINES}
          className={cn(
            'tw-text-body2 tw-h-[100px] tw-w-full tw-resize-none tw-overflow-scroll tw-rounded tw-border tw-border-transparent tw-bg-grayscale-100 tw-px-2.5 tw-py-2 tw-outline-none tw-scrollbar-hide placeholder:tw-text-grayscale-300 focus:tw-border-grayscale-300 active:tw-border-grayscale-300',
            className,
          )}
          {...restProps}
        />
        <p className='tw-text-caption tw-mt-1 tw-text-grayscale-400'>{caption}</p>
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
