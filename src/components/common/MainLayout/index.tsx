import { ReactNode } from 'react';

interface MainLayoutrProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutrProps) {
  return (
    <div className="min-h-mainLayout h-full bg-neutral-50 px-12 pb-40 pt-20 md:px-32 md:pb-50 md:pt-32">
      <div className="mx-auto max-w-screen-lg">{children}</div>
    </div>
  );
}
