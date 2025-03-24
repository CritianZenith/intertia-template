import { Head } from "@inertiajs/react";
import { useState } from "react";
import Account from "./Account";
import { AccountType } from "./types";
import {
  Link,
  Button,
  Card,
  CardBody,
  CardFooter,
  Alert,
  Divider,
} from "@heroui/react";

interface IndexProps {
  accounts: AccountType[];
  flash: { notice?: string };
}

export default function Index({ accounts, flash }: IndexProps) {
  const [flashVisible, setFlashVisible] = useState(!!flash.notice);

  return (
    <>
      <Head title="Accounts" />

      {flash.notice && flashVisible && (
        <Alert
          className="mb-6"
          onClose={() => setFlashVisible(false)}
          color="success"
        >
          {flash.notice}
        </Alert>
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Accounts</h1>
        <Link href="/accounts/new">
          <Button color="primary">Create New Account</Button>
        </Link>
      </div>

      <Divider className="mb-6" />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {accounts.map((account) => (
          <Card key={account.id} className="shadow-sm">
            <CardBody>
              <Account account={account} />
            </CardBody>
            <Divider />
            <CardFooter className="flex justify-end">
              <Link href={`/accounts/${account.id}`}>
                <Button variant="light" size="sm">
                  View Details
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}

        {accounts.length === 0 && (
          <div className="col-span-full text-center py-8 text-gray-500">
            No accounts found. Create your first account to get started.
          </div>
        )}
      </div>
    </>
  );
}
