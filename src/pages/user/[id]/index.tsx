import { Avatar, Button, Icon } from '@/components/shared';
import { Drawer } from '@/components/shared/Drawer';
import { CameraRoll } from '@/components/user/CameraRoll';
import { useDrawer } from '@/hooks/useDrawer';

export default function User() {
  const { isDrawerOpen, openDrawer, closeDrawer } = useDrawer();

  return (
    <div className='relative overflow-x-hidden pb-10 pt-3'>
      <Avatar src='/images/profile.png' nickname='Jichoi' displayMeta className='mx-5' />
      {/* {TODO: 방명록 기능 추가할 때 변경} */}
      <div className='mx-5 mb-5 mt-3 bg-grayscale-700 px-3.5 py-1.5 text-white'>방명록 기능이 추가될 공간입니다 ㅎ</div>
      <div className='flex flex-col gap-4'>
        <CameraRoll title='고양이짤들' />
        <CameraRoll title='최근에 간 카페' />
        <CameraRoll title='고양이짤들' />
      </div>
      <Button variant='rounded' className='fixed bottom-5 right-5'>
        ADD
      </Button>
      <Icon
        iconType='Menu'
        onClick={openDrawer}
        className='absolute right-3.5 top-2.5 cursor-pointer'
        width={32}
        height={32}
      />
      <Drawer isOpen={isDrawerOpen} onClose={closeDrawer} />
    </div>
  );
}
