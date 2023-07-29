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
          'absolute left-full top-0 z-10 h-full w-60 bg-white pt-[114px] transition-transform duration-500 ease-in-out',
          mounted ? '-translate-x-full' : 'traslate-x-0',
        )}
      >
        <h1 className='ml-[42px] flex w-fit flex-col items-center'>
          <Image src='/logo/GrafiLogo.svg' alt='Grafi Logo' width={80} height={80} />
          <span className='typo-logo1'>Grafi</span>
        </h1>
        <p className='text-caption mb-10 ml-10 mt-2.5'>
          나의 취향을 전시할 수 있는 <br />
          바이오그래피, 그라피입니다
        </p>
        <Button variant='link' className='ml-auto h-12 w-[218px]'>
          회원가입하기 <Icon iconType='RightArrow' />
        </Button>
        <ul className='[&>li]: text-body1 ml-auto mt-9 w-[218px] [&>li]:border-b [&>li]:border-black [&>li]:py-2.5 [&>li]:pl-[22px]'>
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
