import { useFormContext } from 'react-hook-form';
import React from 'react';

type InputErrorProps = {
  field: string;
};
export const InputError = ({ field }: InputErrorProps) => {
  const {
    formState: { errors },
    getFieldState,
  } = useFormContext();
  const fieldState = getFieldState(field);
  const error = errors[field] || fieldState.error;
  if (!error || !error.message) return null;

  return (
    <span className="text-red-400 text-sm">{error?.message?.toString()}</span>
  );
};
