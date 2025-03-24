import { Head, Link } from "@inertiajs/react";
import Form from "./Form";
import { AccountType } from "./types";

// Import your custom UI components
import { Heading } from "../../components/ui/heading";
import { Divider } from "../../components/ui/divider";
import { Button } from "../../components/ui/button";

interface EditProps {
  account: AccountType;
}

export default function Edit({ account }: EditProps) {
  return (
    <>
      <Head title="Editing Account" />

      <Heading className="my-6">Editing Account</Heading>
      <Divider className="mb-6" soft />

      <Form
        account={account}
        onSubmit={(form) => {
          form.transform((data) => ({ account: data }));
          form.patch(`/accounts/${account.id}`);
        }}
        submitText="Update Account"
      />

      <Divider className="my-6" soft />

      <div className="flex justify-end gap-4">
        <Link href={`/accounts/${account.id}`}>
          <Button plain>Show this account</Button>
        </Link>
        <Link href="/accounts">
          <Button plain>Back to accounts</Button>
        </Link>
      </div>
    </>
  );
}
