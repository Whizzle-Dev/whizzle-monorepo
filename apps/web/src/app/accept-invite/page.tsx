'use client';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { FormProvider, useForm } from 'react-hook-form';
import { FormInput } from '@/components/ui/form/form-input';
import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAcceptInviteMutation, useLoginUserMutation } from '@/generated';
import { useAuth } from '@/providers/AuthProvider';
import { useToast } from '@/components/ui/use-toast';
import { Suspense } from 'react';

const schema = z.object({
  password: z.string().min(1, { message: 'Password is required' }),
  phoneNumber: z.string().min(1, { message: 'Phone Number is required' }),
});

type FormValues = z.infer<typeof schema>;

export default function Page() {
  return (
    <Suspense fallback="Loading...">
      <AcceptInvite />
    </Suspense>
  );
}

const AcceptInvite = () => {
  const { setToken } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [acceptInvite, { loading }] = useAcceptInviteMutation();
  const [loginMutation, { loading: loadingLogin }] = useLoginUserMutation({
    onCompleted: (data) => {
      setToken(data.login);
      localStorage.setItem('token', data.login);
      router.replace('/app/dashboard');
    },
  });
  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
  });
  const searchParams = useSearchParams();

  const inviteCode = searchParams.get('code');

  const { handleSubmit } = methods;
  const onSubmit = async (values: FormValues) => {
    if (inviteCode) {
      try {
        const result = await acceptInvite({
          variables: {
            password: values.password,
            inviteCode,
          },
        });
        if (result.data?.acceptInvite.email) {
          await loginMutation({
            variables: {
              email: result.data?.acceptInvite.email,
              password: values.password,
            },
          });
        }
      } catch (e) {
        toast({
          variant: 'destructive',
          title: 'Failed to accept the invite',
          description: 'Please try again later',
        });
      }
    }
  };
  return (
    <>
      <div className="container relative h-[800px] flex-col items-center justify-center grid">
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Setup your account
              </h1>
              <p className="text-sm text-muted-foreground">
                Provide required details below
              </p>
            </div>
            <div className="grid gap-6">
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormProvider {...methods}>
                  <div className="grid gap-4">
                    <FormInput
                      field="phoneNumber"
                      label="Phone Number"
                      placeholder="+1 123123124"
                    />
                    <FormInput
                      field="password"
                      label="Password"
                      placeholder="********"
                      type="password"
                      autoComplete="new-password"
                    />
                    <Button
                      disabled={!inviteCode}
                      loading={loading || loadingLogin}
                    >
                      Continue
                    </Button>
                  </div>
                </FormProvider>
              </form>
            </div>
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
    </>
  );
};
