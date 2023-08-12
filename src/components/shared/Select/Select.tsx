import type { MouseEventHandler, PropsWithChildren } from 'react';
import { createContext, useState } from 'react';
import { useSafeContext } from '@/hooks';
import { Icon } from '@/components/shared/Icon';
import { cn } from '@/utils/cn';

interface SelectProps {
  isExpanded?: boolean;
  selected: string;
  onSelect: (option: string) => void;
}

interface SelectItemProps {
  children: string;
}

interface SelectContextType {
  selected: string;
  closeSelect: () => void;
  onSelect: (option: string) => void;
}
const SelectContext = createContext<SelectContextType | null>(null);

export function Select({
  children,
  isExpanded: isExpandedFromProps = false,
  selected,
  onSelect,
}: PropsWithChildren<SelectProps>) {
  const [isExpanded, setIsExpanded] = useState(isExpandedFromProps);

  const handleToggleSelect: MouseEventHandler<SVGSVGElement> = () => {
    setIsExpanded((prev) => !prev);
  };

  const closeSelect = () => {
    setIsExpanded(false);
  };

  return (
    <div className='rounded tw-flex tw-w-full tw-flex-col tw-overflow-hidden tw-border tw-border-grayscale-300'>
      <div className='tw-flex tw-h-12 tw-w-full tw-items-center tw-justify-between tw-pl-2.5 tw-pr-3'>
        <span className='tw-text-body2-accent tw-text-grayscale-700'>{selected}</span>
        <Icon
          iconType='ArrowDown'
          className={cn('tw-top-1/2 tw-cursor-pointer', isExpanded && '-tw-rotate-180')}
          onClick={handleToggleSelect}
        />
      </div>
      <div className={cn('tw-h-0 tw-w-full', isExpanded && 'tw-h-fit')}>
        <ul className='tw-w-full'>
          <SelectContext.Provider value={{ selected, closeSelect, onSelect }}>{children}</SelectContext.Provider>
        </ul>
      </div>
    </div>
  );
}

function SelectItem({ children }: SelectItemProps) {
  const { selected, closeSelect, onSelect } = useSafeContext(SelectContext);

  const handleSelect =
    (option: string): MouseEventHandler<HTMLLIElement> =>
    () => {
      onSelect(option);
      closeSelect();
    };

  return (
    <li
      className={cn(
        'tw-flex-justify-between tw-text-body2 tw-flex tw-h-12 tw-w-full tw-items-center tw-border-t tw-border-grayscale-300 tw-bg-grayscale-100 tw-p-2.5 tw-text-grayscale-400',
        selected === children && 'tw-hidden',
      )}
      onClick={handleSelect(children)}
    >
      {children}
    </li>
  );
}

Select.Item = SelectItem;
