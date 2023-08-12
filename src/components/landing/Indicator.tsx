interface IndicatorProps {
  activeIndex: number;
  length: number;
}

interface DotProps {
  isActive: boolean;
}

const Dot = ({ isActive }: DotProps) => {
  const color = isActive ? '#1B1717' : '#E8E8E8';
  return (
    <svg width='11' height='11' viewBox='0 0 11 11' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <circle cx='5.24023' cy='5.90771' r='5' fill={color} />
    </svg>
  );
};

export const Indicator = ({ activeIndex, length }: IndicatorProps) => {
  const renderDots = (length: number, activeIndex: number) => {
    const dots = [];
    for (let i = 0; i < length; i++) {
      dots.push(<Dot isActive={activeIndex === i} />);
    }

    return dots;
  };
  return (
    <div className='tw-flex tw-flex-row tw-justify-center tw-py-10'>
      <div className='tw-flex tw-flex-row tw-gap-3'>{renderDots(length, activeIndex)}</div>
    </div>
  );
};
