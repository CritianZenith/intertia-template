import { Head } from "@inertiajs/react";
import Form from "./Form";
import { AccountType } from "./types";
import {
  Link,
  Button,
  Divider,
  Breadcrumbs,
  BreadcrumbItem,
} from "@heroui/react";

interface EditProps {
  account: AccountType;
}

export default function Edit({ account }: EditProps) {
  return (
    <>
      <Head title="Editing Account" />

      <Breadcrumbs className="mb-6">
        <BreadcrumbItem href="/accounts">Accounts</BreadcrumbItem>
        <BreadcrumbItem href={`/accounts/${account.id}`}>
          {account.name}
        </BreadcrumbItem>
        <BreadcrumbItem>Edit</BreadcrumbItem>
      </Breadcrumbs>

      <h1 className="text-3xl font-bold my-6">Editing Account</h1>
      <Divider className="mb-6" />

      <Form
        account={account}
        onSubmit={(form) => {
          form.transform((data) => ({ account: data }));
          form.patch(`/accounts/${account.id}`);
        }}
        submitText="Update Account"
      />

      <div className="flex justify-end gap-4 mt-6">
        <Link href={`/accounts/${account.id}`}>
          <Button variant="bordered">Show this account</Button>
        </Link>
        <Link href="/accounts">
          <Button variant="light">Back to accounts</Button>
        </Link>
      </div>
    </>
  );
}
