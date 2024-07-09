import Image from 'next/image';
import React, { useState } from 'react';
import Description from '@/components/Card/Description';
import Person from '@/components/Card/Person';
import { Button } from '@/components/ui/button';
import useIsDateBeforeToday from '@/hooks/useIsDateBeforeToday';

interface Props {
  data: Data;
  type?: 'default' | 'review' | 'club';
}

interface Data {
  category: string;
  place: string;
  date: string;
  title: string;
  member: number;
  imageUrl: string;
  deadline: string;
  confirmed: boolean;
}

export default function MyCard({ data, type = 'default' }: Props) {
  const isDateBeforeToday = useIsDateBeforeToday({ date: data.date });

  return (
    <div className="relative flex h-230 w-full gap-20 rounded-lg bg-white p-20">
      <div className="relative h-190 w-373">
        <Image src={data.imageUrl} alt={data.title} fill className="rounded-md" />
        {isDateBeforeToday ? (
          <div className="absolute z-20 flex h-36 w-81 items-center justify-center rounded-br-md rounded-tl-md bg-neutral-700 text-body-2M text-white">
            이용완료
          </div>
        ) : (
          <div className="absolute z-20 flex h-36 w-81 items-center justify-center rounded-br-md rounded-tl-md bg-primary-300 text-body-2M text-white">
            이용예정
          </div>
        )}
        {data.confirmed && !isDateBeforeToday && (
          <div className="absolute left-61 z-10 flex h-36 w-91 items-center justify-center rounded-br-md rounded-tl-md bg-secondary-300 pl-10 text-body-2M text-white">
            개설확정
          </div>
        )}
        {isDateBeforeToday && (
          <div className="absolute flex h-full w-full items-center justify-center rounded-md bg-neutral-900 text-white opacity-70">
            이용하신 모임에 대해
            <br />
            후기를 남겨주세요
          </div>
        )}
      </div>
      <div className="flex grow flex-col justify-between">
        <Description data={data} />
        {type === 'review' && (
          <div className="flex flex-row justify-end gap-16">
            <Button className="w-186" variant={'secondary'}>
              후기 수정하기
            </Button>
            <Button variant={'secondary'}>
              <Image src="/icons/ic-delete.svg" alt="delete" width={24} height={24} />
            </Button>
          </div>
        )}

        {type === 'club' && (
          <div className="flex flex-row justify-end gap-16">
            <Person data={data} />
            <Button className="w-186" variant={'secondary'}>
              모임 수정하기
            </Button>
            <Button variant={'secondary'}>
              <Image src="/icons/ic-delete.svg" alt="delete" width={24} height={24} />
            </Button>
            <Button variant={'secondary'}>
              <Image src="/icons/ic-share.svg" alt="share" width={24} height={24} />
            </Button>
          </div>
        )}

        {type === 'default' && (
          <div className="flex flex-row justify-end gap-16">
            <Person data={data} />
            {isDateBeforeToday ? (
              <Button className="mb-2 h-42 w-288" variant={'default'}>
                후기 작성하기
              </Button>
            ) : (
              <Button className="mb-2 h-42 w-288" variant={'secondary'}>
                예약 취소하기
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
