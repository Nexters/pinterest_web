import Image from 'next/image';
import Link from 'next/link';
import { Fragment, type MouseEventHandler, useEffect, useState } from 'react';
import { Button, Dimmed, Icon } from '@/components/shared';
import { cn } from '@/utils/cn';

const WAIT_DURATION = 100;

interface Props {
  isOpen: boolean;
  onClose: MouseEventHandler<HTMLElement>;
}

export function Drawer({ isOpen, onClose }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setMounted(true), WAIT_DURATION);
      return;
    }

    setMounted(false);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <Fragment>
      {mounted && <Dimmed onClick={onClose} />}
      <div
        className={cn(
          'tw-absolute tw-left-full tw-top-0 tw-z-10 tw-h-full tw-w-60 tw-bg-white tw-pt-[114px] tw-transition-transform tw-duration-500 tw-ease-in-out',
          mounted ? '-tw-translate-x-full' : 'tw-traslate-x-0',
        )}
      >
        <h1 className='tw-ml-[42px] tw-flex tw-w-fit tw-flex-col tw-items-center'>
          <Image
            src='/logo/GrafiLogo.svg'
            alt='Grafi Logo'
            width={80}
            height={80}
            priority
          />
          <span className='tw-text-logo1'>Grafi</span>
        </h1>
        <p className='tw-text-caption tw-mb-10 tw-ml-10 tw-mt-2.5'>
          나의 취향을 전시할 수 있는 <br />
          바이오그래피, 그라피입니다
        </p>
        <Button variant='link' className='tw-ml-auto tw-h-12 tw-w-[218px]'>
          회원가입하기 <Icon iconType='RightArrow' />
        </Button>
        <ul className='tw-text-body1 tw-ml-auto tw-mt-9 tw-w-[218px] [&>li]:tw-border-b [&>li]:tw-border-black [&>li]:tw-py-2.5 [&>li]:tw-pl-[22px]'>
          <li>
            <Link href='/'>로그인하기</Link>
          </li>
          <li>
            <Link href='/'>의견 보내기</Link>
          </li>
        </ul>
      </div>
    </Fragment>
  );
}
