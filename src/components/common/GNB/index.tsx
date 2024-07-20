import React, { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import LoginModal from '@/components/common/Modal/Login';
import SignupModal from '@/components/common/Modal/Signup';

import { useGetAccounts } from '@/hooks/useAccounts';

export default function GNB() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  // api 연동하면서 수정필요
  const likeItems = 10;

  const { data: user } = useGetAccounts();

  return (
    <div className="flex w-full flex-row justify-between px-20 py-16 shadow-sm md:px-32 md:py-16">
      <Link className="flex" href="/">
        <Image src="/icons/ic-logo.svg" alt="logo" priority={true} width={65} height={14} />
      </Link>
      <div className="flex flex-row items-center gap-12 md:gap-40">
        <Link href="/" className="font-Pretendard text-base font-semibold">
          모임 찾기
        </Link>
        <Link href="/" className="font-Pretendard text-base font-medium text-gray-500">
          모든 리뷰
        </Link>
        {user?.email ? (
          <>
            <div className="flex flex-row gap-4">
              <Link href="/" className="font-Pretendard text-base font-medium text-gray-500">
                찜한 모임
              </Link>
              {likeItems ? <p className="text-blue-600">{likeItems}</p> : ''}
            </div>
            <div>
              {user?.profileImageUrl ? (
                <Image src={user.profileImageUrl} alt="프로필 사진" width={32} height={32} />
              ) : (
                <Image src="/icons/ic-profile.svg" alt="ic-profile" width={32} height={32} />
              )}
            </div>
          </>
        ) : (
          <div className="font-Pretendard text-base font-medium text-gray-500">
            <LoginModal
              isLoginModalOpen={isLoginModalOpen}
              setIsLoginModalOpen={setIsLoginModalOpen}
              setIsSignupModalOpen={setIsSignupModalOpen}
            />
            <SignupModal
              isSignupModalOpen={isSignupModalOpen}
              setIsSignupModalOpen={setIsSignupModalOpen}
              setIsLoginModalOpen={setIsLoginModalOpen}
            />
          </div>
        )}
      </div>
    </div>
  );
}
