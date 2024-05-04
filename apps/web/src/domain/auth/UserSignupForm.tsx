'use client';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { FormProvider, useForm } from 'react-hook-form';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { VerificationDialog } from '@/components/custom/VerificationDialog';
import { useSignupUserMutation } from '@/generated';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from '@/components/ui/form/form-input';

type SignupFormProps = React.HTMLAttributes<HTMLDivElement>;

const schema = z.object({
  email: z.string().min(1, { message: 'Email is required' }).email(),
  password: z.string().min(1, { message: 'Password is required' }),
  website: z.string().min(1, { message: 'Website is required' }),
  businessName: z.string().min(1, { message: 'Business name is required' }),
  name: z.string().min(1, { message: 'Name is required' }),
});

type FormValues = z.infer<typeof schema>;

export function UserSignupForm({ className, ...props }: SignupFormProps) {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const [signupMutation, { loading }] = useSignupUserMutation();
  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const { handleSubmit, getValues } = methods;

  const router = useRouter();
  function onSubmit(data: FormValues) {
    return signupMutation({
      variables: {
        input: {
          email: data.email,
          password: data.password,
          website: data.website,
          businessName: data.businessName,
          name: data.name,
        },
      },
      onCompleted: () => {
        setDialogOpen(true);
      },
      onError: () => {
        toast({
          variant: 'destructive',
          title: 'Failed to signup',
          description: 'Please check your credentials and try again.',
        });
      },
    });
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormProvider {...methods}>
          <div className="grid gap-4">
            <FormInput field="name" label="Name" placeholder="Mark Antony" />
            <FormInput
              field="email"
              label="Business Email"
              placeholder="name@example.com"
            />
            <FormInput
              field="password"
              label="Password"
              placeholder="********"
              type="password"
              autoComplete="new-password"
            />
            <FormInput
              field="businessName"
              label="Company Name"
              placeholder="ACME"
            />
            <FormInput field="website" label="Website" placeholder="acme.com" />
            <Button disabled={loading} loading={loading}>
              Continue
            </Button>
          </div>
        </FormProvider>
      </form>
      <VerificationDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onError={() => {
          toast({
            variant: 'destructive',
            title: 'Failed to verify',
            description: 'Invalid verification code',
          });
        }}
        onSuccess={() => {
          setDialogOpen(false);
          router.push('/app/dashboard');
        }}
        email={getValues('email')}
        password={getValues('password')}
      />
    </div>
  );
}
