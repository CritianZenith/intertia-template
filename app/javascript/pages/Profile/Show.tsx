import { Head } from "@inertiajs/react";
import { useState } from "react";
import { UserType } from "./types";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Alert,
  Divider,
} from "@heroui/react";
import { Link } from "@inertiajs/react";

interface ShowProps {
  user: UserType;
  flash: { notice?: string };
}

export default function Show({ user, flash }: ShowProps) {
  const [flashVisible, setFlashVisible] = useState(!!flash.notice);

  return (
    <>
      <Head title="My Profile" />

      {flash.notice && flashVisible && (
        <Alert
          className="mb-6"
          onClose={() => setFlashVisible(false)}
          color="success"
        >
          {flash.notice}
        </Alert>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <div className="flex flex-wrap gap-2">
          <Button as={Link} href="/profile/edit" color="primary">
            Edit Profile
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2 shadow-sm">
          <CardHeader className="bg-gray-50 dark:bg-gray-800">
            <h2 className="text-xl font-semibold">Profile Information</h2>
          </CardHeader>
          <CardBody className="p-6">
            <div className="mb-6">
              <h3 className="text-md font-medium text-gray-500 mb-4">
                Personal Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <div className="text-sm text-gray-500">Email Address</div>
                  <div className="font-medium">{user.email_address}</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <div className="text-sm text-gray-500">Name</div>
                  <div className="font-medium">{user.name || "Not set"}</div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-md font-medium text-gray-500 mb-2">Bio</h3>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  {user.bio ? (
                    <p className="whitespace-pre-wrap">{user.bio}</p>
                  ) : (
                    <p className="italic text-gray-500">
                      No bio information provided yet.
                    </p>
                  )}
                </div>
              </div>
            </div>
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
                href="/profile/edit"
                color="primary"
                variant="flat"
                fullWidth
                className="justify-start"
              >
                Edit Profile
              </Button>
              <Button 
                as={Link}
                href="/"
                variant="flat"
                fullWidth
                className="justify-start"
              >
                Dashboard
              </Button>
            </div>
          </CardBody>
          <Divider />
          <CardFooter className="flex justify-end">
            <Button variant="light" as={Link} href="/">
              Back to Dashboard
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
} 