import { Head } from "@inertiajs/react";
import { useState } from "react";
import Account from "./Account";
import { AccountType } from "./types";
import {
  Link,
  Button,
  Breadcrumbs,
  BreadcrumbItem,
  Card,
  CardBody,
  CardHeader,
  Alert,
} from "@heroui/react";

interface ShowProps {
  account: AccountType;
  flash: { notice?: string };
}

export default function Show({ account, flash }: ShowProps) {
  const [flashVisible, setFlashVisible] = useState(!!flash.notice);

  return (
    <>
      <Head title={`Account: ${account.name}`} />

      {flash.notice && flashVisible && (
        <Alert
          className="mb-6"
          onClose={() => setFlashVisible(false)}
          color="success"
        >
          {flash.notice}
        </Alert>
      )}

      <Breadcrumbs className="mb-6">
        <BreadcrumbItem href="/accounts">Accounts</BreadcrumbItem>
        <BreadcrumbItem>{account.name}</BreadcrumbItem>
      </Breadcrumbs>

      <h1 className="text-3xl font-bold my-6">Account: {account.name}</h1>

      <Card className="mb-6">
        <CardHeader>
          <h2 className="text-xl font-semibold">Account Details</h2>
        </CardHeader>
        <CardBody>
          <Account account={account} />
        </CardBody>
      </Card>

      <div className="flex justify-end gap-4">
        <Link href={`/accounts/${account.id}/edit`}>
          <Button color="primary">Edit this account</Button>
        </Link>
        <Link href="/accounts">
          <Button variant="light">Back to accounts</Button>
        </Link>

        <Button
          as="a"
          href={`/accounts/${account.id}`}
          color="danger"
          data-method="delete"
          data-confirm="Are you sure you want to delete this account?"
        >
          Delete this account
        </Button>
      </div>
    </>
  );
}
