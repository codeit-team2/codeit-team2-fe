import { ERROR_MESSAGE, PLACEHOLDER } from '@/constants/formMessages';

import React, { useState } from 'react';
import { FieldValues, FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import Image from 'next/image';

import Calendar from '@/components/common/Calendar';
import Dropdown from '@/components/common/Dropdown';
import Input from '@/components/common/Input';
import LoginRequired from '@/components/common/Modal/LoginRequired';

import FileInput from '@/components/MakeClub/FileInput';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

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
  const [isSubmitCheck, setIsSubmitCheck] = useState(false);

  const triggerButton =
    trigger === 'text' ? (
      <Button className="mb-50 hidden md:block">모임만들기</Button>
    ) : (
      <button className="fixed bottom-32 right-32 z-20 cursor-pointer rounded-[40px] bg-primary-300 p-16">
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

  // const onSubmit: SubmitHandler<FieldValues> = (value: FieldValues) => {}; eslint 설정 때문에 잠시 주석 처리
  const onSubmit: SubmitHandler<FieldValues> = () => {};

  // login 상태 확인하는 과정 추가 필요
  const isLogin = true;

  const handleSubmitButton = () => {
    setIsSubmitCheck(true);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      {isLogin ? (
        <DialogContent className="flex h-729 w-fit flex-col items-center gap-24 overflow-y-scroll px-40 py-32">
          <DialogTitle className="w-440 text-center md:w-952">모임 만들기</DialogTitle>
          <FormProvider {...form}>
            <form
              className="flex h-full w-fit flex-col justify-around"
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex w-fit flex-col justify-center sm:flex-row">
                <div className="flex w-fit flex-col gap-24">
                  <div>
                    <DialogDescription>대표 이미지</DialogDescription>
                    <FileInput isSubmitted={isSubmitCheck} />
                  </div>
                  <div className="flex flex-row gap-12">
                    <div className="relative w-3/6">
                      <DialogDescription>카테고리</DialogDescription>
                      <Dropdown
                        id="category"
                        items={['러닝', '등산', '배드민턴', '헬스']}
                        icon="icons/ic-chevron-down.svg"
                        itemTrigger="카테고리를 선택해주세요"
                        type="makeClub"
                        isSubmitted={isSubmitCheck}
                      />
                    </div>
                    <div className="relative w-3/6">
                      <DialogDescription>지역</DialogDescription>
                      <Dropdown
                        id="location"
                        items={['중랑구', '광진구', '용산구', '을지로3가']}
                        icon="icons/ic-chevron-down.svg"
                        itemTrigger="지역을 선택해주세요"
                        type="makeClub"
                        isSubmitted={isSubmitCheck}
                      />
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
                <div className="flex w-fit flex-col gap-40">
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
                          type="button"
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
                          type="button"
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
                      {...register('clubName', {
                        required: ERROR_MESSAGE.clubName.required,
                      })}
                    />
                  </div>
                  <div>
                    <DialogDescription>모임 정원</DialogDescription>
                    <Input
                      type="text"
                      id="headcount"
                      placeholder={PLACEHOLDER.headcount}
                      maxLength={20}
                      {...register('headcount', {
                        required: ERROR_MESSAGE.headcount.required,
                      })}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <Button
                  className={`w-full ${!isValid && 'cursor-default bg-neutral-400 !text-neutral-100 hover:!text-neutral-100'}`}
                  type="submit"
                  onClick={() => handleSubmitButton()}
                >
                  모임 만들기
                </Button>
              </div>
            </form>
          </FormProvider>
        </DialogContent>
      ) : (
        <DialogContent className="w-0">
          <LoginRequired />
        </DialogContent>
      )}
    </Dialog>
  );
}
