import { useEffect, useState } from 'react';
import { Icon } from '@/components/shared';

interface GuestBookBannerProps {
  visitLogs?: VisitLog[];
  ownerName: string;
  isLogin: boolean;
  onClick: () => void;
}

interface VisitLog {
  name: string;
  text: string;
  log_id: number;
  created_at: string;
  user_id: string;
}

const Log = ({ text, name }: Pick<VisitLog, 'name' | 'text'>) => {
  return (
    <div className='tw-relative tw-flex tw-h-9 tw-w-full tw-items-center tw-justify-between tw-gap-1 tw-py-1.5'>
      <div className='tw-flex tw-flex-1 tw-items-center tw-gap-2 tw-overflow-hidden'>
        <Icon iconType='GuestBook' className='tw-flex-shrink-0' />
        <p className='tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap'>
          {text}
        </p>
      </div>
      <span className='tw-flex-shrink-0 tw-text-grayscale-300'>{`-  ${name}`}</span>
    </div>
  );
};

export const GuestBookBanner = ({
  visitLogs,
  ownerName,
  isLogin,
  onClick,
}: GuestBookBannerProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const translateY = -activeIndex * 36;

  useEffect(() => {
    if (visitLogs && isTransitioning) {
      const id = setTimeout(() => {
        setIsTransitioning(false);
        if (activeIndex === visitLogs.length) {
          setActiveIndex(0);
        }
      }, 300);

      return () => clearTimeout(id);
    }
  }, [activeIndex, isTransitioning, visitLogs]);

  const nextItem = () => {
    setIsTransitioning(true);
    if (visitLogs && visitLogs.length) {
      setActiveIndex((prevIndex) => (prevIndex + 1) % (visitLogs.length + 1));
    }
  };

  useEffect(() => {
    const id = setInterval(() => {
      nextItem();
    }, 2500);

    return () => clearInterval(id);
  }, []);

  if (!visitLogs || !visitLogs.length) {
    return (
      <div
        onClick={onClick}
        className='tw-mx-5 tw-mb-5 tw-mt-3 tw-cursor-pointer tw-bg-grayscale-700 tw-px-3.5 tw-py-1.5 tw-text-white'
      >
        {isLogin ? (
          <div className='tw-flex tw-flex-row tw-gap-2'>
            <Icon iconType='GuestBook' />
            <p className='tw-text-grayscale-300'>
              아직 작성된 방명록이 없습니다
            </p>
          </div>
        ) : (
          <>
            <div className='tw-flex tw-flex-row tw-gap-2'>
              <Icon iconType='GuestBook' />
              <p>{`${ownerName}님께 방명록을 남겨주세요`}</p>
            </div>
            <button className='tw-text-grayscale-300'>작성하기</button>
          </>
        )}
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className='tw-mx-5 tw-mb-5 tw-mt-3 tw-h-9 tw-cursor-pointer tw-overflow-hidden tw-bg-grayscale-700 tw-px-3.5 tw-text-white'
    >
      <div
        className={`${
          isTransitioning
            ? 'tw-ease tw-transition-transform tw-duration-500'
            : ''
        }`}
        style={{ transform: `translateY(${translateY}px)` }}
      >
        {visitLogs.map(({ log_id, name, text }) => (
          <Log key={log_id} name={name} text={text} />
        ))}
      </div>
    </div>
  );
};
