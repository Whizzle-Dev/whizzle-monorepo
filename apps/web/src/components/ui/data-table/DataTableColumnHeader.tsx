import { Column } from '@tanstack/react-table';

import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/menues/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const isFirst = column.getIsFirstColumn();
  return (
    <div
      className={cn(
        'flex items-center space-x-2',
        className,
        isFirst ? 'ml-2' : '-ml-1',
      )}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="default"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span>{title}</span>
            {column.getCanSort() ? (
              <>
                {column.getIsSorted() === 'desc' ? (
                  <Icons.SortDesc className="ml-2 h-4 w-4" />
                ) : column.getIsSorted() === 'asc' ? (
                  <Icons.SortAsc className="ml-2 h-4 w-4" />
                ) : (
                  <Icons.Menu className="ml-2 h-4 w-4" />
                )}
              </>
            ) : (
              (column.getCanHide() || column.getCanGroup()) && (
                <Icons.Menu className="ml-2 h-4 w-4" />
              )
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {column.getCanSort() && (
            <>
              <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
                <Icons.SortAsc className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                Asc
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
                <Icons.SortDesc className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                Desc
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <Icons.EyeOff className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Hide
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleGrouping()}>
            <Icons.Component className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            {column.getIsGrouped() ? 'Ungroup' : 'Group By'}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
