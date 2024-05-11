'use client';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { useLoginUserMutation } from '@/generated';
import { useAuth } from '@/providers/AuthProvider';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from '@/components/ui/form/form-input';

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

const schema = z.object({
  email: z.string().min(1, { message: 'Email is required' }).email(),
  password: z.string().min(1, { message: 'Password is required' }),
});

type Inputs = z.infer<typeof schema>;

export function UserLoginForm({ className, ...props }: UserAuthFormProps) {
  const methods = useForm<Inputs>({
    resolver: zodResolver(schema),
  });
  const { setToken } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [loginMutation, { loading }] = useLoginUserMutation();
  function onSubmit(data: Inputs) {
    return loginMutation({
      variables: {
        email: data.email,
        password: data.password,
      },
      onCompleted: (data) => {
        setToken(data.login);
        localStorage.setItem('token', data.login);
        router.replace('/app/dashboard');
      },
      onError: () => {
        toast({
          variant: 'destructive',
          title: 'Failed to login',
          description: 'Please check your credentials and try again.',
        });
      },
    });
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormProvider {...methods}>
          <div className="grid gap-4">
            <FormInput
              field="email"
              label="Business Email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={loading}
            />
            <FormInput
              field="password"
              label="Password"
              placeholder="********"
              type="password"
              autoComplete="new-password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={loading}
            />
            <Button disabled={loading} type="submit" loading={loading}>
              Sign In
            </Button>
          </div>
        </FormProvider>
      </form>
      {/*<div className="relative">*/}
      {/*  <div className="absolute inset-0 flex items-center">*/}
      {/*    <span className="w-full border-t" />*/}
      {/*  </div>*/}
      {/*  <div className="relative flex justify-center text-xs uppercase">*/}
      {/*    <span className="bg-background px-2 text-muted-foreground">*/}
      {/*      Or continue with*/}
      {/*    </span>*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*<Button variant="outline" type="button" disabled={loading}>*/}
      {/*  Google*/}
      {/*</Button>*/}
    </div>
  );
}
