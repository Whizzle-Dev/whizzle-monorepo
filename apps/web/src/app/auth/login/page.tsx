import { Metadata } from 'next';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { UserLoginForm } from '@/domain/auth/UserLoginForm';
import { RedirectOnLogin } from '@/app/auth/login/RedirectOnLogin';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.',
};

export default function LoginPage() {
  return (
    <>
      <div className="container relative h-[800px] flex-col items-center justify-center grid">
        <Button
          asChild
          variant="ghost"
          className={cn('absolute right-4 top-4 md:right-8 md:top-8')}
        >
          <Link href="/auth/signup">Signup</Link>
        </Button>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Sign-in to your account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your credentials below to access your account
              </p>
            </div>
            <UserLoginForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By proceeding, you agree to our{' '}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
      <RedirectOnLogin />
    </>
  );
}
