import React, { useEffect, useRef, useState } from 'react';
import { Control, Controller, useFormContext } from 'react-hook-form';

import Image from 'next/image';

import IcChevronDown from '@/components/common/Dropdown/IcChevronDown';

interface CustomDivProps {
  id: 'category' | 'location';
  control: Control<FormValues>;
  itemTrigger: string;
  items: string[];
  defaultValue?: string;
}

interface FormValues {
  gatheringImage: File | null;
  category: string;
  location: string;
  name: string;
  capacity: number;
}

export default function DropdownInput({
  id,
  control,
  itemTrigger,
  items,
  defaultValue,
}: CustomDivProps) {
  const {
    formState: { errors, isSubmitted },
  } = useFormContext();

  const [itemValue, setItemValue] = useState<string | null>(itemTrigger);
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>();

  const isSelectedValue = itemValue !== itemTrigger;
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleItemClick = (itemText: string, onChange: (value: string) => void) => {
    setIsOpen(false);
    setItemValue(itemText);
    // 폼 상태를 업데이트
    onChange(itemText);
  };

  let inputIcon = { icon: '', alt: '' };
  if (itemValue !== itemTrigger && isSubmitted) {
    inputIcon = { icon: 'success', alt: '성공 아이콘' };
  } else if (itemValue === itemTrigger && isSubmitted) {
    inputIcon = { icon: 'error', alt: '실패 아이콘' };
  }

  useEffect(() => {
    setErrorMessage(errors[id]?.message?.toString());
  }, [errors[id]]);

  useEffect(() => {
    defaultValue && setItemValue(defaultValue);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Controller
      name={id}
      control={control}
      render={({ field }) => (
        <div ref={dropdownRef} className="relative z-10 w-full">
          <button
            type="button"
            {...field}
            onClick={() => toggleDropdown()}
            className={`${isSelectedValue && '!text-black'} relative flex h-48 w-full items-center justify-between truncate rounded-sm bg-neutral-50 px-12 py-10 text-body-1M text-neutral-400 hover:text-primary-300`}
          >
            <span className="overflow-hidden text-ellipsis whitespace-nowrap">{itemValue}</span>
            <div className="flex flex-row">
              {inputIcon.icon && (
                <Image
                  className={`${inputIcon.icon === 'xmark' && 'cursor-pointer'}`}
                  src={`/icons/ic-${inputIcon.icon}.svg`}
                  alt={inputIcon.alt}
                  width={24}
                  height={24}
                />
              )}
              <div className="relative h-32 w-32">
                <IcChevronDown className={`${isSelectedValue && 'animate-halfTurn'}`} />
              </div>
            </div>
          </button>
          {isOpen ? (
            <div className="absolute z-10 h-176 w-full overflow-y-scroll rounded-md bg-white px-4 py-5 text-center text-body-2Sb shadow-lg">
              {items.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleItemClick(item, field.onChange)}
                  className="flex w-full cursor-pointer items-center justify-center px-10 py-12 hover:rounded-full hover:bg-primary-50 active:bg-primary-100"
                >
                  {item}
                </div>
              ))}
            </div>
          ) : null}
          {errorMessage && isSubmitted && (
            <p className="absolute mt-6 text-body-2Sb text-secondary-300">{errorMessage}</p>
          )}
        </div>
      )}
    />
  );
}
