'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';

export const RedirectOnLogin = () => {
  const router = useRouter();

  const { token } = useAuth();
  if (token) {
    router.push('/app/dashboard');
  }
  return null;
};
