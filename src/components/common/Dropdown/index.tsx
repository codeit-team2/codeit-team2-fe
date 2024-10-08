import React, { SetStateAction, useEffect, useRef, useState } from 'react';

import Calendar from '@/components/common/Calendar';
import IcChevronDown from '@/components/common/Dropdown/IcChevronDown';
import IcChevronUpdown from '@/components/common/Dropdown/IcChevronUpdown';

import { Button } from '@/components/ui/button';

import { formatDate } from '@/lib/utils';

const DROPDOWN_ERROR_MSG = {
  category: {
    required: '카테고리를 선택해주세요',
  },
  location: {
    required: '지역을 선택해주세요',
  },
};

interface DropdownProps {
  id?: 'category' | 'location';
  items?: string[];
  setItem?: React.Dispatch<SetStateAction<string | null>>;
  icon?: string;
  isUpDown?: boolean;
  itemTrigger: string | null;
  isSubmitted?: boolean;
  handleLocationClick?: (location: string | null) => void;
  handleCalendarClick?: (date?: Date) => void | undefined;
  resetTrigger?: object;
  mainCategory?: string;
  subCategory?: string;
}

export default function Dropdown({
  id,
  items,
  setItem,
  isUpDown,
  itemTrigger = 'Open',
  isSubmitted,
  handleLocationClick,
  handleCalendarClick,
  mainCategory,
  subCategory,
  // resetTrigger,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [itemValue, setItemValue] = useState<string | null | undefined>(itemTrigger);
  const [errorMessage, setErrorMessage] = useState<string | null>();
  const [date, setDate] = React.useState<Date | undefined>();

  const isSelectedValue = itemValue !== itemTrigger;

  const dropdownRef = useRef<HTMLDivElement>(null);

  const formattedDate = formatDate({ date });

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleItemClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const itemText = e.currentTarget?.textContent;
    if (handleLocationClick) {
      if (itemText === '전체') {
        handleLocationClick(null);
      } else {
        handleLocationClick(itemText);
      }
    }
    setIsOpen(false);
    setItemValue(itemText);
    setErrorMessage(null);
    setItem && setItem(itemText);
  };

  const handleDateClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const itemText = e.currentTarget.textContent?.replace(/\s*선택.*/, '');
    setItemValue(itemText);

    if (handleCalendarClick) {
      handleCalendarClick(date);
    }
  };

  useEffect(() => {
    if (id) {
      setErrorMessage(DROPDOWN_ERROR_MSG[id].required);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setItemValue(itemTrigger);
    setDate(undefined);
  }, [mainCategory, subCategory]);

  return (
    <div ref={dropdownRef} className="relative z-10">
      <button
        onClick={toggleDropdown}
        className={`${isSelectedValue && '!text-black'} ${itemTrigger === '지역선택' && 'w-97'} relative flex items-center truncate rounded-sm bg-neutral-50 text-body-2M text-neutral-400 hover:text-primary-300 md:text-body-1M`}
        type="button"
      >
        {itemValue}
        <div className="flex flex-row">
          <div className="relative h-32 w-32">
            {isUpDown ? (
              <IcChevronUpdown className="px-10 py-4" />
            ) : (
              <IcChevronDown className={`${isSelectedValue && 'animate-halfTurn'}`} />
            )}
          </div>
        </div>
      </button>

      {/* 이후 고정 값 나오면 변경작업 */}
      {isOpen ? (
        items && items.length > 0 ? (
          <div className="absolute z-10 max-h-176 w-full overflow-y-scroll rounded-md bg-white px-4 py-5 text-body-2Sb shadow-lg scrollbar-none">
            {itemTrigger === '지역선택' && (
              <div
                className="my-5 flex h-34 w-full cursor-pointer items-center justify-center px-10 hover:rounded-full hover:bg-primary-50 active:bg-primary-100"
                onClick={handleItemClick}
              >
                전체
              </div>
            )}
            {items.map((item, index) => (
              <div
                key={index}
                onClick={handleItemClick}
                className="my-5 flex h-34 w-full cursor-pointer items-center justify-center px-10 hover:rounded-full hover:bg-primary-50 active:bg-primary-100"
              >
                {item}
              </div>
            ))}
          </div>
        ) : (
          <div className="absolute -left-100 rounded-md bg-white p-12 shadow-lg">
            <Calendar date={date} setDate={setDate} />
            <Button variant="secondary" className="mt-2 w-full" onClick={handleDateClick}>
              {formattedDate
                ? `${formattedDate.formattedDate} ${formattedDate.formattedWeekday} 선택`
                : '날짜를 선택해주세요'}
            </Button>
          </div>
        )
      ) : null}
      {errorMessage && isSubmitted && (
        <p className="absolute -bottom-20 mt-6 text-body-2Sb text-secondary-300">{errorMessage}</p>
      )}
      {/* isOpen이 false일 때는 아무것도 렌더링하지 않음 */}
    </div>
  );
}
