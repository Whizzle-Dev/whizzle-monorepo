import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { Separator } from '@/components/ui/separator';
import { ReactNode } from 'react';

type FullPageLayoutProps = {
  actions: ReactNode;
  children: ReactNode;
};
export const FullPageLayout = ({ actions, children }: FullPageLayoutProps) => {
  const router = useRouter();
  return (
    <div className="h-auto">
      <div className="flex flex-row w-full p-6 justify-between">
        <div>
          <Button variant="secondary" onClick={() => router.back()}>
            <Icons.ArrowLeft className="mr-2" />
            Back
          </Button>
        </div>
        <div>{actions}</div>
      </div>
      <Separator orientation="horizontal" />
      <div className="p-6 h-full">{children}</div>
    </div>
  );
};
