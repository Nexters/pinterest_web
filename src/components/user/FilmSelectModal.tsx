import { useRouter } from 'next/router';
import { type ComponentProps, type MouseEventHandler, useState } from 'react';
import { Modal, Select } from '@/components/shared';
import { FilmsResponse } from '@/types/response';

export interface SelectedFilm {
  title: string;
  filmId: number;
}

interface Props
  extends Omit<ComponentProps<typeof Modal>, 'title' | 'children'> {
  userId: string;
  filmList: FilmsResponse[];
}

export function FilmSelectModal({
  userId,
  filmList,
  onCancel,
  ...restProps
}: Props) {
  const [selected, setSelected] = useState<SelectedFilm>({
    title: filmList[0].title,
    filmId: filmList[0].film_id,
  });
  const router = useRouter();

  const handleSelect = ({ title, filmId }: SelectedFilm) => {
    setSelected({ title, filmId });
  };

  const handleSave: MouseEventHandler<HTMLButtonElement> = () => {
    router.push(`/user/${userId}/${selected.filmId}/item/add`);
  };

  return (
    <Modal
      title='필름 선택'
      onCancel={onCancel}
      onSave={handleSave}
      {...restProps}
    >
      <Select selected={selected.title} onSelect={handleSelect}>
        {filmList.map(({ film_id, title }) => (
          <Select.Item key={film_id} filmId={film_id}>
            {title}
          </Select.Item>
        ))}
      </Select>
    </Modal>
  );
}
