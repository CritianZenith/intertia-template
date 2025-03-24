import { Head, Link } from "@inertiajs/react";
import { useState } from "react";
import Account from "./Account";
import { AccountType } from "./types";

// Import your custom UI components
import { Heading } from "../../components/ui/heading";
import { Divider } from "../../components/ui/divider";
import { Button } from "../../components/ui/button";
import { Alert } from "../../components/ui/alert"; // Assume an Alert component for flash messages

interface IndexProps {
  accounts: AccountType[];
  flash: { notice?: string };
}

export default function Index({ accounts, flash }: IndexProps) {
  const [flashDismissed, setFlashDismissed] = useState(false);

  return (
    <>
      <Head title="Accounts" />

      {flash.notice && (
        <Alert
          open={!flashDismissed}
          onClose={() => setFlashDismissed(true)}
          className="my-4"
        >
          {flash.notice}
        </Alert>
      )}

      <Heading className="my-6">Accounts</Heading>
      <Divider className="mb-6" soft />

      <div className="space-y-4">
        {accounts.map((account) => (
          <div
            key={account.id}
            className="p-4 border rounded-lg border-gray-200 shadow-sm"
          >
            <Account account={account} />
            <div className="mt-2 text-right">
              <Link href={`/accounts/${account.id}`}>
                <Button plain>Show this account</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <Divider className="my-6" soft />

      <div className="flex justify-end">
        <Link href="/accounts/new">
          <Button>Create New Account</Button>
        </Link>
      </div>
    </>
  );
}
