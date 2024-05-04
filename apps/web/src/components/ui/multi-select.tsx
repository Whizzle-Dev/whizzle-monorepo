import { useCallback, useId, useMemo, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { keyBy, Dictionary } from 'lodash';
import { Command } from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';

import { useClickAway } from '@uidotdev/usehooks';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

export type ValueType = string | number;
export interface MultiSelectOption<T> {
  value: T;
  label: string;
}

export interface MultiSelectProps<T extends ValueType> {
  value?: T[] | null;
  options: MultiSelectOption<T>[];
  searchPlaceholder?: string;
  onChange: (selected: T[]) => void;
}

export const MultiSelect = <T extends ValueType>({
  value,
  options,
  searchPlaceholder = 'Select more...',
  onChange,
}: MultiSelectProps<T>) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);

  const selected = useMemo(() => {
    if (!value) return [];

    const optionsMap = keyBy(options, 'value');

    return value.map((value) => optionsMap[value]).filter(Boolean);
  }, [value, options]);

  const [inputValue, setInputValue] = useState('');

  const selectedMap = keyBy(selected, 'value');
  const handleSelect = useCallback(
    (option: MultiSelectOption<T>) => {
      setInputValue('');

      if (!selectedMap[option.value]) {
        onChange(value ? [...value, option.value] : [option.value]);
      }
    },
    [selectedMap, onChange, value],
  );

  const handleUnselect = useCallback(
    (option: MultiSelectOption<T>) => {
      onChange(
        selected
          .filter((selectedOption) => selectedOption.value !== option.value)
          .map((option) => option.value),
      );
    },
    [selected, onChange],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === 'Delete' || e.key === 'Backspace') {
          if (input.value === '') {
            selected.pop();
            onChange(selected.map((option) => option.value));
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === 'Escape') {
          input.blur();
        }
      }
    },
    [selected, onChange],
  );

  const selectables = useMemo(() => {
    return options.filter((option) =>
      inputValue
        ? option.label
            .toLocaleLowerCase()
            .includes(inputValue.toLocaleLowerCase())
        : true,
    );
  }, [options, inputValue]);

  const containerRef = useClickAway(() => {
    setOpen(false);
  });

  return (
    <Popover open={open}>
      <Command
        onKeyDown={handleKeyDown}
        className="overflow-visible bg-transparent"
      >
        <PopoverTrigger asChild>
          <div className="border-input ring-offset-background focus-within:ring-ring min-10 group flex items-center rounded-md border py-2 text-sm focus-within:ring-1 focus-within:ring-offset-1">
            <div className="flex flex-wrap gap-2 px-2 w-full">
              {selected.map((option) => {
                return (
                  <Badge key={option.value} className="h-6">
                    {option.label}
                    <button
                      className="ring-offset-background focus:ring-ring ml-1 rounded-full outline-none focus:ring-2 focus:ring-offset-2"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && option) {
                          handleUnselect(option);
                        }
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onClick={() => option && handleUnselect(option)}
                    >
                      <X className="hover:text-muted-foreground h-3 w-3 text-white" />
                    </button>
                  </Badge>
                );
              })}
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={searchPlaceholder}
                className="h-full border-none w-full shadow-none"
                autoFocus={false}
                onFocus={() => setOpen(true)}
              />
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent
          style={{
            width: 'var(--radix-popover-trigger-width)',
          }}
          ref={containerRef as any}
          className="px-4 py-2"
        >
          <ScrollArea maxHeight={300}>
            {selectables.length ? (
              selectables.map((option) => {
                return (
                  <MultiSelectSelectableItem
                    handleSelect={handleSelect}
                    handleUnselect={handleUnselect}
                    option={option}
                    selectedMap={selectedMap}
                    key={'selectable-' + option.value}
                  />
                );
              })
            ) : (
              <p className="text-muted-foreground text-center text-xs py-2">
                Options not found.
              </p>
            )}
          </ScrollArea>
        </PopoverContent>
      </Command>
    </Popover>
  );
};

type MultiSelectSelectableItemProps<T extends ValueType> = {
  option: MultiSelectOption<T>;
  selectedMap: Dictionary<
    TSReset.NonFalsy<Dictionary<MultiSelectOption<T>>[T]>
  >;
  handleSelect: (option: MultiSelectOption<T>) => void;
  handleUnselect: (option: MultiSelectOption<T>) => void;
};
const MultiSelectSelectableItem = <T extends ValueType>({
  option,
  selectedMap,
  handleSelect,
  handleUnselect,
}: MultiSelectSelectableItemProps<T>) => {
  const checkBoxId = useId();
  return (
    <Command
      key={option.value}
      className="relative flex select-none items-center rounded-sm py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-pointer hover:bg-gray-50"
    >
      <label
        className="flex flex-row items-center w-full cursor-pointer"
        htmlFor={checkBoxId}
      >
        <Checkbox
          id={checkBoxId}
          className="mr-2"
          checked={!!selectedMap[option.value]}
          onCheckedChange={(checked) => {
            if (checked) {
              handleSelect(option);
            } else {
              handleUnselect(option);
            }
          }}
        />
        <span>{option.label}</span>
      </label>
    </Command>
  );
};
