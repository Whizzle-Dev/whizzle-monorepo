import * as DrawerPrimitives from '@radix-ui/react-dialog';
import React from 'react';
import { Icons } from '@/components/ui/icons';
import { cn } from '@/lib/utils';

/**
 * This component is based on the [Radix UI Dialog](https://www.radix-ui.com/primitives/docs/components/dialog) primitives.
 */
const DrawerRoot = (
  props: React.ComponentPropsWithoutRef<typeof DrawerPrimitives.Root>,
) => {
  return <DrawerPrimitives.Root {...props} />;
};
DrawerRoot.displayName = 'Drawer';

const DrawerTrigger = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitives.Trigger>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitives.Trigger>
>(({ className, ...props }, ref) => {
  return (
    <DrawerPrimitives.Trigger ref={ref} className={cn(className)} {...props} />
  );
});
DrawerTrigger.displayName = 'Drawer.Trigger';

const DrawerClose = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitives.Close>
>(({ className, ...props }, ref) => {
  return (
    <DrawerPrimitives.Close ref={ref} className={cn(className)} {...props} />
  );
});
DrawerClose.displayName = 'Drawer.Close';

const DrawerPortal = (props: DrawerPrimitives.DialogPortalProps) => {
  return <DrawerPrimitives.DialogPortal {...props} />;
};
DrawerPortal.displayName = 'Drawer.Portal';

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitives.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitives.Overlay>
>(({ className, ...props }, ref) => {
  return (
    <DrawerPrimitives.Overlay
      ref={ref}
      className={cn(
        'bg-ui-bg-overlay fixed inset-0',
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        className,
      )}
      {...props}
    />
  );
});
DrawerOverlay.displayName = 'Drawer.Overlay';

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitives.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitives.Content>
>(({ className, ...props }, ref) => {
  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitives.Content
        style={{
          boxShadow:
            'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
        }}
        ref={ref}
        className={cn(
          'z-50 pt-4 px-4 bg-white shadow-elevation-modal border-ui-border-base fixed inset-y-2 flex w-full flex-1 flex-col rounded-lg border focus:outline-none max-sm:inset-x-2 max-sm:w-[calc(100%-16px)] sm:right-2 sm:max-w-[560px] overflow-y-scroll',
          'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-right-1/2 data-[state=open]:slide-in-from-right-1/2 duration-200',
          className,
        )}
        {...props}
      />
    </DrawerPortal>
  );
});
DrawerContent.displayName = 'Drawer.Content';

const DrawerHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'>
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className="border-ui-border-base flex items-start justify-between gap-4 border-b px-4 py-4"
      {...props}
    >
      <div className={cn('flex flex-col', className)}>{children}</div>
      <div className="flex items-center">
        <DrawerPrimitives.Close asChild>
          <Icons.XCircle size={24} type="button" className="cursor-pointer" />
        </DrawerPrimitives.Close>
      </div>
    </div>
  );
});
DrawerHeader.displayName = 'Drawer.Header';

const DrawerBody = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn('flex-1 px-6 py-4', className)} {...props} />
  );
});
DrawerBody.displayName = 'Drawer.Body';

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        'border-ui-border-base flex items-center justify-end overflow-y-scroll border-t py-4 sticky bottom-0 bg-white',
        className,
      )}
      {...props}
    />
  );
};
DrawerFooter.displayName = 'Drawer.Footer';

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitives.Title>
>(({ className, children, ...props }, ref) => (
  <DrawerPrimitives.Title
    ref={ref}
    className={cn(className)}
    asChild
    {...props}
  >
    <span className="font-bold text-lg">{children}</span>
  </DrawerPrimitives.Title>
));
DrawerTitle.displayName = 'Drawer.Title';

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitives.Description>
>(({ className, children, ...props }, ref) => (
  <DrawerPrimitives.Description
    ref={ref}
    className={cn(className)}
    asChild
    {...props}
  >
    <span className="text-sm text-gray-500">{children}</span>
  </DrawerPrimitives.Description>
));
DrawerDescription.displayName = 'Drawer.Description';

const Drawer = Object.assign(DrawerRoot, {
  Body: DrawerBody,
  Close: DrawerClose,
  Content: DrawerContent,
  Description: DrawerDescription,
  Footer: DrawerFooter,
  Header: DrawerHeader,
  Title: DrawerTitle,
  Trigger: DrawerTrigger,
});

export { Drawer };
