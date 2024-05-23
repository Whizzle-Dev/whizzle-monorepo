'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FormInput } from '@/components/ui/form/form-input';
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { DialogClose } from '@/components/plate-ui/dialog';

const schema = z.object({
  email: z.string().min(1, { message: 'Email is required' }).email(),
  name: z.string().min(1, { message: 'Name is required' }),
  company: z.string().min(1, { message: 'Company Name is required' }),
});

type FormValues = z.infer<typeof schema>;
export const PrivateBetaDialog = () => {
  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
  });
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const { handleSubmit, reset } = methods;

  function onSubmit(data: FormValues) {
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('name', data.name);
    formData.append('company', data.company);
    setLoading(true);
    fetch('https://formspree.io/f/xayrzjra', {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          toast({
            variant: 'default',
            title: 'We received your request!',
            description:
              'Please watch your email inbox for further instructions.',
          });
          reset();
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="xl" variant="brand">
          Private Beta Access
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Private Beta Access</DialogTitle>
          <DialogDescription>
            Provide the details below to apply for private beta access.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormProvider {...methods}>
            <div className="grid gap-4 mb-4">
              <FormInput
                placeholder="Enter email"
                field="email"
                label="Email"
              />
              <FormInput
                placeholder="Enter name"
                field="name"
                label="Full Name"
              />
              <FormInput
                placeholder="Enter company"
                field="company"
                label="Company"
              />
            </div>
            <DialogFooter>
              <DialogClose>
                <Button type="submit" loading={loading}>
                  Submit
                </Button>
              </DialogClose>
            </DialogFooter>
          </FormProvider>
        </form>
      </DialogContent>
    </Dialog>
  );
};
