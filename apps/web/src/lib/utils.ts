import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { ApolloError } from '@apollo/client';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAbbreviation(fullName: string): string {
  const words = fullName.split(' ');
  let abbreviation = '';

  for (const word of words) {
    if (word.length > 0) {
      abbreviation += word.charAt(0).toUpperCase();
    }
  }

  return abbreviation;
}

export const getGraphqlError = (error: ApolloError) => {
  return error.graphQLErrors?.[0]?.message ?? error.message ?? 'Unknown error';
};
