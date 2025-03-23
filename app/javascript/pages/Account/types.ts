export interface AccountType {
  id: number
  name: string
}

export type AccountFormType = Omit<AccountType, 'id'>
