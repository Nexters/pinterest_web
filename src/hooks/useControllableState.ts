import { useCallback, useState } from 'react';

interface Props<T> {
  defaultState: T;
  state?: T;
  onChange?: (value: T) => void;
}

export function useControllableState<T>({
  defaultState,
  state: valueFromProps,
  onChange,
}: Props<T>) {
  const [uncontrolledValue, setUncontrolledValue] = useState<T>(defaultState);

  const isControlled = valueFromProps !== undefined;
  const value = isControlled ? valueFromProps : uncontrolledValue;

  const onValueChange = useCallback(
    (nextState: T) => {
      // 비제어 컴포넌트일 때만 내부 상태 변경
      if (!isControlled) {
        setUncontrolledValue(nextState);
      }
      onChange?.(nextState);
    },
    [isControlled, onChange],
  );

  return [value, onValueChange] as const;
}
