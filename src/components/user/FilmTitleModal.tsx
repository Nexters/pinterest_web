import { type ComponentProps, MouseEventHandler, useState } from 'react';
import { Input, Modal } from '@/components/shared';

type Props = Omit<ComponentProps<typeof Modal>, 'title' | 'children'>;

export function FilmTitleModal({ onCancel, ...restProps }: Props) {
  const [input, setInput] = useState('');

  const handleValueChange = (value: string) => {
    setInput(value);
  };

  const handleSave: MouseEventHandler<HTMLButtonElement> = (e) => {
    // TODO: 필름 제목 수정 API 연결
    if (onCancel) onCancel(e);
  };

  return (
    <Modal title='필름 제목 수정' onCancel={onCancel} onSave={handleSave} {...restProps}>
      <Input label='필름 제목' value={input} onValueChange={handleValueChange} />
    </Modal>
  );
}
