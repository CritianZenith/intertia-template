import { Head } from "@inertiajs/react";
import { SettingsAccountType } from "./types";
import Form from "./Form";
import {
  Card,
  CardBody,
  CardHeader,
  Breadcrumbs,
  BreadcrumbItem,
} from "@heroui/react";
import { Link } from "@inertiajs/react";

interface EditProps {
  account: SettingsAccountType;
  errors?: Record<string, string[]>;
}

export default function Edit({ account, errors }: EditProps) {
  return (
    <>
      <Head title="Edit Settings" />

      <div className="py-4 sm:py-6 lg:py-8 max-w-7xl mx-auto">
        <div className="mb-6">
          <Breadcrumbs className="mb-4">
            <BreadcrumbItem>
              <Link href="/settings">Settings</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>Edit</BreadcrumbItem>
          </Breadcrumbs>

          <h1 className="text-2xl font-bold tracking-tight">Edit Settings</h1>
          <p className="text-gray-500">Update your account settings</p>
        </div>

        <div className="max-w-3xl">
          <Card className="shadow-sm">
            <CardHeader className="bg-gray-50 dark:bg-gray-800">
              <h2 className="text-xl font-semibold">Account Information</h2>
            </CardHeader>
            <CardBody>
              <Form account={account} errors={errors} />
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}
