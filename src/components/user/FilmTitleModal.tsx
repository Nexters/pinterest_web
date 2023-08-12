import { type ComponentProps, type MouseEventHandler, useState } from 'react';
import { useEditFilms } from '@/query-hooks/useFilms';
import { Input, Modal } from '@/components/shared';

interface Props extends Omit<ComponentProps<typeof Modal>, 'children'> {
  filmId: number;
}

export function FilmTitleModal({
  isOpen,
  filmId,
  title,
  onCancel,
  ...restProps
}: Props) {
  const { mutate: editFilms } = useEditFilms();
  const [input, setInput] = useState(title);

  const handleValueChange = (value: string) => {
    setInput(value);
  };

  const handleSave: MouseEventHandler<HTMLButtonElement> = (e) => {
    editFilms({ title: input, filmId });
    if (onCancel) onCancel(e);
  };

  return (
    <Modal
      isOpen={isOpen}
      title='필름 제목 수정'
      onCancel={onCancel}
      onSave={handleSave}
      {...restProps}
    >
      <Input
        label='필름 제목'
        value={input}
        onValueChange={handleValueChange}
      />
    </Modal>
  );
}
