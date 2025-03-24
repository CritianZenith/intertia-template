import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ApolloProvider } from '@apollo/client';

// Utility to get a cookie by name (safely checks for document existence)
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
}

// Create an http link to the GraphQL endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
  credentials: 'same-origin', // Include cookies for session authentication
});

// Add auth headers (including CSRF token) to each request
const authLink = setContext((_, { headers }) => {
  // Check if document is available (for SSR)
  if (typeof document === 'undefined') {
    return { headers };
  }
  
  // First try to get the token from meta tag
  let csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
  
  // If meta tag token is missing, try to get the XSRF-TOKEN cookie that Rails sets
  if (!csrfToken) {
    csrfToken = getCookie('XSRF-TOKEN');
  }
  
  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      'X-CSRF-Token': csrfToken || '',
    }
  };
});

// Create the Apollo Client with both links
export const client = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
});

// Apollo Provider component for wrapping the application
export function ApolloClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
} 