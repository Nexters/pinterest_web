import React from 'react';
import { Carousel } from 'react-bootstrap';
import { ImageFrame } from '@/components/shared';

interface ItemType {
  photo_cut_id: number;
  title: string;
  image: string;
  text: string;
}

interface ItemSlideProps {
  items: ItemType[];
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}

export function ItemsSlide({
  items,
  activeIndex,
  setActiveIndex,
}: ItemSlideProps) {
  const handleSelect = (selectedIndex: number) => {
    setActiveIndex(selectedIndex);
  };

  return (
    <>
      <Carousel
        activeIndex={activeIndex}
        onSelect={handleSelect}
        controls={true}
        indicators={false}
        interval={null}
      >
        {items.map((item, idx) => (
          <Carousel.Item key={item.photo_cut_id}>
            <ImageFrame
              alt={item.title}
              src={item.image}
              priority={idx === activeIndex}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
}
