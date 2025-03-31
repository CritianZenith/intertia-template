export interface AccountUserFormType {
  email_address: string;
  role: "admin" | "member";
  [key: string]: string;
}
