import React from 'react';

import Bookmark from '../common/Bookmark';
import { Button } from '../ui/button';
import Image from 'next/image';
import { useRouter } from 'next/router';

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
  const minReached = data.participantCount >= 5;
  const router = useRouter();
  const { id: gatheringId } = router.query;
  const queryId = Number(gatheringId);

  const favorite = isFavorite(data);

  const joinMutation = usePostGatheringsJoin({
    onSuccess: (data) => {
      console.log('참여하기 성공', data);
    },
    onError: (error) => {
      console.error('참여하기 실패', error);
    },
  });

  const handleJoin = () => {
    joinMutation.mutate(queryId);
  };

  const handleToggleBookmark = () => {
    if (data) {
      clickFavorites(data);
    }
  };

  return (
    <div className="relative flex w-full max-w-screen-lg flex-col gap-16 rounded-lg bg-white p-8 md:h-230 md:flex-row md:gap-10 md:p-20 lg:gap-20">
      <div className="relative h-163 w-full rounded-lg bg-neutral-50 md:h-190 md:w-373">
        <Image
          src={data.gatheringImageUrl}
          alt={data.name}
          objectFit="contain"
          fill
          className="rounded-md object-cover"
        />
        {minReached && (
          <Image
            src={data.gatheringImageUrl}
            alt={data.name}
            objectFit="contain"
            fill
            className="rounded-md object-cover"
          />
        )}
        {minReached && (
          <div className="absolute flex h-36 w-81 items-center justify-center rounded-br-md rounded-tl-md bg-secondary-300 text-body-2M text-white">
            개설확정
          </div>
        )}
      </div>
      <div className="relative mx-12 flex grow flex-col items-start justify-between text-gray-600 md:mx-0">
        <Description data={data} />
        <div className="mb-11 flex w-full items-center justify-center gap-8 md:gap-16">
          <div className="flex w-full items-center gap-16">
            <Person data={data} />
            <ProgressPercentage data={data} />
          </div>
          <Button
            onClick={handleJoin}
            className="mb-2 h-42 w-full md:w-200 lg:w-288"
            variant={'secondary'}
            disabled={data.participantCount >= data.capacity}
          >
            {data.participantCount >= data.capacity ? '참여마감' : '참여하기'}
          </Button>
        </div>
      </div>
      <div className="absolute right-30 top-30">
        <Bookmark favorite={favorite} handleToggleBookmark={handleToggleBookmark} />
      </div>
    </div>
  );
}
