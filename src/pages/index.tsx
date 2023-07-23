import { Icon } from '@/components/shared';
import { Button } from '@/components/shared/Button';
import { TextButton } from '@/components/shared/TextButton';

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
      <Button color="primary" onClick={()=>console.log('primary')}>
        Primary
      </Button>
      <Button color="secondary" onClick={()=>console.log('secondary')} disabled>
        Secondary
      </Button>
      <Button color="nudge" onClick={()=>console.log('nudge')}>
        그라피 알아보기
        <Icon iconType="RightChevron"/>
      </Button>
      <Button color="link" onClick={()=>console.log('link')} className="w-[20rem]">
        Link
        <Icon iconType="RightArrow" color="none"/>
      </Button>
      <Button color="rounded" onClick={()=>console.log('rounded')}>ADD</Button>
      <TextButton color="primary" onClick={()=>console.log('textbutton1')}>저장</TextButton>
      <TextButton color="secondary" onClick={()=>console.log('textbutton2')}>저장</TextButton>
    </main>
  );
}
