import { CATEGORY_TAP } from '@/constants/dropdownItems';

import { useEffect, useRef, useState } from 'react';

// import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface ChipTapProps {
  mainCategory: string;
  handleSubTapClick: (title: string) => void;
  subCategory: string;
}

export default function ChipTap({ mainCategory, handleSubTapClick, subCategory }: ChipTapProps) {
  const scrollContainerRef = useRef(null);
  const [hasScroll, setHasScroll] = useState(false);

  const SELECTED_TAP = CATEGORY_TAP.find((item) => item.title === mainCategory);

  const handleMoveToDetailTap = (data: string) => {
    handleSubTapClick(data);
  };

  useEffect(() => {
    const handleResize = () => {
      if (scrollContainerRef.current) {
        const { scrollWidth, clientWidth } = scrollContainerRef.current;
        const isScrollable = scrollWidth > clientWidth;

        if (isScrollable && !hasScroll) {
          setHasScroll(true);
        } else if (!isScrollable && hasScroll) {
          setHasScroll(false);
        }
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (scrollContainerRef.current) {
      resizeObserver.observe(scrollContainerRef.current);
    }

    // 컴포넌트 언마운트 시 ResizeObserver 해제
    return () => {
      if (scrollContainerRef.current) {
        resizeObserver.unobserve(scrollContainerRef.current);
      }
    };
  }, [hasScroll]);

  return (
    <>
      <div
        className={`${hasScroll ? 'justify-start' : 'justify-center'} mb-8 flex gap-6 overflow-x-auto scrollbar-none md:mb-16 md:gap-8`}
        ref={scrollContainerRef}
      >
        {SELECTED_TAP?.subcategories.map((data: string, index: number) => (
          <Button
            className="px-20"
            key={index}
            variant="chip"
            onClick={() => handleMoveToDetailTap(data)}
            selected={data === subCategory}
          >
            {data}
          </Button>
        ))}
        {/* </span> */}
      </div>
    </>
  );
}
