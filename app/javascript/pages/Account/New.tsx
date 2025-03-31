import { Head } from "@inertiajs/react";
import Form from "./Form";
import { AccountType } from "./types";
import { Button, Divider, Breadcrumbs, BreadcrumbItem } from "@heroui/react";
import { Link } from "@inertiajs/react";
import { client } from "@/lib/apollo";
import { GET_ACCOUNTS, GET_CURRENT_ACCOUNT } from "@/lib/queries";
interface NewProps {
  account: AccountType;
}

export default function New({ account }: NewProps) {
  return (
    <>
      <Head title="New Account" />

      <h1 className="text-3xl font-bold my-6">New Account</h1>
      <Divider className="mb-6" />

      <Form
        account={account}
        onSubmit={(form) => {
          form.transform((data) => ({ account: data }));
          form.post("/accounts", {
            onFinish: () => {
              client.refetchQueries({
                include: [GET_ACCOUNTS, GET_CURRENT_ACCOUNT],
              });
            },
          });
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
