import { useSuspenseQuery } from "@apollo/client";
import { GET_ACCOUNTS } from "~/lib/queries";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Link } from "@heroui/react";
import { AccountsData } from "./types";

interface AccountsListProps {
  heading?: string;
}

export function AccountsList({
  heading = "Your Accounts",
}: AccountsListProps) {
  // Fetch accounts using Suspense-compatible query
  const { data } = useSuspenseQuery<AccountsData>(GET_ACCOUNTS);

  // Extract accounts from the data
  const accounts = data?.accounts?.edges?.map((edge) => edge.node) || [];

  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">{heading}</h3>
      <div className="space-y-1">
        {accounts.map((account) => (
          <Link 
            key={account.id} 
            href={`/accounts/${account.id}`} 
            className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <div className="flex-shrink-0 w-8 h-8 mr-3 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300">
              {account.name.charAt(0)}
            </div>
            <span>{account.name}</span>
          </Link>
        ))}
        <Link 
          href="/accounts/new" 
          className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          <div className="flex-shrink-0 w-8 h-8 mr-3 flex items-center justify-center">
            <PlusIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </div>
          <span>New account</span>
        </Link>
      </div>
    </div>
  );
}
