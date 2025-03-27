import { AccountType } from "./types";
import { Chip } from "@heroui/react";

import { ApplicationLayout } from "../../layouts/Layout";

interface AccountProps {
  account: AccountType;
}

function Account({ account }: AccountProps) {
  // Generate a stable color based on account id for consistent visuals
  const colorOptions = ["primary", "secondary", "success", "warning"];
  const accountColor = colorOptions[account.id % colorOptions.length];

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center space-x-4">
        <div
          className={`w-12 h-12 rounded-full bg-${accountColor}-100 flex items-center justify-center`}
        >
          <span className={`text-${accountColor}-600 text-xl font-bold`}>
            {account.name.charAt(0).toUpperCase()}
          </span>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">{account.name}</h3>
            <Chip size="sm" color="success" variant="flat">
              Active
            </Chip>
          </div>
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <span>Account ID: {account.id}</span>
            <span className="text-gray-300">•</span>
            <span>Created: Recently</span>
          </div>
        </div>
      </div>
    </div>
  );
}

Account.layout = (page: React.ReactNode) => (
  <ApplicationLayout>{page}</ApplicationLayout>
);

export default Account;
