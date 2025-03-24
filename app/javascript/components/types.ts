// Interface for the account data returned from GraphQL
export interface Account {
  id: string;
  name: string;
}

export interface AccountEdge {
  node: Account;
}

export interface AccountsData {
  accounts: {
    edges: AccountEdge[];
  };
}
