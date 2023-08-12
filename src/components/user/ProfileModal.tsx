import {
  type ChangeEventHandler,
  type ComponentProps,
  type MouseEventHandler,
  useRef,
  useState,
} from 'react';
import { convertImageToBase64 } from '@/utils';
import { Avatar, Icon, Input, Modal } from '@/components/shared';

interface Props
  extends Omit<ComponentProps<typeof Modal>, 'title' | 'children'> {
  profileImage: string;
  nickname: string;
  description: string;
}

export function ProfileModal({
  onCancel,
  profileImage,
  nickname: nicknameFromProps,
  description: descriptionFromProps,
  ...restProps
}: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState(profileImage);
  const [nickname, setNickname] = useState(nicknameFromProps);
  const [description, setDescription] = useState(descriptionFromProps);

  console.log(nicknameFromProps, descriptionFromProps);

  const handleSave: MouseEventHandler<HTMLButtonElement> = (e) => {
    // TODO: API 연결
    if (onCancel) onCancel(e);
  };

  const handleNicknameChange = (value: string) => {
    setNickname(value);
  };

  const handleDescriptionChange = (value: string) => {
    setDescription(value);
  };

  const handleEditPhoto: MouseEventHandler<HTMLDivElement> = () => {
    fileInputRef.current?.click();
  };

  const onChangeFile: ChangeEventHandler<HTMLInputElement> = async (e) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    try {
      const converted = await convertImageToBase64(file);
      if (typeof converted === 'string') setImage(converted);
    } catch (err) {
      console.error(err);
    }

    // TODO: API 연결
  };

  return (
    <Modal
      title='프로필 수정'
      onCancel={onCancel}
      onSave={handleSave}
      {...restProps}
    >
      <div className='tw-flex tw-w-full tw-flex-col tw-items-center'>
        <div className='tw-relative' onClick={handleEditPhoto}>
          <Avatar src={image} nickname={nickname} description={description} />
          <div className='tw-absolute -tw-bottom-2 -tw-right-2 tw-flex tw-h-7 tw-w-7 tw-cursor-pointer tw-items-center tw-justify-center tw-rounded-full tw-bg-grayscale-100'>
            <Icon iconType='Camera' />
          </div>
        </div>
        <form className='tw-flex tw-w-full tw-flex-col tw-items-center tw-gap-5'>
          <input
            ref={fileInputRef}
            type='file'
            accept='image/*'
            id='file'
            hidden
            onChange={onChangeFile}
          />
          <Input
            label='이름'
            placeholder='이름을 입력해주세요'
            value={nickname}
            maxLength={15}
            onValueChange={handleNicknameChange}
          />
          <Input
            label='한줄 소개'
            placeholder='한줄 소개를 작성해주세요'
            value={description}
            maxLength={22}
            className='tw-mb-12'
            onValueChange={handleDescriptionChange}
          />
        </form>
      </div>
    </Modal>
  );
}
