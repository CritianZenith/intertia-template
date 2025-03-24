import { Head, Link } from "@inertiajs/react";
import { useState } from "react";
import Account from "./Account";
import { AccountType } from "./types";

// Import your custom UI components
import { Heading } from "../../components/ui/heading";
import { Divider } from "../../components/ui/divider";
import { Button } from "../../components/ui/button";
import { Alert } from "../../components/ui/alert"; // Assume an Alert component for flash messages

interface ShowProps {
  account: AccountType;
  flash: { notice?: string };
}

export default function Show({ account, flash }: ShowProps) {
  const [flashDismissed, setFlashDismissed] = useState(false);

  return (
    <>
      <Head title={`Account #${account.id}`} />

      {flash.notice && !flashDismissed && (
        <Alert
          open={!flashDismissed}
          onClose={() => setFlashDismissed(true)}
          className="my-4"
        >
          {flash.notice}
        </Alert>
      )}

      <Heading className="my-6">Account #{account.id}</Heading>
      <Divider className="mb-6" soft />

      <Account account={account} />

      <Divider className="my-6" soft />

      <div className="flex justify-end gap-4">
        <Link href={`/accounts/${account.id}/edit`}>
          <Button>Edit this account</Button>
        </Link>
        <Link href="/accounts">
          <Button plain>Back to accounts</Button>
        </Link>

        <Button
          href={`/accounts/${account.id}`}
          type="button"
          color="red"
          method="delete"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            if (!confirm("Are you sure you want to delete this account?")) {
              e.preventDefault();
            }
          }}
        >
          Destroy this account
        </Button>
      </div>
    </>
  );
}
