import { ApolloClient, InMemoryCache } from '@apollo/client';
import { GRAPHQL_API } from './constants/Hosts';

export const client = new ApolloClient({
  uri: `http://${GRAPHQL_API}`,
  cache: new InMemoryCache()
});