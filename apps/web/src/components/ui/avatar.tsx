import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cva, VariantProps } from 'class-variance-authority';
import { cn, getAbbreviation } from '@/lib/utils';

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
      className,
    )}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn(
      'aspect-square h-full w-full object-contain bg-gray-200',
      className,
    )}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center rounded-full bg-muted',
      className,
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };

type EmployeeAvatarProps = {
  src?: string | null;
  name?: string | null;
  className?: string;
} & VariantProps<typeof avatarVariants>;

const avatarVariants = cva('text-base font-normal', {
  variants: {
    size: {
      small: 'h-6 w-6 text-xs',
      regular: 'h-8 w-8',
    },
  },
  defaultVariants: {
    size: 'regular',
  },
});

export const EmployeeAvatar = ({
  src,
  name,
  size,
  className,
}: EmployeeAvatarProps) => {
  return (
    <Avatar className={cn(avatarVariants({ size }), className)}>
      <AvatarImage src={src ?? ''} alt="Avatar" />
      <AvatarFallback>{getAbbreviation(name ?? '')}</AvatarFallback>
    </Avatar>
  );
};
