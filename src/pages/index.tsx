import { Icon } from '@/components/shared';

export default function Home() {
  return (
    <main>
      <p className='text-main-headline'>이건 메인 헤드라인이에요 Pretendard</p>
      <p className='text-sub-headline'>이건 서브 헤드라인이에요 Pretendard</p>
      <p className='text-body1'>이건 본문1이에요 Pretendard</p>
      <p className='text-body2'>이건 본문2이에요 Pretendard</p>
      <p className='text-caption'>이건 캡션이에요 Pretendard</p>
      <p className='text-button1'>이건 버튼1이에요 Pretendard</p>
      <p className='text-button2'>이건 버튼2이에요 Pretendard</p>
      <p className='text-accent-eng'>Montserrat accent</p>
      <p className='text-body-eng'>Montserrat body</p>
      <p className='text-caption-eng'>Montserrat caption</p>
      <Icon iconType='Edit' />
      <Icon iconType='Menu' />
      <Icon iconType='Plus' />
      <Icon iconType='RightArrow' />
    </main>
  );
}
