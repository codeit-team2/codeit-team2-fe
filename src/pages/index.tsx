import { LOCATION } from '@/constants/dropdownItems';

import { useEffect, useState } from 'react';
import React from 'react';

import Image from 'next/image';

import Banner from '@/components/common/Banner';
import Dropdown from '@/components/common/Dropdown';
import Footer from '@/components/common/Footer';
import GNB from '@/components/common/GNB';
import MainLayout from '@/components/common/MainLayout';
import Tap from '@/components/common/Tap';

import Card from '@/components/Card';
import ChipTap from '@/components/ChipTap';
import Loading from '@/components/Loading';
import MakeClubModal from '@/components/MakeClub/Modal';
import NotCard from '@/components/NotCard';

import { formatDateToISO } from '@/lib/utils';

import useFavorite from '@/hooks/useFavorite';
import { useGetGatherings } from '@/hooks/useGatherings';

import { Gathering } from '@/types/gatherings';

export default function Main() {
  const [sortOrder, setSortOrder] = useState<string>('desc');
  const [location, setLocation] = useState<string | null>(null);
  const [dateTime, setDateTime] = React.useState<Date | undefined>();
  // bookmark도 mainCategory, subCategory두개 핸들러랑 같이 쓰는데 훅으로 만들수 있을것 같으니 시도해보기.
  const [mainCategory, setMainCategory] = useState<string>('운동');
  const [subCategory, setSubCategory] = useState<string>('전체');
  const formattedDate = formatDateToISO(dateTime);

  const { clickFavorites, isFavorite } = useFavorite();

  const handleMainTapClick = (title: string) => {
    setMainCategory(title);
  };

  const handleSubTapClick = (title: string) => {
    setSubCategory(title);
  };

  const handleLocationClick = (location: string | null) => {
    setLocation(location);
  };

  const handleCalendarClick = (Date?: Date) => {
    setDateTime(Date);
  };

  const handleSortOrderClick = (item: string | null) => {
    if (item === '오름차순') {
      setSortOrder('desc');
    } else if (item === '내림차순') {
      setSortOrder('asc');
    }
  };

  const {
    data: CardData,
    isPending,
    fetchNextPage,
    hasNextPage,
  } = useGetGatherings(mainCategory, subCategory, sortOrder, location, formattedDate);

  useEffect(() => {
    setSubCategory('전체');
  }, [mainCategory]);

  useEffect(() => {
    setLocation(null);
  }, [mainCategory, subCategory]);

  return (
    <>
      <GNB />
      <MainLayout>
        <div className="mx-auto max-w-screen-lg">
          <Banner page="home" />
          <div className="mb-20 mt-32 md:mb-27">
            <Tap handleMainTapClick={handleMainTapClick} mainCategory={mainCategory} />
          </div>
          <ChipTap
            mainCategory={mainCategory}
            handleSubTapClick={handleSubTapClick}
            subCategory={subCategory}
          />

          <div className="mb-24 flex justify-between md:mb-32">
            <div className="flex gap-8 md:gap-12">
              <Dropdown
                items={LOCATION}
                itemTrigger="지역선택"
                handleLocationClick={handleLocationClick}
                // 이름 나중에 resetTrigger같은걸로 바꾸기.
                mainCategory={mainCategory}
                subCategory={subCategory}
                // 이거 두개
              />
              <Dropdown
                icon="icons/ic-chevron-down.svg"
                itemTrigger="날짜선택"
                handleCalendarClick={handleCalendarClick}
              />
            </div>
            <Dropdown
              items={['오름차순', '내림차순']}
              itemTrigger="오름차순"
              isUpDown
              handleLocationClick={handleSortOrderClick}
            />
          </div>
          <MakeClubModal trigger="plus" />
          <div className="flex flex-col gap-20">
            {CardData && CardData?.pages[0].length > 0 ? (
              <>
                {CardData.pages.map((datas: Array<Gathering>, i: number) => (
                  <React.Fragment key={i}>
                    {datas.map((data: Gathering, index: number) => {
                      return (
                        <>
                          <Card
                            key={index}
                            data={data}
                            clickFavorites={clickFavorites}
                            isFavorite={isFavorite}
                          />
                        </>
                      );
                    })}
                  </React.Fragment>
                ))}
                {hasNextPage && (
                  <>
                    <div className="mb-0 mt-12 h-2 w-full bg-neutral-100 md:mb-16 md:mt-40" />
                    <button
                      className="flex w-full items-center justify-center"
                      onClick={() => fetchNextPage()}
                    >
                      더 보기
                      <div className="relative h-24 w-24">
                        <Image src="icons/ic-chevron-down.svg" alt="dropdown" fill />
                      </div>
                    </button>
                  </>
                )}
              </>
            ) : (
              // <NotCard type="default" />
              <>{isPending ? <Loading width="300" height="300" /> : <NotCard type="default" />}</>
            )}
          </div>
        </div>
      </MainLayout>
      <Footer />
    </>
  );
}
