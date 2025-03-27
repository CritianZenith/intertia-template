import { Head } from "@inertiajs/react";
import { useState } from "react";
import Account from "./Account";
import { AccountType } from "./types";
import {
  Button,
  Breadcrumbs,
  BreadcrumbItem,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Alert,
  Divider,
  Tabs,
  Tab,
} from "@heroui/react";
import { Link, router } from "@inertiajs/react";

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
        <BreadcrumbItem>
          <Link href="/accounts">Accounts</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>{account.name}</BreadcrumbItem>
      </Breadcrumbs>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold">{account.name}</h1>
        <div className="flex flex-wrap gap-2">
          <Button
            as={Link}
            href={`/accounts/${account.id}/edit`}
            color="primary"
          >
            Edit Account
          </Button>
          <Button
            onPress={() => {
              if (confirm("Are you sure you want to delete this account?")) {
                router.delete(`/accounts/${account.id}`);
              }
            }}
            color="danger"
            variant="light"
          >
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2 shadow-sm">
          <CardHeader className="bg-gray-50 dark:bg-gray-800">
            <h2 className="text-xl font-semibold">Account Overview</h2>
          </CardHeader>
          <CardBody className="p-6">
            <div className="mb-8">
              <Account account={account} />
            </div>

            <Tabs aria-label="Account sections">
              <Tab key="details" title="Details">
                <div className="py-4">
                  <div className="mb-6">
                    <h3 className="text-md font-medium text-gray-500 mb-2">
                      Account Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <div className="text-sm text-gray-500">
                          Account Name
                        </div>
                        <div className="font-medium">{account.name}</div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <div className="text-sm text-gray-500">Account ID</div>
                        <div className="font-medium">{account.id}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-md font-medium text-gray-500 mb-2">
                      Coming Soon
                    </h3>
                    <p className="text-sm text-gray-500 italic">
                      Additional account details will be displayed here in the
                      future.
                    </p>
                  </div>
                </div>
              </Tab>
              <Tab key="users" title="Members" disabled>
                <p>User permissions management will be available soon</p>
              </Tab>
              <Tab key="activity" title="Activity" disabled>
                <p>Account activity will be available soon</p>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>

        <Card className="shadow-sm h-min">
          <CardHeader className="bg-gray-50 dark:bg-gray-800">
            <h2 className="text-xl font-semibold">Quick Actions</h2>
          </CardHeader>
          <CardBody className="p-4">
            <div className="flex flex-col gap-2">
              <Button
                as={Link}
                href={`/accounts/${account.id}/edit`}
                color="primary"
                variant="flat"
                fullWidth
                className="justify-start"
              >
                Edit Account Details
              </Button>
              <Button
                color="secondary"
                variant="flat"
                fullWidth
                className="justify-start"
                disabled
              >
                Manage Members (Coming Soon)
              </Button>
              <Button
                color="secondary"
                variant="flat"
                fullWidth
                className="justify-start"
                disabled
              >
                Account Settings (Coming Soon)
              </Button>
            </div>
          </CardBody>
          <Divider />
          <CardFooter className="flex justify-end">
            <Button as={Link} href="/accounts" variant="light">
              Back to accounts
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
