import { useQueryClient } from '@tanstack/react-query';

import React, { useEffect, useState } from 'react';

import Bookmark from '../common/Bookmark';
import DynamicModal from '../common/Modal/Dynamic';
import LoginRequired from '../common/Modal/LoginRequired';
import { Button } from '../ui/button';
import { getCookie } from 'cookies-next';
import Image from 'next/image';

import Description from '@/components/Card/Description';
import Person from '@/components/Card/Person';
import ProgressPercentage from '@/components/Card/ProgressPercentage';

import { usePostGatheringsJoin } from '@/hooks/useGatherings';

import { Gathering } from '@/types/gatherings';

interface CardProps {
  data: Gathering;
  clickFavorites: (item: Gathering) => void;
  isFavorite: (item: Gathering) => boolean;
}

export default function Card({ data, clickFavorites, isFavorite }: CardProps) {
  const today = new Date();
  const freshDataFiltering = new Date(data.dateTime) >= today;

  const minReached = data.participantCount >= 5;
  const favorite = isFavorite(data);
  const queryClient = useQueryClient();

  const maxReached = data.participantCount >= data.capacity;

  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [localData, setLocalData] = useState(data);

  const joinMutation = usePostGatheringsJoin({
    onSuccess: (updatedData) => {
      console.log('참여하기 성공', updatedData);

      const newData = {
        ...localData,
        isJoiner: true,
        participantCount: localData.participantCount + 1,
      };

      setLocalData(newData);

      queryClient.setQueryData(['gatherings', data.gatheringId], newData);
      queryClient.invalidateQueries({ queryKey: ['gatherings'] });
    },
    onError: (error) => {
      console.error('참여하기 실패', error);
    },
  });

  useEffect(() => {
    setLocalData(data);
  }, [data]);

  const handleJoin = () => {
    joinMutation.mutate(data.gatheringId);
  };

  const handleOpenDialog = () => {
    const accessToken = getCookie('accessToken');
    if (!accessToken) {
      setShowLoginModal(true);
      return;
    }
    if (!localData.isJoiner) {
      setDialogOpen(true);
    }
  };

  const handleClick = () => {
    console.log('handleClick called. isEntered:', localData.isJoiner);
    if (!localData.isJoiner) {
      handleJoin();
    }
    setDialogOpen(false);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleToggleBookmark = () => {
    if (data) {
      clickFavorites(data);
    }
  };

  return (
    <>
      {showLoginModal && (
        <>
          <LoginRequired isModalOpen={showLoginModal} setIsModalOpen={setShowLoginModal} />
        </>
      )}

      <div className="relative flex w-full max-w-screen-lg flex-col gap-16 rounded-lg border-2 border-white bg-white p-8 hover:border-neutral-100 hover:shadow-sm active:bg-neutral-50 md:h-230 md:flex-row md:gap-10 md:p-20 lg:gap-20">
        <div className="relative h-163 w-full rounded-lg bg-neutral-50 md:h-190 md:w-373">
          <Image
            src={data.gatheringImageUrl}
            alt={data.name}
            sizes="100%"
            fill
            className="cursor-pointer rounded-md object-cover"
          />
          {!freshDataFiltering && (
            <div className="absolute flex h-full w-full cursor-pointer items-center justify-center rounded-md bg-neutral-900 text-center text-white opacity-70">
              종료된 모임이에요!
              <br />
              다음기회에 만나요!
            </div>
          )}
          {minReached && (
            <div className="absolute flex h-36 w-81 items-center justify-center rounded-br-md rounded-tl-md bg-secondary-300 text-body-2M text-white">
              개설확정
            </div>
          )}
        </div>
        <div className="relative mx-12 flex grow flex-col items-start justify-between text-gray-600 md:mx-0">
          <Description data={data} />
          <div className="mb-11 flex w-full items-center justify-center gap-8 md:mb-0 md:gap-16">
            <div className="flex w-full items-center gap-16">
              <Person data={localData} />
              <ProgressPercentage data={localData} />
            </div>
            <>
              <Button
                className="mb-2 h-42 w-full md:w-200 lg:w-288"
                onClick={handleOpenDialog}
                variant={'secondary'}
                disabled={(!localData.isJoiner && maxReached) || !freshDataFiltering}
              >
                {!freshDataFiltering
                  ? '마감'
                  : maxReached
                    ? '참여마감'
                    : localData.isJoiner
                      ? '참여 중'
                      : '참여하기'}
              </Button>
              {!localData.isJoiner && (
                <DynamicModal
                  modalType="confirm"
                  title="참여하기"
                  description="해당 모임에 참여하시겠습니까?"
                  isOpen={isDialogOpen}
                  onClose={handleCloseDialog}
                  buttonText="참여하기"
                  buttonOnClick={handleClick}
                />
              )}
            </>
          </div>
        </div>
        <div className="absolute right-20 top-187 md:right-30 md:top-30">
          <Bookmark
            favorite={favorite}
            handleToggleBookmark={handleToggleBookmark}
            freshDataFiltering={freshDataFiltering}
          />
        </div>
      </div>
    </>
  );
}
