import useFormatDate from '@/hooks/useFormatDate';

import { Gathering } from '@/types/gatherings';

interface Props {
  data: Gathering;
}

export default function Description({ data }: Props) {
  const formattedDate = useFormatDate({ date: data.dateTime });

  return (
    <div className="mb-16 flex w-full flex-col text-body-3Sb md:mb-4 md:text-body-2Sb">
      <div className="flex gap-6">
        <p className="text-primary-300">{data.subCategoryName}</p>
        <p className="text-neutral-500">{data.location}</p>
      </div>
      <div className="mb-8 flex lg:gap-6">
        {/* 작업필요 */}
        {/* <p className="text-secondary-300">{data.deadline}</p>· */}
        <p className="text-neutral-500">
          {formattedDate?.formattedDate} {formattedDate?.formattedWeekday} ·{' '}
          {formattedDate?.formattedTime}
        </p>
      </div>
      <div className="w-220 min-w-230 text-body-1Sb md:text-heading-2M">{data.name}</div>
    </div>
  );
}
