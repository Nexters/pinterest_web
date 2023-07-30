import React, { useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { Icon, ImageFrame } from '@/components/shared';

interface ItemType {
  id: number;
  title: string;
  image: string;
  description: string;
}

interface ItemSlideProps {
  items: ItemType[];
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}

export function ItemsSlide({ items, activeIndex, setActiveIndex }: ItemSlideProps) {
  const handleSelect = (selectedIndex: number) => {
    setActiveIndex(selectedIndex);
  };

  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.js');
  }, []);

  // const goToNext = () => {
  //   const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
  //   setActiveIndex(nextIndex);
  // };
  // const goToPrev = () => {
  //   const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
  //   setActiveIndex(nextIndex);
  // };

  return (
    <>
      <Carousel activeIndex={activeIndex} onSelect={handleSelect} controls={true} indicators={false}>
        {items.map((item) => (
          <Carousel.Item key={item.title}>
            <ImageFrame alt={item.title} src={item.image} className='aspect-[3/4]' />
          </Carousel.Item>
        ))}
        {/* <button onClick={goToPrev} className='absolute left-4 top-1/2'>
        <Icon iconType='LeftChevronBG' width='2rem' height='2rem' />
      </button>
      <button onClick={goToNext} className='absolute right-4 top-1/2'>
        <Icon iconType='RightChevronBG' width='2rem' height='2rem' />
      </button> */}
      </Carousel>
    </>
  );
}
