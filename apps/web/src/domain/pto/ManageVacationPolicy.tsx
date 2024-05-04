'use client';

import * as z from 'zod';
import {
  AccrualType,
  GetVacationPoliciesDocument,
  useCreateVacationPolicyMutation,
  useUpdateVacationPolicyMutation,
  VacationPolicyFragment,
} from '@/generated';
import dayjs from 'dayjs';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNotifyError } from '@/lib/hooks/useNotifyError';
import { FormInput } from '@/components/ui/form/form-input';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { InfoTooltip } from '@/components/ui/info-tooltip';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { FormSelect } from '@/components/ui/form/form-select';
import { FormCheckbox } from '@/components/ui/form/form-checkbox';
import { FormDateInput } from '@/components/ui/form/form-date-input';
import { useEffect } from 'react';
import { clsx } from 'clsx';

const schema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  categories: z.array(
    z.object({
      name: z.string().min(1, { message: 'Name is required' }),
      daysAllowed: z.coerce
        .number()
        .min(1, { message: 'Days allowed is required' }),
      accrualType: z.nativeEnum(AccrualType, {
        required_error: 'Accrual type is required',
      }),
    }),
  ),
  workday: z.object({
    MONDAY: z.boolean(),
    TUESDAY: z.boolean(),
    WEDNESDAY: z.boolean(),
    THURSDAY: z.boolean(),
    FRIDAY: z.boolean(),
    SATURDAY: z.boolean(),
    SUNDAY: z.boolean(),
  }),
  publicHolidays: z.array(
    z.object({
      name: z.string().min(1, { message: 'Holiday Name is required' }),
      date: z
        .date()
        .min(dayjs().startOf('year').toDate(), {
          message: 'Date must be from this year',
        })
        .max(dayjs().endOf('year').toDate(), {
          message: 'Date must be from this year',
        }),
    }),
  ),
});
type FormValues = z.infer<typeof schema>;
type ManageVacationPolicyProps = {
  onFinish: () => void;
  policy?: VacationPolicyFragment | null;
  mode?: 'create' | 'edit';
};
export const ManageVacationPolicy = ({
  onFinish,
  policy,
  mode = 'create',
}: ManageVacationPolicyProps) => {
  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const categoriesArray = useFieldArray({
    control: methods.control,
    name: 'categories',
  });

  const publicHolidaysArray = useFieldArray({
    control: methods.control,
    name: 'publicHolidays',
  });

  useEffect(() => {
    if (policy) {
      methods.setValue('name', policy?.name ?? '');
      methods.setValue('description', policy?.description ?? '');
      if (policy?.leaveCategories?.length) {
        categoriesArray.replace(
          policy.leaveCategories?.map((category) => ({
            name: category.name,
            daysAllowed: category.daysAllowed,
            // todo change - return this from BE
            accrualType: AccrualType.PER_YEAR_START,
          })),
        );
      }
      if (policy?.workingDays?.length) {
        const workday = DAYS.reduce((acc, day) => {
          acc[day] = !!policy.workingDays?.includes(day);
          return acc;
        }, {} as Record<typeof DAYS[number], boolean>);
        methods.setValue('workday', workday);
      }

      if (policy?.publicHolidays?.length) {
        publicHolidaysArray.replace(
          policy.publicHolidays.map((holiday) => ({
            name: holiday.name,
            date: new Date(holiday.date),
          })),
        );
      }
    }
  }, [methods, policy]);

  const [handleCreate, { loading: creating, error: createError }] =
    useCreateVacationPolicyMutation({
      refetchQueries: [GetVacationPoliciesDocument],
    });

  const [handleUpdate, { loading: updating, error: updateError }] =
    useUpdateVacationPolicyMutation({
      refetchQueries: [GetVacationPoliciesDocument],
    });

  const loading = creating || updating;
  const error = createError || updateError;
  useNotifyError(error);

  const onSubmit = (values: FormValues) => {
    if (mode === 'edit' && policy) {
      handleUpdate({
        variables: {
          input: {
            id: policy.id,
            name: values.name,
            description: values.description,
            // todo
            policyDocument: 'dummy value v2',
          },
        },
      }).then(() => {
        onFinish();
      });
      return;
    } else {
      return handleCreate({
        variables: {
          input: {
            name: values.name,
            description: values.description,
            // todo
            policyDocument: 'dummy value',
            workingDays: Object.keys(values.workday).filter(
              (key) => values.workday[key as keyof typeof values.workday],
            ),
            publicHolidays: values.publicHolidays.map((holiday) => ({
              name: holiday.name,
              date: holiday.date.toISOString(),
            })),
            leaveCategories: values.categories.map((category) => ({
              name: category.name,
              daysAllowed: category.daysAllowed,
              accrualType: category.accrualType,
            })),
          },
        },
      }).then(() => {
        methods.reset();
        onFinish();
      });
    }
  };

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      <FormProvider {...methods}>
        <div>
          <p className="text-xl">
            {mode === 'edit'
              ? 'Edit Vacation Policy'
              : 'Create Vacation Policy'}
          </p>
          <p className="text-gray-500">
            Vacation policy defines the rules for how employees can request a
            paid time leave.
          </p>
        </div>
        <div className="mt-6">
          <div className="grid gap-4">
            <FormInput field="name" label="Policy Name" placeholder="Enter" />
            <FormInput
              field="description"
              label="Policy Description"
              placeholder="Enter"
            />
            <FormInput
              field="policyDocument"
              label="Policy Document"
              placeholder="Enter"
              type="file"
            />
          </div>
          <Separator orientation="horizontal" className="my-6" />
          <div className="flex flex-row justify-between items-center mb-2">
            <div className="flex flex-row gap-2 items-center">
              <Label variant="section_label">Leave Categories</Label>
              <InfoTooltip description="Leave categories are used to group different types of leave. For example, you might have a category for sick leave, a category for vacation leave, and a category for personal leave." />
            </div>
            {mode !== 'edit' && (
              <Button
                type="button"
                variant="secondary"
                className="gap-2"
                onClick={() =>
                  categoriesArray.append({
                    name: '',
                    accrualType: AccrualType.FIXED_NUMBER_PER_YEAR,
                    daysAllowed: 0,
                  })
                }
              >
                Add <Icons.PlusIcon size={14} />
              </Button>
            )}
          </div>
          <div
            className={clsx(
              'grid grid-cols-2 gap-4 items-baseline',
              mode === 'edit' ? 'cursor-not-allowed' : '',
            )}
          >
            {categoriesArray.fields.map((field, index) => (
              <div
                key={index}
                className={clsx(
                  'grid gap-4 border-1 border-gray-100 rounded py-4 px-2 relative',
                  mode === 'edit' ? 'pointer-events-none' : '',
                )}
              >
                <FormInput
                  field={`categories.${index}.name`}
                  label="Category Name"
                  placeholder="Enter Category Name"
                />
                <FormSelect
                  field={`categories.${index}.accrualType`}
                  label="Accrual Type"
                  placeholder="Select Accrual Type"
                  items={accrualTypesItems}
                  renderItem={(item) => (
                    <FormSelect.Item key={item.value} value={item.value}>
                      {item.label}
                    </FormSelect.Item>
                  )}
                />
                <FormInput
                  field={`categories.${index}.daysAllowed`}
                  label="Number of Days"
                  placeholder="Enter Number of Days"
                  type="number"
                />

                {mode !== 'edit' && categoriesArray.fields.length > 1 && (
                  <Icons.XCircle
                    className="absolute right-2 top-2 cursor-pointer"
                    onClick={() => {
                      categoriesArray.remove(index);
                    }}
                    size={18}
                  />
                )}
              </div>
            ))}
          </div>
          <Separator orientation="horizontal" className="my-6" />
          <div className="flex flex-col">
            <Label variant="section_label">Configure Work Days</Label>
            <div className="flex flex-row gap-4 mt-4">
              {DAYS.map((day) => (
                <FormCheckbox key={day} label={day} field={`workday.${day}`} />
              ))}
            </div>
          </div>
          <Separator orientation="horizontal" className="my-6" />
          <div className="flex flex-row items-center justify-between">
            <Label variant="section_label" className="mb-2">
              Add Public Holidays
            </Label>
            {mode !== 'edit' && (
              <Button
                variant="secondary"
                className="gap-2"
                onClick={() =>
                  publicHolidaysArray.append({
                    name: '',
                    date: new Date(),
                  })
                }
                type="button"
              >
                Add <Icons.PlusIcon size={14} />
              </Button>
            )}
          </div>
          <div
            className={clsx(
              'flex flex-col flex-wrap gap-4 mt-2',
              mode === 'edit' ? 'cursor-not-allowed' : '',
            )}
          >
            {publicHolidaysArray.fields.map((field, index) => (
              <div
                className={clsx(
                  'relative',
                  mode === 'edit' ? 'pointer-events-none' : '',
                )}
                key={field.id}
              >
                <div className="grid grid-cols-2 gap-4 h-fit items-baseline pr-8">
                  <FormInput
                    field={`publicHolidays.${index}.name`}
                    label="Holiday Name"
                    placeholder="Enter Holiday Name"
                  />
                  <FormDateInput
                    field={`publicHolidays.${index}.date`}
                    label="Holiday Date"
                  />
                </div>
                {mode !== 'edit' && publicHolidaysArray.fields.length > 1 && (
                  <Icons.XCircle
                    className="absolute right-0 bottom-0 top-6 cursor-pointer"
                    onClick={() => {
                      publicHolidaysArray.remove(index);
                    }}
                    size={18}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        <Separator orientation="horizontal" className="my-6" />
        <Button type="submit" loading={loading} className="mt-6" size="lg">
          {mode === 'edit' ? 'Update' : 'Create'}
        </Button>
      </FormProvider>
    </form>
  );
};
const accrualTypesItems = [
  {
    label: 'Accrue at the start of the month',
    value: AccrualType.PER_MONTH_START,
  },
  {
    label: 'Accrue at the start of the year',
    value: AccrualType.PER_YEAR_START,
  },
  // {
  //   label: 'Fixed number per year',
  //   value: AccrualType.FIXED_NUMBER_PER_YEAR,
  // },
  // {
  //   label: 'Fixed number per month',
  //   value: AccrualType.FIXED_NUMBER_PER_MONTH,
  // },
];
const DAYS = [
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
  'SUNDAY',
] as const;
const defaultValues: FormValues = {
  categories: [
    {
      name: 'Vacation',
      daysAllowed: 10,
      accrualType: AccrualType.PER_YEAR_START,
    },
  ],
  name: '',
  workday: {
    MONDAY: true,
    TUESDAY: true,
    WEDNESDAY: true,
    THURSDAY: true,
    FRIDAY: true,
    SATURDAY: false,
    SUNDAY: false,
  },
  publicHolidays: [
    {
      name: '',
      date: new Date(),
    },
  ],
  description: '',
};
