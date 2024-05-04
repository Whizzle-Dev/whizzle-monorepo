'use client';

import { TaskFragment, useGetProjectsQuery } from '@/generated';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EmployeeAvatar } from '@/components/ui/avatar';
import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { useDragAndDrop } from '@formkit/drag-and-drop/react';
import { animations } from '@formkit/drag-and-drop';
import { IconMenu } from '@/components/ui/menues/icon-menu';
import { Icons } from '@/components/ui/icons';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/menues/dropdown-menu';
import { useEmployeeSelectOptions } from '@/domain/shared/useEmployeeSelectOptions';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

type BoardColumnProps = {
  title: string;
  value: string;
  tasks: TaskFragment[];
  onCreateTask: () => void;
  onOpenTask: (task: TaskFragment) => void;
  handleUpdateStatus: (taskId: string, newStatus: string) => void;
  handleRemoveColumn: (value: string) => void;
  handleUpdatePosition: (
    taskId: string,
    prevCursor: string | undefined | null,
    nextCursor: string | undefined | null,
  ) => void;
};
export const BoardColumn = ({
  title,
  tasks: initialTasks,
  onCreateTask,
  handleUpdateStatus,
  value,
  onOpenTask,
  handleRemoveColumn,
  handleUpdatePosition,
}: BoardColumnProps) => {
  const [parent, tasks, setTasks] = useDragAndDrop<
    HTMLUListElement,
    TaskFragment
  >(initialTasks, {
    group: 'tasks',
    plugins: [animations()],
    handleEnd(data) {
      const newStatus = data.targetData.parent.el.dataset.column;
      const taskId = data.targetData.node.el.dataset.taskid;
      const currentTaskindex = data.targetData.node.data.index;
      const allNodes = data.targetData.parent.data.enabledNodes;
      // get previous and next element of this task
      const previousElement = allNodes[currentTaskindex - 1];
      const nextElement = allNodes[currentTaskindex + 1];
      if (newStatus && taskId) {
        handleUpdateStatus(taskId, newStatus);
      }
      if (taskId) {
        handleUpdatePosition(
          taskId,
          previousElement?.data?.value?.rank,
          nextElement?.data?.value?.rank,
        );
      }
    },
  });

  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  return (
    <div className="flex flex-col min-w-[280px]">
      <div className="flex flex-row justify-between items-center mb-2">
        <span className="text-gray-900">
          {title} <span className="text-gray-500">({tasks.length})</span>
        </span>

        <IconMenu
          icon={<Icons.MoreHorizontal size={14} className="text-gray-500" />}
          items={[
            {
              label: 'Remove',
              onClick: () => handleRemoveColumn(value),
              icon: <DropdownMenuShortcut>⌫</DropdownMenuShortcut>,
              className: 'text-red-500',
            },
          ]}
          buttonSize="iconSmall"
          buttonVariant="ghost"
        />
      </div>
      <ul
        className="flex flex-col gap-2 bg-gray-100 rounded-xl p-4"
        ref={parent}
        data-column={value}
      >
        {tasks?.map((task) => (
          <li
            key={task.id + 'li'}
            data-taskId={task.id}
            onClick={() => onOpenTask(task)}
          >
            <BoardCard task={task} key={task.id + 'card'} />
          </li>
        ))}
      </ul>
      <Button
        variant="ghost"
        size="sm"
        className="gap-2 items-center text-gray-600 mt-2 w-fit"
        onClick={onCreateTask}
      >
        New Task
        <Icons.PlusIcon size={14} className="text-gray-500" />
      </Button>
    </div>
  );
};
type BoardCardProps = {
  task: TaskFragment;
};
const BoardCard = ({ task }: BoardCardProps) => {
  return (
    <Card className="w-[250px] cursor-pointer hover:bg-gray-50 hover:shadow-lg">
      <CardHeader className="p-4 space-y-0">
        <CardTitle>{task.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-0 px-4 pb-4">
        <div className="flex items-center justify-end">
          {task.assignedToEmployee ? (
            <EmployeeAvatar
              src={task.assignedToEmployee.profilePhotoUrl}
              name={task.assignedToEmployee.name}
            />
          ) : (
            <EmployeeAvatar src="/circle-user-round.svg" name="" />
          )}
        </div>
      </CardContent>
    </Card>
  );
};
type ProjectSelectProps = {
  selected: string;
};
// todo think about having a reusable component for the select with search
export const ProjectSelect = ({ selected: value }: ProjectSelectProps) => {
  const [searchInput, setSearchInput] = React.useState('');
  const { data } = useGetProjectsQuery();
  const projects =
    data?.projects.map((project) => ({
      label: project.name,
      value: project.id.toString(),
      color: project.color,
    })) ?? [];

  const [open, setOpen] = React.useState(false);

  const selectedProject = projects.find(
    (framework) => framework.value === value,
  );

  const router = useRouter();
  const pathname = usePathname();

  const searchedProjects = projects.filter((project) =>
    project.label.toLowerCase().includes(searchInput.toLowerCase()),
  );
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between"
        >
          <div className="flex items-center gap-2">
            {value ? selectedProject?.label : 'Select Project'}
            <div
              className="rounded-full w-3 h-3 flex-grow-0 flex-shrink-0"
              style={{ background: selectedProject?.color }}
            ></div>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search projects..."
            value={searchInput}
            onValueChange={setSearchInput}
          />
          <CommandEmpty>No projects found.</CommandEmpty>
          <CommandGroup>
            {searchedProjects.map((project) => (
              <CommandItem
                key={project.value}
                aria-label={project.label}
                value={project.value}
                onSelect={(currentValue: string) => {
                  if (pathname.endsWith('backlog')) {
                    router.replace(
                      `/app/dashboard/project-management/projects?id=${currentValue}&isBacklog=true`,
                    );
                  } else {
                    router.replace(
                      `/app/dashboard/project-management/projects?id=${currentValue}`,
                    );
                  }
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === project.value ? 'opacity-100' : 'opacity-0',
                  )}
                />
                {project.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
type AssigneeFilterProps = {
  selectedEmployees: number[];
  setSelectedEmployees: (ids: number[]) => void;
};
export const AssigneeFilter = ({
  selectedEmployees,
  setSelectedEmployees,
}: AssigneeFilterProps) => {
  const employees = useEmployeeSelectOptions();

  const onChange = (item: { value: number; label: string }) => {
    if (selectedEmployees.includes(item.value)) {
      setSelectedEmployees(selectedEmployees.filter((id) => id !== item.value));
    } else {
      setSelectedEmployees([...selectedEmployees, item.value]);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Icons.Filter size={16} className="text-gray-500" />
          Assigned To
          {selectedEmployees.length > 0 && (
            <>
              <Separator className="" orientation="vertical" />
              <div className="flex flex-row gap-1 items-center">
                {selectedEmployees.map((id) => {
                  const e = employees.find((employee) => employee.value === id);
                  return (
                    <EmployeeAvatar
                      key={e?.value}
                      size="small"
                      name={e?.label}
                      src={e?.avatarUrl}
                    />
                  );
                })}
              </div>
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[300px]">
        <ScrollArea maxHeight={300}>
          <DropdownMenuGroup>
            {employees.map((employee) => (
              <DropdownMenuCheckboxItem
                key={employee.value}
                className="capitalize gap-4 items-center"
                checked={selectedEmployees.includes(employee.value)}
                onCheckedChange={() => onChange(employee)}
                onSelect={(e) => e.preventDefault()}
              >
                <EmployeeAvatar
                  size="small"
                  name={employee.label}
                  src={employee.avatarUrl}
                />
                <span>{employee.label}</span>
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuGroup>
        </ScrollArea>
        <DropdownMenuGroup className="border-t-gray-200 border-t-1">
          <div className="flex items-center gap-4 justify-end p-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setSelectedEmployees([])}
            >
              Clear
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setSelectedEmployees(employees.map((e) => e.value));
              }}
            >
              Select All
            </Button>
          </div>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
