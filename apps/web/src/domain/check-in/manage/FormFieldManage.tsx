import { FormElementTypes, FormValues } from '@/domain/check-in/manage/types';
import { FormProvider, useFieldArray, UseFormReturn } from 'react-hook-form';
import { FormInput } from '@/components/ui/form/form-input';
import { FormSelect } from '@/components/ui/form/form-select';
import { Icons } from '@/components/ui/icons';
import { CheckBoxInputQuestion } from '@/domain/check-in/manage/CheckBoxInputQuestion';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from '@hello-pangea/dnd';

const typeItems: Array<{ value: FormElementTypes; label: string }> = [
  { value: 'short_answer', label: 'Short Answer' },
  { value: 'long_answer', label: 'Long Answer' },
  { value: 'rating', label: 'Rating' },
];
type FormFieldManageProps = {
  methods: UseFormReturn<FormValues>;
};
export const FormFieldManage = ({ methods }: FormFieldManageProps) => {
  const { fields, append, remove, swap } = useFieldArray({
    control: methods.control,
    name: 'formElements',
  });

  function onDragStart() {
    if (window.navigator.vibrate) {
      window.navigator.vibrate(100);
    }
  }

  function onDragEnd(result: DropResult) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    swap(result.source.index, result.destination.index);
  }

  return (
    <>
      <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <Droppable
          droppableId="droppable-test-id"
          mode="standard"
          direction="vertical"
        >
          {(provided) => {
            return (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex flex-col gap-4"
              >
                {fields.map((field, index) => (
                  <Draggable
                    key={field.id}
                    draggableId={field.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="flex flex-col border-1 border-solid border-gray-200 p-4 rounded"
                        key={index}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <FormProvider {...methods}>
                          <div className="grid gap-4">
                            <FormInput
                              label="Question"
                              field={`formElements.${index}.question`}
                            />
                            <FormSelect
                              label="Answer Input Type"
                              field={`formElements.${index}.type`}
                              items={typeItems}
                              renderItem={(item) => (
                                <FormSelect.Item
                                  key={item.value}
                                  value={item.value}
                                >
                                  {item.label}
                                </FormSelect.Item>
                              )}
                            />
                            <CheckBoxInputQuestion
                              field={`formElements.${index}.type`}
                              control={methods.control}
                            />

                            <div className="flex flex-row-reverse gap-2">
                              <button
                                className="border-1 rounded p-1 border-red-400"
                                onClick={() => remove(index)}
                              >
                                <Icons.Trash2
                                  size={20}
                                  className="stroke-red-400"
                                />
                              </button>
                              <button
                                className="border-1 rounded p-1 border-gray-800"
                                onClick={() => console.log(index)}
                              >
                                <Icons.Move
                                  size={20}
                                  className="stroke-gray-800 cursor-grab"
                                />
                              </button>
                            </div>
                          </div>
                        </FormProvider>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      </DragDropContext>
      <button
        className="flex justify-center items-center w-full h-20 border-dashed border-2 rounded text-gray-500 gap-2 cursor-pointer mt-4"
        onClick={() => {
          append({
            type: 'short_answer',
            question: '',
          });
        }}
      >
        <Icons.PlusIcon size={16} />
        <span className="text-gray-500">Add form element</span>
      </button>
    </>
  );
};
