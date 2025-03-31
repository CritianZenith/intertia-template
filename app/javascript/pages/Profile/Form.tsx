import { useForm, type InertiaFormProps } from "@inertiajs/react";
import { FormEvent, useRef, useState } from "react";
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
  Image,
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
    avatar: null as File | null,
  });
  const { data, setData, errors, processing } = form;
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    user.avatar_url || null,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(form);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setData("avatar", file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      method="post"
      className="mx-auto max-w-5xl"
      encType="multipart/form-data"
    >
      <Card className="shadow-sm">
        <CardHeader className="bg-gray-50 dark:bg-gray-800">
          <h2 className="text-2xl font-bold">Profile Information</h2>
          <p className="hidden md:inline text-sm text-gray-500 dark:text-gray-400 mt-1 ml-4">
            Update your personal information
          </p>
        </CardHeader>
        <Divider />

        <CardBody className="px-4 py-6">
          <div className="space-y-8">
            {/* Avatar Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Profile Picture</h3>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {avatarPreview ? (
                    <Image
                      src={avatarPreview}
                      alt="Profile picture"
                      className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex-grow space-y-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                  <Button
                    onPress={() => fileInputRef.current?.click()}
                    size="sm"
                    variant="bordered"
                  >
                    {avatarPreview ? "Change Picture" : "Upload Picture"}
                  </Button>
                  {avatarPreview && (
                    <Button
                      onPress={() => {
                        setAvatarPreview(null);
                        setData("avatar", null);
                        if (fileInputRef.current)
                          fileInputRef.current.value = "";
                      }}
                      size="sm"
                      color="danger"
                      variant="light"
                      className="ml-2"
                    >
                      Remove
                    </Button>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    Upload a square image for best results. Maximum size: 5MB.
                  </p>
                  {errors.avatar && (
                    <p className="text-red-500 text-xs mt-1">{errors.avatar}</p>
                  )}
                </div>
              </div>
            </div>

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
