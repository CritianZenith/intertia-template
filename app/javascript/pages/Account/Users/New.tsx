import { Head, useForm, Link } from "@inertiajs/react";
import { FormEvent } from "react";
import { AccountType } from "../types";
import { AccountUserFormType } from "./types";
import {
  Button,
  Breadcrumbs,
  BreadcrumbItem,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Divider,
  Input,
  Select,
  SelectItem,
  Alert,
} from "@heroui/react";

interface NewProps {
  account: AccountType;
  available_roles: string[];
  flash?: { notice?: string };
}

export default function New({ account, available_roles, flash }: NewProps) {
  const form = useForm({
    email_address: "",
    role: "member" as "admin" | "member",
  });

  const { data, setData, errors, processing } = form;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    form.post(`/accounts/${account.id}/users`);
  }

  return (
    <>
      <Head title={`Account: ${account.name} - Add User`} />

      {flash?.notice && (
        <Alert className="mb-6" color="danger">
          {flash.notice}
        </Alert>
      )}

      <Breadcrumbs className="mb-6">
        <BreadcrumbItem>
          <Link href="/accounts">Accounts</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link href={`/accounts/${account.id}`}>{account.name}</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link href={`/accounts/${account.id}/users`}>Users</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>Add New User</BreadcrumbItem>
      </Breadcrumbs>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold">Add New User</h1>
      </div>

      <Card className="shadow-sm max-w-3xl">
        <CardHeader className="bg-gray-50 dark:bg-gray-800">
          <h2 className="text-xl font-semibold">User Details</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Add a user to this account by email address
          </p>
        </CardHeader>
        <Divider />

        <form onSubmit={handleSubmit}>
          <CardBody className="py-6 px-4 space-y-6">
            <div className="space-y-2">
              <Input
                label="Email Address"
                name="email_address"
                type="email"
                value={data.email_address}
                onChange={(e) => setData("email_address", e.target.value)}
                isInvalid={!!errors.email_address}
                errorMessage={errors.email_address}
                placeholder="user@example.com"
                labelPlacement="outside"
                description="Enter the email address of the user you want to add"
                isRequired
              />
            </div>

            <div className="space-y-2">
              <Select
                label="Role"
                name="role"
                selectedKeys={[data.role]}
                onChange={(e) => setData("role", e.target.value as "admin" | "member")}
                isInvalid={!!errors.role}
                errorMessage={errors.role}
                labelPlacement="outside"
                description="Select the user's role in this account"
                isRequired
              >
                {available_roles.map((role) => (
                  <SelectItem key={role}>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </CardBody>

          <Divider />
          <CardFooter className="flex justify-end gap-4 bg-gray-50 dark:bg-gray-800">
            <Button
              as={Link}
              href={`/accounts/${account.id}/users`}
              variant="light"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              color="primary"
              isLoading={processing}
              isDisabled={processing}
            >
              Add User
            </Button>
          </CardFooter>
        </form>
      </Card>
    </>
  );
} 