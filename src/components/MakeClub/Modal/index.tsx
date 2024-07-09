import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Input from '@/components/common/Input';
import Calendar from '@/components/common/Calendar';
import { FieldValues, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import Image from 'next/image';
import LoginRequired from '@/components/common/Modal/LoginRequired';
import { PLACEHOLDER } from '@/constants/formMessages';

interface Props {
  trigger: 'text' | 'plus';
}

export default function MakeClubModal({ trigger }: Props) {
  const amTime = ['09:00', '10:00', '11:00', '12:00'];
  const pmTime = [
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
  ];
  const [selectTime, setSelectTime] = useState<string>();

  const fileInput = React.useRef<HTMLInputElement | null>(null);
  const handleButtonClick = () => {
    fileInput.current?.click();
  };

  const triggerButton =
    trigger === 'text' ? (
      <Button className="mb-50 hidden md:block">모임만들기</Button>
    ) : (
      <button className="fixed right-32 z-20 cursor-pointer rounded-[40px] bg-primary-300 p-16">
        <div className="relative h-24 w-24">
          <Image src="/icons/ic-plus.svg" alt="ic-plus" fill />
        </div>
      </button>
    );

  const form = useForm();

  const {
    handleSubmit,
    register,
    formState: { isValid },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = (value: FieldValues) => {};

  // login 상태 확인하는 과정 추가 필요
  const isLogin = true;

  return (
    <Dialog>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      {isLogin ? (
        <DialogContent className="flex h-729 w-fit flex-col items-center gap-24 overflow-y-scroll px-40 py-32">
          <DialogTitle className="w-440 text-center md:w-952">모임 만들기</DialogTitle>
          <FormProvider {...form}>
            <form
              className="flex w-fit flex-col justify-center md:flex-row"
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex w-fit flex-col gap-24">
                <div>
                  <DialogDescription>대표 이미지</DialogDescription>
                  <div className="flex flex-row items-center gap-8">
                    <input
                      type="file"
                      ref={fileInput}
                      className="block rounded-sm bg-neutral-50 px-12 py-10 file:hidden"
                    />
                    <Button variant="chip" selected={true} onClick={() => handleButtonClick()}>
                      파일찾기
                    </Button>
                  </div>
                </div>
                <div className="flex flex-row gap-12">
                  <div className="w-3/6">
                    <DialogDescription>카테고리</DialogDescription>
                    <Input type="text" id="category" placeholder={PLACEHOLDER.category} />
                  </div>
                  <div className="w-3/6">
                    <DialogDescription>지역</DialogDescription>
                    <Input type="text" id="location" placeholder={PLACEHOLDER.location} />
                  </div>
                </div>
                <div>
                  <DialogDescription>날짜</DialogDescription>
                  <div className="mx-auto w-full rounded-md border">
                    <Calendar />
                  </div>
                </div>
              </div>
              <div className="mx-32 my-12 border-l"></div>
              <div className="flex w-fit flex-col gap-24">
                <div className="w-440">
                  <DialogDescription>오전</DialogDescription>
                  <div className="flex gap-4">
                    {amTime.map((time, i) => (
                      <Button
                        variant="chip"
                        size="chip"
                        key={i}
                        selected={selectTime === time}
                        onClick={() => setSelectTime(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="w-440">
                  <DialogDescription>오후</DialogDescription>
                  <div className="flex flex-wrap gap-4">
                    {pmTime.map((time, i) => (
                      <Button
                        variant="chip"
                        size="chip"
                        key={i}
                        selected={selectTime === time}
                        onClick={() => setSelectTime(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <DialogDescription>모임명</DialogDescription>
                  <Input
                    type="text"
                    id="clubName"
                    placeholder={PLACEHOLDER.clubName}
                    maxLength={30}
                  />
                </div>
                <div>
                  <DialogDescription>모임 정원</DialogDescription>
                  <Input
                    type="text"
                    id="headcount"
                    placeholder={PLACEHOLDER.headcount}
                    maxLength={20}
                  />
                </div>
              </div>
            </form>
          </FormProvider>
          <div className="flex justify-center">
            <Button className="w-440 md:w-952">확인</Button>
          </div>
        </DialogContent>
      ) : (
        <DialogContent className="w-0">
          <LoginRequired />
        </DialogContent>
      )}
    </Dialog>
  );
}
