import { useFormContext } from 'react-hook-form';
import { Label } from '../label';
import { cn } from '@/lib/utils';
import { Textarea } from '../textarea';
import { InputError } from '@/components/ui/form/input-error';

type FormTextAreaProps = {
  field: string;
  label: string;
  placeholder?: string;
} & Omit<React.InputHTMLAttributes<HTMLTextAreaElement>, 'children'>;

export const FormTextArea = ({
  field,
  label,
  placeholder,
  ...rest
}: FormTextAreaProps) => {
  const { register, formState } = useFormContext();
  const hasError = formState.errors[field] && formState.errors[field]?.message;
  return (
    <div className="grid gap-1">
      <Label htmlFor={field}>{label}</Label>
      <Textarea
        className={cn(hasError ? 'border-red-400' : null)}
        placeholder={placeholder}
        {...register(field)}
        {...rest}
      />
      <InputError field={field} />
    </div>
  );
};
