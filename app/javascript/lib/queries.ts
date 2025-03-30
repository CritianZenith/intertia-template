import { gql } from "@apollo/client";

// Query to get all accounts the current user has access to
export const GET_ACCOUNTS = gql`
  query GetAccounts {
    accounts {
      edges {
        node {
          id
          internalId
          name
        }
      }
    }
  }
`;

export const GET_CURRENT_ACCOUNT = gql`
  query GetCurrentAccount {
    currentAccount {
      id
      internalId
      name
    }
  }
`;

// Query to get current user information
export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    me {
      internalId
      emailAddress
    }
  }
`;
