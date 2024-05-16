import { useRouter } from 'next/navigation';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn, getAbbreviation } from '@/lib/utils';
import {
  Command,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import React from 'react';

type ProfilePopoverProps = {
  profileImageUrl?: string | null;
  data: any;
  onLogout: () => void;
};
export const ProfilePopover = ({
  profileImageUrl,
  data,
  onLogout,
}: ProfilePopoverProps) => {
  const router = useRouter();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={cn(
            'justify-between h-fit hover:border-solid box-border px-2 pb-2 pt-2 mb-4 hover:border-primary-4 hover:bg-gray-100 w-full text-left rounded-md border-0 border-b-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-4 focus:ring-opacity-50',
          )}
        >
          <div className="flex flex-row items-center">
            {profileImageUrl ? (
              <img
                className="rounded-[8px] mr-3 w-[40px] h-[40px] object-cover"
                src={profileImageUrl}
                alt="profile image"
              />
            ) : (
              <div className="w-[40px] h-[40px] rounded-[8px] mr-3 flex items-center justify-center border-1">
                {data?.currentUser.name &&
                  getAbbreviation(data.currentUser.name)}
              </div>
            )}
            <div className="flex flex-col text-left">
              <p className="text-xs font-bold">{data?.currentUser.name}</p>
              <p className="text-xs text-gray-500">{data?.currentUser.email}</p>
            </div>
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" data-side="right">
        <Command>
          <CommandList>
            <CommandItem onSelect={() => router.push('/app/dashboard/profile')}>
              View Profile
            </CommandItem>
            <CommandItem onSelect={onLogout}>Log out</CommandItem>
          </CommandList>
          <CommandSeparator />
        </Command>
      </PopoverContent>
    </Popover>
  );
};
