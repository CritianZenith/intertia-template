export interface AccountType {
  id: number;
  name: string;
  // Future fields (commented out until implemented in backend)
  // type?: string;
  // status?: 'active' | 'inactive' | 'pending';
  // createdAt?: string;
  // updatedAt?: string;
}

export type AccountFormType = Omit<AccountType, "id">;

// For future use with permissions
export interface AccountUserType {
  id: number;
  userId: number;
  accountId: number;
  role: "admin" | "member" | "viewer";
  // permissions?: string[];
}
