import { AccountType } from "./types";
import { User } from "@heroui/react";

interface AccountProps {
  account: AccountType;
}

export default function Account({ account }: AccountProps) {
  return (
    <div className="flex items-center">
      <User
        name={account.name}
        description={`Account ID: ${account.id}`}
        avatarProps={{
          name: account.name,
          showFallback: true,
          fallback: account.name.charAt(0).toUpperCase(),
          className: "bg-primary-100 text-primary-600",
        }}
      />
    </div>
  );
}
