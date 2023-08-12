import { useRouter } from 'next/router';
import { type ComponentProps, type MouseEventHandler, useState } from 'react';
import { Modal, Select } from '@/components/shared';

type Props = Omit<ComponentProps<typeof Modal>, 'title' | 'children'>;

export function FilmSelectModal({ onCancel, ...restProps }: Props) {
  const [selected, setSelected] = useState('좋아하는 디자이너');
  const router = useRouter();

  const handleSelect = (value: string) => {
    setSelected(value);
  };

  const handleSave: MouseEventHandler<HTMLButtonElement> = () => {
    // TODO: 실제 유저아이디로 변경
    router.push({
      pathname: '/user/1/item/add',
      query: {
        title: selected,
      },
    });
  };

  return (
    <Modal title='필름 제목 수정' onCancel={onCancel} onSave={handleSave} {...restProps}>
      <Select selected={selected} onSelect={handleSelect}>
        <Select.Item>좋아하는 디자이너</Select.Item>
        <Select.Item>위시템</Select.Item>
        <Select.Item>자주 가는 카페</Select.Item>
      </Select>
    </Modal>
  );
}
