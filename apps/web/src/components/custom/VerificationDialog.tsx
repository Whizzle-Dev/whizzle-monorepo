import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { FormProvider, useForm } from 'react-hook-form';
import { useVerificationMutation } from '@/domain/auth/useVerification';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from '@/components/ui/form/form-input';

type VerificationDialogProps = {
  onError: () => void;
  onSuccess: () => void;
  email: string;
  password: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const VerificationDialog = ({
  onError,
  onSuccess,
  email,
  password,
  open,
  onOpenChange,
}: VerificationDialogProps) => {
  const formMethods = useForm<FormValues>({
    resolver: zodResolver(schema),
  });
  const { handleSubmit, reset } = formMethods;
  const { handleVerify, loading } = useVerificationMutation(email, password);
  const onSubmit = (values: FormValues) => {
    return handleVerify(values.verificationCode)
      .then(() => {
        reset();
        onSuccess();
      })
      .catch(() => {
        onError();
      });
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Successfully created a new account</DialogTitle>
          <DialogDescription>
            To proceed further, please provide verification code from your email
            address.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormProvider {...formMethods}>
            <FormInput
              field="verificationCode"
              className="mb-4"
              placeholder="Verification code"
              label="Verification code"
            />
          </FormProvider>
          <DialogFooter>
            <Button type="submit" loading={loading}>
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

type FormValues = z.infer<typeof schema>;

const schema = z.object({
  verificationCode: z.string().min(6),
});
