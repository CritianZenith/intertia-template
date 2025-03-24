import { useSuspenseQuery } from "@apollo/client";
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
  // Fetch accounts using Suspense-compatible query
  const { data } = useSuspenseQuery<AccountsData>(GET_ACCOUNTS);
  
  // Extract accounts from the data
  const accounts = data?.accounts?.edges?.map(edge => edge.node) || [];
  const currentAccount = accounts.length > 0 ? accounts[0] : null;

  return (
    <Dropdown>
      <DropdownButton as={as} className={buttonClassName}>
        <Avatar initials={currentAccount ? currentAccount.name.charAt(0) : "?"} />
        <SidebarLabel>{currentAccount ? currentAccount.name : "No accounts"}</SidebarLabel>
        <ChevronDownIcon />
      </DropdownButton>
      <DropdownMenu
        className={className}
        anchor={anchor}
      >
        {accounts.map((account) => (
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