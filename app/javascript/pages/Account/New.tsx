import { Head, Link } from "@inertiajs/react";
import Form from "./Form";
import { AccountType } from "./types";

// Import your custom UI components
import { Heading } from "../../components/heading";
import { Divider } from "../../components/divider";
import { Button } from "../../components/button";

interface NewProps {
  account: AccountType;
}

export default function New({ account }: NewProps) {
  return (
    <>
      <Head title="New Account" />

      <Heading className="my-6">New Account</Heading>
      <Divider className="mb-6" soft />

      <Form
        account={account}
        onSubmit={(form) => {
          form.transform((data) => ({ account: data }));
          form.post("/accounts");
        }}
        submitText="Create Account"
      />

      <Divider className="my-6" soft />

      <div className="flex justify-end">
        <Link href="/accounts">
          <Button plain>Back to accounts</Button>
        </Link>
      </div>
    </>
  );
}
