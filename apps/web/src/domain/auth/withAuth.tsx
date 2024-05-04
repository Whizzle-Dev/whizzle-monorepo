'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';

export const withAuth = (Component: any) => {
  return (props: any) => {
    const { token } = useAuth();
    const router = useRouter();
    useEffect(() => {
      if (!token) {
        router.replace('/auth/login');
      }
    }, [token, router]);
    return <Component {...props} />;
  };
};
