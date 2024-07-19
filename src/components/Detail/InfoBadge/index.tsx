import React from 'react';

import Image from 'next/image';

import ProfileImageGroup from '@/components/Detail/ProfileImageGroup';

import { Gathering, Participant } from '@/types/gatherings';

interface InfoBadgeProps {
  data: Gathering;
  userData: Participant;
}

export default function InfoBadge({ userData, data }: InfoBadgeProps) {
  const progressPercentage = (data.participantCount / data.capacity) * 100;
  const minReached = data.participantCount >= 5;
  const maxReached = data.participantCount >= data.capacity;

  return (
    <div className="flex h-102 w-full flex-col rounded-md bg-neutral-700 p-12 md:w-475">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center gap-6">
          <div className="flex h-32 w-74 items-center gap-2 rounded-sm bg-primary-50 px-8 py-4 md:w-82">
            <div className="relative h-24 w-24">
              <Image src={'/icons/ic-person-blue.svg'} alt="ic-person" fill />
            </div>
            <div className="text-body-2Sb text-primary-300">
              {data.participantCount}/{data.capacity}
            </div>
          </div>
          <div className="flex">
            <ProfileImageGroup usersProfile={userData.accounts} />
          </div>
        </div>
        {minReached && (
          <div className="flex h-32 w-58 items-center justify-center rounded-sm bg-secondary-300 px-8 py-4 text-body-3Sb text-white md:w-72 md:text-body-2Sb">
            개설확정
          </div>
        )}
      </div>
      <div>
        <div className="relative mb-8 mt-12 h-4 w-full rounded-full bg-neutral-200 md:w-451">
          <div
            className="absolute h-4 rounded-full bg-primary-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
      <div className="flex items-center justify-between text-body-3Sb text-neutral-300">
        <div
          className={`flex items-center justify-center gap-7 ${minReached ? 'text-primary-200' : ''}`}
        >
          <Image
            src={minReached ? '/icons/ic-checkbox-on.svg' : '/icons/ic-checkbox-off.svg'}
            alt="check"
            width={24}
            height={24}
          />
          모임 개설 최소 인원 · 5명
        </div>
        <div
          className={`flex items-center justify-center gap-7 ${maxReached ? 'text-primary-200' : ''}`}
        >
          <Image
            src={maxReached ? '/icons/ic-checkbox-on.svg' : '/icons/ic-checkbox-off.svg'}
            alt="check"
            width={24}
            height={24}
          />
          모임 참여 최대 인원 · {data.capacity}명
        </div>
      </div>
    </div>
  );
}
