export interface UserType {
  id: number;
  email_address: string;
  name: string | null;
  bio: string | null;
}

export type UserFormType = Pick<UserType, "name" | "bio">;
