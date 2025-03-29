import { Head } from "@inertiajs/react";
import Form from "./Form";
import { UserType } from "./types";
import { Button, Divider, Breadcrumbs, BreadcrumbItem } from "@heroui/react";
import { Link } from "@inertiajs/react";

interface EditProps {
  user: UserType;
}

export default function Edit({ user }: EditProps) {
  return (
    <>
      <Head title="Edit Profile" />

      <Breadcrumbs className="mb-6">
        <BreadcrumbItem>
          <Link href="/">Dashboard</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link href="/profile">Profile</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>Edit</BreadcrumbItem>
      </Breadcrumbs>

      <h1 className="text-3xl font-bold my-6">Edit Profile</h1>
      <Divider className="mb-6" />

      <Form
        user={user}
        onSubmit={(form) => {
          form.transform((data) => ({ user: data }));
          form.patch("/profile");
        }}
        submitText="Update Profile"
      />

      <div className="flex justify-end gap-4 mt-6">
        <Button as={Link} href="/profile" variant="bordered">
          View Profile
        </Button>
        <Button as={Link} href="/" variant="light">
          Back to Dashboard
        </Button>
      </div>
    </>
  );
} 