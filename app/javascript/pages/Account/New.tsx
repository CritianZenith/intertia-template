import { Head } from "@inertiajs/react";
import Form from "./Form";
import { AccountType } from "./types";
import { Button, Divider, Breadcrumbs, BreadcrumbItem } from "@heroui/react";
import { Link } from "@inertiajs/react";
interface NewProps {
  account: AccountType;
}

export default function New({ account }: NewProps) {
  return (
    <>
      <Head title="New Account" />

      <Breadcrumbs className="mb-6">
        <BreadcrumbItem>
          <Link href="/accounts">Accounts</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>New</BreadcrumbItem>
      </Breadcrumbs>

      <h1 className="text-3xl font-bold my-6">New Account</h1>
      <Divider className="mb-6" />

      <Form
        account={account}
        onSubmit={(form) => {
          form.transform((data) => ({ account: data }));
          form.post("/accounts");
        }}
        submitText="Create Account"
      />

      <div className="flex justify-end mt-6">
        <Button as={Link} href="/accounts" variant="light">
          Back to accounts
        </Button>
      </div>
    </>
  );
}
