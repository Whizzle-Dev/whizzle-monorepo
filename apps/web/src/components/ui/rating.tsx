import { Label } from '@/components/ui/label';
import React from 'react';
import { Icons } from '@/components/ui/icons';

type RatingInputProps = {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
};
export const RatingInput = ({
  label,
  value,
  onValueChange,
}: RatingInputProps) => {
  const [hover, setHover] = React.useState(-1);

  return (
    <div className="grid gap-1">
      <Label>{label}</Label>
      <div className="flex flex-row">
        {Array.from({ length: MAX_VALUE }).map((_, index) => {
          const fill =
            hover !== -1
              ? hover >= index + 1
                ? 'black'
                : 'none'
              : value >= index + 1
              ? 'black'
              : 'none';
          return (
            <Icons.Star
              key={index}
              size={40}
              className="px-1 cursor-pointer"
              fill={fill}
              onClick={() => onValueChange(index + 1)}
              onMouseEnter={() => setHover(index + 1)}
              onMouseLeave={() => setHover(-1)}
            />
          );
        })}
      </div>
    </div>
  );
};

const MAX_VALUE = 5;
