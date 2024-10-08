import { useRouter } from 'next/router';

import { formatDate } from '@/lib/utils';

import { Gathering } from '@/types/gatherings';

interface Props {
  data: Gathering;
}

export default function Description({ data }: Props) {
  const formattedDate = formatDate({ date: data.dateTime });

  const router = useRouter();
  return (
    <div
      className="mb-16 mt-4 flex w-full cursor-pointer flex-col text-body-3Sb md:mb-4 md:mt-10 md:text-body-2Sb"
      onClick={() => router.push(`/detail/${data.gatheringId}`)}
    >
      <div className="flex gap-6">
        <p className="text-primary-300">{data.subCategoryName}</p>
        <p className="text-neutral-500">{data.location}</p>
      </div>
      <div className="mb-8 flex gap-6">
        <p className="text-secondary-300">{formattedDate?.deadline}</p>·
        <p className="text-neutral-500">
          {formattedDate?.formattedDate} {formattedDate?.formattedWeekday} ·{' '}
          {formattedDate?.formattedTime}
        </p>
      </div>
      <div className="w-220 min-w-230 text-body-1Sb md:text-heading-2M">{data.name}</div>
    </div>
  );
}
