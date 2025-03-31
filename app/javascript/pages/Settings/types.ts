export interface SettingsAccountType {
  id: number;
  name: string;
  users_count: number;
  avatar_url: string | null;
}

export interface SettingsFormType {
  name: string;
  avatar: File | null;
  [key: string]: string | File | null;
}

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
