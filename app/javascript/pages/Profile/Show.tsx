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
  Image,
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
              <div className="flex items-center gap-6 mb-6">
                {user.avatar_url ? (
                  <Image
                    src={user.avatar_url}
                    alt="Profile picture"
                    className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-semibold">{user.name || "Anonymous User"}</h3>
                  <p className="text-gray-500">{user.email_address}</p>
                </div>
              </div>

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
