'use client';

import React from 'react';
import { ApolloClient, ApolloProvider } from '@apollo/client';

type ApolloProviderWrapperProps = {
  client: ApolloClient<any>;
  children: React.ReactNode;
};
export const ApolloProviderWrapper = ({
  client,
  children,
}: ApolloProviderWrapperProps) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
