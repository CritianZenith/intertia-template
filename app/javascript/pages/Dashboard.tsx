import { Head } from "@inertiajs/react";
import { Card, CardBody, CardHeader, CardFooter, Divider } from "@heroui/react";
import { Link } from "@inertiajs/react";
import { ApplicationLayout } from "../layouts/Layout";

export default function Dashboard() {
  return (
    <>
      <Head title="Dashboard" />

      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Welcome to your Dashboard</h1>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <Card className="shadow-sm">
            <CardHeader className="bg-gray-50 dark:bg-gray-800">
              <h2 className="text-xl font-semibold">Accounts</h2>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your accounts and their settings
              </p>
            </CardBody>
            <Divider />
            <CardFooter>
              <Link
                href="/accounts"
                className="text-primary hover:text-primary-dark"
              >
                View Accounts →
              </Link>
            </CardFooter>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="bg-gray-50 dark:bg-gray-800">
              <h2 className="text-xl font-semibold">Profile</h2>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600 dark:text-gray-400">
                Update your profile and preferences
              </p>
            </CardBody>
            <Divider />
            <CardFooter>
              <Link
                href="/profile"
                className="text-primary hover:text-primary-dark"
              >
                Edit Profile →
              </Link>
            </CardFooter>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="bg-gray-50 dark:bg-gray-800">
              <h2 className="text-xl font-semibold">Settings</h2>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600 dark:text-gray-400">
                Configure your application settings
              </p>
            </CardBody>
            <Divider />
            <CardFooter>
              <Link
                href="/settings"
                className="text-primary hover:text-primary-dark"
              >
                View Settings →
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}

Dashboard.layout = (page: React.ReactNode) => (
  <ApplicationLayout>{page}</ApplicationLayout>
);
