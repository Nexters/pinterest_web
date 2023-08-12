import { useRouter } from 'next/router';
import { type ComponentProps, type MouseEventHandler, useState } from 'react';
import { useCreateFilms } from '@/query-hooks/useFilms';
import { Input, Modal } from '@/components/shared';

type Props = Omit<ComponentProps<typeof Modal>, 'title' | 'children'>;

export function FilmAddModal({ onCancel, ...restProps }: Props) {
  const router = useRouter();
  const { mutate: createFilms } = useCreateFilms();
  const [input, setInput] = useState('');

  const handleValueChange = (value: string) => {
    setInput(value);
  };

  const handleSave: MouseEventHandler<HTMLButtonElement> = (e) => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      router.push('/signin');
      return;
    }

    createFilms({ title: input, userId });

    if (onCancel) onCancel(e);
  };

  return (
    <Modal
      title='새로운 필름 추가'
      onCancel={onCancel}
      onSave={handleSave}
      {...restProps}
    >
      <Input
        label='필름 제목'
        placeholder='필름 제목을 입력하세요'
        value={input}
        onValueChange={handleValueChange}
      />
    </Modal>
  );
}
