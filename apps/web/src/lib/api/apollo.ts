'use client';

import { setContext } from '@apollo/client/link/context';
import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { emitter } from '@/domain/auth/logoutEvent';

const createClient = () => {
  const logoutLink = onError(({ graphQLErrors, operation, forward }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        if (
          err.extensions.code === 'FORBIDDEN' ||
          err.extensions.code === 'UNAUTHENTICATED'
        ) {
          emitter.emit('logout', { controlled: false });
        }
        return forward(operation);
      }
    }
  });

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        ...headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    };
  });
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([
      logoutLink,
      authLink,
      createHttpLink({ uri: process.env.NEXT_PUBLIC_API_URL + 'graphql' }),
    ]),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
      },
    },
    connectToDevTools: true,
  });
};

export const apolloClient = createClient();
