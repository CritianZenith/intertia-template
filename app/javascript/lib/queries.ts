import { gql } from "@apollo/client";

// Query to get all accounts the current user has access to
export const GET_ACCOUNTS = gql`
  query GetAccounts {
    accounts {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

// Query to get current user information
export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    me {
      id
      emailAddress
    }
  }
`;
