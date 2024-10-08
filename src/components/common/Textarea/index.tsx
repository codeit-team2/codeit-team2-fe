import { PLACEHOLDER } from '@/constants/formMessages';

import { forwardRef } from 'react';
import { useFormContext } from 'react-hook-form';

interface TextareaProps {
  id: string;
  // 빌드 오류로 인한 안쓰는 placeholder, maxLength 옵셔널 처리
  placeholder?: string;
  maxLength?: number;
}

function Textarea(
  // 빌드 오류로 인한 안쓰는  maxLength, placeholder 주석 처리
  // build시 maxLength placeholder 사용되지 않는다고 에러가 뜨는데 확인 바랍니다.
  // { id, placeholder, maxLength, ...props }: TextareaProps,
  { id, ...props }: TextareaProps,
  ref: React.ForwardedRef<HTMLTextAreaElement>,
) {
  const {
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors[id]?.message?.toString();

  return (
    <div className="relative h-152 md:h-108">
      <textarea
        className={`h-full w-full resize-none rounded-sm bg-neutral-50 px-20 py-10 text-body-1M text-neutral-900 caret-primary-300 outline-none placeholder:text-neutral-400 ${errorMessage && 'border border-secondary-300'}`}
        placeholder={PLACEHOLDER.review}
        maxLength={50}
        ref={ref}
        {...props}
      />
      {errorMessage && <p className="absolute text-body-2Sb text-secondary-300">{errorMessage}</p>}
    </div>
  );
}

export default forwardRef(Textarea);
