import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Icons } from '@/components/ui/icons';
import { ReactNode } from 'react';
import { LucideProps } from 'lucide-react';

type InfoTooltipProps = {
  description: string | ReactNode;
  iconProps?: LucideProps;
};
export const InfoTooltip = ({ description, iconProps }: InfoTooltipProps) => {
  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Icons.Info className="cursor-pointer" size={16} {...iconProps} />
        </TooltipTrigger>
        <TooltipContent className="max-w-[400px]">{description}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
