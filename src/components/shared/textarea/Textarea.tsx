import type { ChangeEventHandler, InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { forwardRef, useId } from 'react';
import { useControllableState } from '@/hooks';
import { cn } from '@/utils/cn';

const TEXTAREA_LINES = 4;

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  value?: string;
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
      <div className='flex flex-col text-black'>
        {label && (
          <label htmlFor={idFromProps ?? id} className='text-accent-eng mb-3'>
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={idFromProps ?? id}
          value={value}
          maxLength={maxLength}
          onChange={handleInputChange}
          rows={TEXTAREA_LINES}
          className={cn(
            'text-body2 w-full resize-none rounded border border-transparent bg-grayscale-100 px-2.5 py-2 outline-none placeholder:text-grayscale-300 focus:border-grayscale-300 active:border-grayscale-300',
            { 'border-grayscale-300': value.length > 0 },
            className,
          )}
          {...restProps}
        />
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
