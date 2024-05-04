import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import {
  Select,
  SelectContent,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectItem,
} from '@/components/ui/select';
import { useGetVacationPoliciesQuery } from '@/generated';
import { useState } from 'react';

export const LeaveCategoriesView = () => {
  const { data } = useGetVacationPoliciesQuery();
  const [selectedPolicy, setSelectedPolicy] = useState<string | undefined>(
    undefined,
  );
  return (
    <>
      <div className="flex-1">
        <div className="flex justify-between">
          <h3 className="text-2xl">Leave Categories</h3>

          <Button className="flex flex-row gap-2">
            Create <Icons.PlusIcon size={18} />
          </Button>
        </div>
        <div className="gap-4 flex flex-col mt-8">
          <Select value={selectedPolicy} onValueChange={setSelectedPolicy}>
            <SelectTrigger className="w-[320px]">
              <SelectValue placeholder="Select a vacation policy" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Vacation Policies</SelectLabel>
                {data?.vacationPolicies.map((policy) => (
                  <SelectItem key={policy.id} value={policy.id.toString()}>
                    {policy.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
};
