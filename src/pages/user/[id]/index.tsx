import { Avatar, Button, Icon } from '@/components/shared';
import { Drawer } from '@/components/shared/Drawer';
import { CameraRoll } from '@/components/user/CameraRoll';
import { useToggle } from '@/hooks/useToggle';

export default function User() {
  const { status: isDrawerOpen, setOn: openDrawer, setOff: closeDrawer } = useToggle();

  return (
    <div className='tw-relative tw-overflow-x-hidden tw-pb-10 tw-pt-3'>
      <Avatar src='/images/profile.png' nickname='Jichoi' displayMeta className='tw-mx-5' />
      {/* {TODO: 방명록 기능 추가할 때 변경} */}
      <div className='tw-mx-5 tw-mb-5 tw-mt-3 tw-bg-grayscale-700 tw-px-3.5 tw-py-1.5 tw-text-white'>
        방명록 기능이 추가될 공간입니다 ㅎ
      </div>
      <div className='tw-flex tw-flex-col tw-gap-4'>
        <CameraRoll title='고양이짤들' />
        <CameraRoll title='최근에 간 카페' />
        <CameraRoll title='고양이짤들' />
      </div>
      <Button variant='rounded' className='tw-fixed tw-bottom-5 tw-right-5'>
        ADD
      </Button>
      <Icon
        iconType='Menu'
        onClick={openDrawer}
        className='tw-absolute tw-right-3.5 tw-top-2.5 tw-cursor-pointer'
        width={32}
        height={32}
      />
      <Drawer isOpen={isDrawerOpen} onClose={closeDrawer} />
    </div>
  );
}
