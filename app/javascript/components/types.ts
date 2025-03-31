// Interface for the account data returned from GraphQL
export interface Account {
  id: string;
  internalId: number;
  name: string;
  avatarUrl?: string | null;
}

export interface AccountEdge {
  node: Account;
}

export interface AccountsData {
  accounts: {
    edges: AccountEdge[];
  };
}

export interface CurrentAccountData {
  currentAccount: Account;
}
