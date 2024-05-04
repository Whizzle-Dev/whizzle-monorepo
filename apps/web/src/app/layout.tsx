import React from 'react';
import '@/styles/globals.css';
import { Toaster } from '@/components/ui/toaster';

import { AuthProvider } from '@/providers/AuthProvider';
import { apolloClient } from '@/lib/api/apollo';
import { ApolloProviderWrapper } from '@/app/apollo-provider';

import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev';

if (process.env.NODE_ENV === 'development') {
  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ApolloProviderWrapper client={apolloClient}>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ApolloProviderWrapper>
      </body>
    </html>
  );
}
