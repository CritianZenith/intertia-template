export interface UserType {
  id: number;
  email_address: string;
  name: string | null;
  bio: string | null;
  avatar_url: string | null;
}

export type UserFormType = {
  name: string | null;
  bio: string | null;
  avatar: File | null;
  [key: string]: any;
}
