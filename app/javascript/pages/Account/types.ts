export interface AccountType {
  id: number;
  name: string;
  users_count?: number;
  avatar_url?: string | null;
  // Future fields (commented out until implemented in backend)
  // type?: string;
  // status?: 'active' | 'inactive' | 'pending';
  // createdAt?: string;
  // updatedAt?: string;
}

export interface AccountFormType {
  name: string;
  avatar: File | null;
  [key: string]: string | File | null; // More specific index signature
}

// For future use with permissions
export interface AccountUserType {
  id: number;
  userId: number;
  accountId: number;
  role: "admin" | "member" | "viewer";
  // permissions?: string[];
}
