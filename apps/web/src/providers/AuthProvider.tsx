'use client';

import { useToast } from '@/components/ui/use-toast';
import { emitter } from '@/domain/auth/logoutEvent';
import createCtx from '@/lib/create-ctx';
import { useApolloClient } from '@apollo/client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';

interface IAuthContextProvider {
  token: string | null;
  setToken: (token: string | null) => void;
}
export const [useAuth, AuthContextProvider] = createCtx<IAuthContextProvider>(
  'AuthContextProvider',
);

type AuthProviderProps = {
  children: React.ReactNode;
};
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const client = useApolloClient();
  const { toast } = useToast();
  const { replace } = useRouter();

  const [token, setToken] = useState<string | null>(
    typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  );

  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token],
  );

  useEffect(() => {
    const handler = (payload?: { controlled?: boolean }) => {
      setToken(null);
      client.clearStore();
      replace('/auth/login');
      localStorage.removeItem('token');
      if (!payload?.controlled) {
        toast({
          title: 'Sessions Expired',
          description: 'You have been logged out.',
          variant: 'destructive',
        });
      }
    };

    emitter.on('logout', handler);

    return () => {
      emitter.off('logout', handler);
    };
  }, [client, replace, toast]);

  return (
    <AuthContextProvider.Provider value={contextValue}>
      {children}
    </AuthContextProvider.Provider>
  );
};
