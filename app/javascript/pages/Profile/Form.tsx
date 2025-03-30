import { useForm, type InertiaFormProps } from "@inertiajs/react";
import { FormEvent } from "react";
import { UserFormType, UserType } from "./types";
import {
  Input,
  Button,
  Divider,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Textarea,
} from "@heroui/react";

interface FormProps {
  user: UserType;
  onSubmit: (form: InertiaFormProps<UserFormType>) => void;
  submitText: string;
}

export default function Form({ user, onSubmit, submitText }: FormProps) {
  const form = useForm<UserFormType>({
    name: user.name,
    bio: user.bio,
  });
  const { data, setData, errors, processing } = form;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} method="post" className="mx-auto max-w-5xl">
      <Card className="shadow-sm">
        <CardHeader className="bg-gray-50 dark:bg-gray-800">
          <h2 className="text-2xl font-bold">Profile Information</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Update your personal information
          </p>
        </CardHeader>
        <Divider />

        <CardBody className="px-4 py-6">
          <div className="space-y-8">
            {/* Basic Profile Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
              <div className="grid gap-6 grid-cols-1">
                <div className="space-y-2">
                  <Input
                    label="Name"
                    name="name"
                    value={data.name || ""}
                    onChange={(e) => setData("name", e.target.value)}
                    isInvalid={Boolean(errors.name)}
                    errorMessage={errors.name}
                    placeholder="Enter your name"
                    className="w-full"
                    labelPlacement="outside"
                    description="Your full name"
                  />
                </div>

                <div className="space-y-2">
                  <Textarea
                    label="Bio"
                    name="bio"
                    value={data.bio || ""}
                    onChange={(e) => setData("bio", e.target.value)}
                    isInvalid={Boolean(errors.bio)}
                    errorMessage={errors.bio}
                    placeholder="Tell us about yourself"
                    className="w-full"
                    labelPlacement="outside"
                    description="A short biography about yourself"
                    minRows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Input
                    label="Email Address"
                    value={user.email_address}
                    disabled
                    className="w-full"
                    labelPlacement="outside"
                    description="Your email address (cannot be changed here)"
                  />
                </div>
              </div>
            </div>
          </div>
        </CardBody>

        <Divider />
        <CardFooter className="flex justify-end gap-4 bg-gray-50 dark:bg-gray-800">
          <Button
            type="submit"
            color="primary"
            isLoading={processing}
            isDisabled={processing}
            size="lg"
          >
            {submitText}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
