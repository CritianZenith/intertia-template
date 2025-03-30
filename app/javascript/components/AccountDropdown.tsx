import { useSuspenseQuery } from "@apollo/client";
import { GET_ACCOUNTS, GET_CURRENT_ACCOUNT } from "~/lib/queries";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Avatar,
} from "@heroui/react";
import { PlusIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link, router } from "@inertiajs/react";
import { Account, AccountsData, CurrentAccountData } from "./types";
import { useEffect } from "react";

interface AccountDropdownProps {
  className?: string;
}

interface MenuItem {
  id: string;
  name: string;
  isNew?: boolean;
  account?: Account;
}

export function AccountDropdown({ className = "" }: AccountDropdownProps) {
  // Fetch accounts and current account using Suspense-compatible queries
  const { data: accountsData } = useSuspenseQuery<AccountsData>(GET_ACCOUNTS);
  const { data: currentAccountData, refetch: refetchCurrentAccount } =
    useSuspenseQuery<CurrentAccountData>(GET_CURRENT_ACCOUNT);

  const handleSelectAccount = (account: Account | undefined) => {
    if (account) {
      router.visit(`/session/select_account/${account.internalId}`, {
        async: true,
        onFinish: async () => {
          await refetchCurrentAccount();
        },
      });
    } else {
      router.visit("/accounts/new");
    }
  };

  // Extract current account and accounts list
  const currentAccount = currentAccountData?.currentAccount;
  const accounts =
    accountsData?.accounts?.edges?.map((edge) => edge.node) || [];

  // Create menu items from accounts
  const menuItems: MenuItem[] = [
    ...accounts.map((account) => ({
      id: account.id,
      name: account.name,
      account,
    })),
    { id: "new", name: "New account", isNew: true },
  ];

  return (
    <div className={`${className}`}>
      <Dropdown>
        <DropdownTrigger>
          <Button
            variant="light"
            className="flex items-center justify-between pl-0 space-x-2 w-full"
          >
            <span className="flex items-center">
              <Avatar
                name={currentAccount?.name?.slice(0, 1) || "A"}
                className="mr-2"
                size="sm"
              />
              <span className="truncate text-left">
                {currentAccount?.name || "Select Account"}
              </span>
            </span>
            <ChevronDownIcon className="h-4 w-4 ml-2" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Account selection" items={menuItems}>
          {(item: MenuItem) => (
            <DropdownItem
              key={item.account?.internalId || item.id}
              onPress={() => handleSelectAccount(item.account)}
              as={Link}
              className="py-2"
            >
              <div className="flex items-center">
                {item.isNew ? (
                  <div className="flex-shrink-0 w-8 h-8 mr-2 flex items-center justify-center">
                    <PlusIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  </div>
                ) : (
                  <Avatar
                    name={item.name.slice(0, 1)}
                    className="mr-2"
                    size="sm"
                  />
                )}
                <span className="truncate">{item.name}</span>
              </div>
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
