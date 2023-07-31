import { useRouter } from 'next/router';
import { Icon } from '@/components/shared';
import { cn } from '@/utils/cn';

const MOCK_DATA = [
  { id: 1, text: '물커밋은 안하기로 약속해줘~~~', author: '내가 누구게', date: '2023.07.21' },
  { id: 2, text: '물커밋은 안하기로 약속해줘~~~', author: '내가 누구게', date: '2023.07.21' },
  { id: 3, text: '물커밋은 안하기로 약속해줘~~~', author: '내가 누구게', date: '2023.07.21' },
  { id: 4, text: '물커밋은 안하기로 약속해줘~~~', author: '내가 누구게', date: '2023.07.21' },
  { id: 5, text: '물커밋은 안하기로 약속해줘~~~', author: '내가 누구게', date: '2023.07.21' },
  { id: 6, text: '물커밋은 안하기로 약속해줘~~~', author: '내가 누구게', date: '2023.07.21' },
  { id: 7, text: '물커밋은 안하기로 약속해줘~~~', author: '내가 누구게', date: '2023.07.21' },
  { id: 8, text: '물커밋은 안하기로 약속해줘~~~', author: '내가 누구게', date: '2023.07.21' },
  { id: 9, text: '물커밋은 안하기로 약속해줘~~~', author: '내가 누구게', date: '2023.07.21' },
  { id: 10, text: '물커밋은 안하기로 약속해줘~~~', author: '내가 누구게', date: '2023.07.21' },
];

export default function GuestBookPage() {
  const router = useRouter();

  return (
    <div className='tw-h-full tw-bg-black tw-pb-[140px]'>
      <div className='tw-flex tw-items-center tw-justify-between tw-px-5 tw-py-4 tw-text-white'>
        <Icon iconType='LeftChevron' color='#FFFFFF' onClick={() => router.back()} />
        <Icon iconType='Plus' color='#FFFFFF' />
      </div>
      <div className='tw-grid tw-grid-cols-2 tw-border-t tw-border-white'>
        {MOCK_DATA.map(({ id, text, author, date }, idx) => {
          return (
            <div
              key={id}
              className={cn('tw-h-[188px] tw-border-b tw-border-white tw-pb-4 tw-pl-5 tw-pr-5 tw-pt-5', {
                'tw-border-r': idx % 2 === 0,
              })}
            >
              <p className='tw-text-body1 tw-h-[108px] tw-text-white'>{text}</p>
              <div className='tw-flex tw-items-center tw-justify-between'>
                <div className='tw-flex tw-flex-col tw-gap-1 tw-text-white'>
                  <span className='tw-text-caption'>{author}</span>
                  <span className='tw-text-caption tw-text-grayscale-400'>{date}</span>
                </div>
                <Icon iconType='Close' className='tw-fill-grayscale-300' />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
