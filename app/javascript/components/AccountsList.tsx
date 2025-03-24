import { useSuspenseQuery } from "@apollo/client";
import { GET_ACCOUNTS } from "~/lib/queries";
import { Avatar } from "~/components/ui/avatar";
import { SidebarItem, SidebarLabel, SidebarHeading, SidebarSection } from "~/components/ui/sidebar";
import { PlusIcon } from "@heroicons/react/16/solid";
import { AccountsData } from "./types";

interface AccountsListProps {
  className?: string;
  heading?: string;
}

export function AccountsList({ 
  className,
  heading = "Your Accounts" 
}: AccountsListProps) {
  // Fetch accounts using Suspense-compatible query
  const { data } = useSuspenseQuery<AccountsData>(GET_ACCOUNTS);
  
  // Extract accounts from the data
  const accounts = data?.accounts?.edges?.map(edge => edge.node) || [];

  return (
    <SidebarSection className={className}>
      <SidebarHeading>{heading}</SidebarHeading>
      {accounts.map((account) => (
        <SidebarItem key={account.id} href="#">
          <Avatar initials={account.name.charAt(0)} />
          <SidebarLabel>{account.name}</SidebarLabel>
        </SidebarItem>
      ))}
      <SidebarItem href="/accounts/new">
        <PlusIcon />
        <SidebarLabel>New account</SidebarLabel>
      </SidebarItem>
    </SidebarSection>
  );
} 