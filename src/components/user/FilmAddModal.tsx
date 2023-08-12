import { type ComponentProps, type MouseEventHandler, useState } from 'react';
import { Input, Modal } from '@/components/shared';

type Props = Omit<ComponentProps<typeof Modal>, 'title' | 'children'>;

export function FilmAddModal({ onCancel, ...restProps }: Props) {
  const [input, setInput] = useState('');

  const handleValueChange = (value: string) => {
    setInput(value);
  };

  const handleSave: MouseEventHandler<HTMLButtonElement> = (e) => {
    // TODO: 필름 추가 API 연결
    if (onCancel) onCancel(e);
  };

  return (
    <Modal title='새로운 필름 추가' onCancel={onCancel} onSave={handleSave} {...restProps}>
      <Input label='필름 제목' placeholder='필름 제목을 입력하세요' value={input} onValueChange={handleValueChange} />
    </Modal>
  );
}
