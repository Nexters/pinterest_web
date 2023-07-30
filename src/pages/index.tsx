import { Icon } from '@/components/shared';
import { Button } from '@/components/shared/Button';
import { TextButton } from '@/components/shared/TextButton';

// NOTE : 온보딩 페이지
export default function Home() {
  return (
    <main>
      <p className='tw-text-main-headline'>이건 메인 헤드라인이에요 Pretendard</p>
      <p className='tw-text-sub-headline'>이건 서브 헤드라인이에요 Pretendard</p>
      <p className='tw-text-body1'>이건 본문1이에요 Pretendard</p>
      <p className='tw-text-body2'>이건 본문2이에요 Pretendard</p>
      <p className='tw-text-caption'>이건 캡션이에요 Pretendard</p>
      <p className='tw-text-button1'>이건 버튼1이에요 Pretendard</p>
      <p className='tw-text-button2'>이건 버튼2이에요 Pretendard</p>
      <p className='tw-text-accent-eng'>Montserrat accent</p>
      <p className='tw-text-body-eng'>Montserrat body</p>
      <p className='tw-text-caption-eng'>Montserrat caption</p>
      <Icon iconType='Edit' />
      <Icon iconType='Menu' />
      <Icon iconType='Plus' />
      <Icon iconType='RightArrow' />
      <Button variant='primary' onClick={() => console.log('primary')}>
        Primary
      </Button>
      <Button variant='secondary' onClick={() => console.log('secondary')} disabled>
        Secondary
      </Button>
      <Button variant='nudge' onClick={() => console.log('nudge')}>
        그라피 알아보기
        <Icon iconType='RightChevron' />
      </Button>
      <Button variant='link' onClick={() => console.log('link')} className='tw-w-[20rem]'>
        Link
        <Icon iconType='RightArrow' />
      </Button>
      <Button variant='rounded' onClick={() => console.log('rounded')}>
        ADD
      </Button>
      <TextButton color='primary' onClick={() => console.log('textbutton1')}>
        저장
      </TextButton>
      <TextButton color='secondary' onClick={() => console.log('textbutton2')}>
        저장
      </TextButton>
    </main>
  );
}
