import {
  type ChangeEventHandler,
  type ComponentProps,
  type MouseEventHandler,
  useRef,
  useState,
} from 'react';
import { imagesApis } from '@/query-hooks/useImages';
import { useEditUser } from '@/query-hooks/useUsers';
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

  const { mutate: editProfile } = useEditUser();

  const handleSave: MouseEventHandler<HTMLButtonElement> = (e) => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      editProfile({
        user_id: userId,
        profile_img: image,
        name: nickname,
        text: description,
      });
    }

    onCancel?.(e);
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

  const handleFileUpload: ChangeEventHandler<HTMLInputElement> = async (e) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const { image_url, presigned_url } = await imagesApis.getPresignedUrl(
      file.name,
    );
    await imagesApis.uploadFile(presigned_url, file);
    setImage(image_url);
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
            onChange={handleFileUpload}
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
