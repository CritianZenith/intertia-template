import { useQuery } from "@apollo/client";
import { GET_ACCOUNTS } from "~/lib/queries";
import { Avatar } from "~/components/ui/avatar";
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from "~/components/ui/dropdown";
import { SidebarItem, SidebarLabel } from "~/components/ui/sidebar";
import { PlusIcon, ChevronDownIcon } from "@heroicons/react/16/solid";
import { MenuItemsProps } from "@headlessui/react";
import React from "react";
import { AccountsData } from "./types";

type AnchorProps = MenuItemsProps["anchor"];

interface AccountsDropdownProps {
  anchor?: AnchorProps;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  as?: React.ComponentType<any>;
  buttonClassName?: string;
}

export function AccountsDropdown({
  anchor = "bottom start",
  className = "min-w-80 lg:min-w-64",
  as = SidebarItem,
  buttonClassName,
}: AccountsDropdownProps) {
  // Fetch accounts from GraphQL
  const { loading, error, data } = useQuery<AccountsData>(GET_ACCOUNTS);
  
  // Extract accounts from the data if available
  const accounts = data?.accounts?.edges?.map(edge => edge.node) || [];

  return (
    <Dropdown>
      <DropdownButton as={as} className={buttonClassName}>
        <Avatar initials={accounts.length > 0 ? accounts[0].name.charAt(0) : "M"} />
        <SidebarLabel>{accounts.length > 0 ? accounts[0].name : "Loading..."}</SidebarLabel>
        <ChevronDownIcon />
      </DropdownButton>
      <DropdownMenu
        className={className}
        anchor={anchor}
      >
        {loading && (
          <DropdownItem disabled>
            <DropdownLabel>Loading accounts...</DropdownLabel>
          </DropdownItem>
        )}
        
        {error && (
          <DropdownItem disabled>
            <DropdownLabel>Error loading accounts</DropdownLabel>
          </DropdownItem>
        )}
        
        {!loading && !error && accounts.map((account) => (
          <DropdownItem key={account.id} href="#">
            <Avatar slot="icon" initials={account.name.charAt(0)} />
            <DropdownLabel>{account.name}</DropdownLabel>
          </DropdownItem>
        ))}
        
        <DropdownDivider />
        <DropdownItem href="/accounts/new">
          <PlusIcon />
          <DropdownLabel>New account&hellip;</DropdownLabel>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}