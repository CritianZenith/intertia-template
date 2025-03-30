export interface UserType {
  id: number;
  email_address: string;
  name: string | null;
}

export interface AccountUserType {
  id: number;
  role: "admin" | "member";
  user: UserType;
}

export interface AccountUserFormType {
  email_address: string;
  role: "admin" | "member";
} 