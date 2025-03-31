import { useForm, type InertiaFormProps } from "@inertiajs/react";
import { FormEvent, useRef, useState } from "react";
import { AccountFormType, AccountType } from "./types";
import {
  Input,
  Button,
  Divider,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Tabs,
  Tab,
  Image,
} from "@heroui/react";

interface FormProps {
  account: AccountType;
  onSubmit: (form: InertiaFormProps<AccountFormType>) => void;
  submitText: string;
}

export default function Form({ account, onSubmit, submitText }: FormProps) {
  const form = useForm<AccountFormType>({
    name: account.name || "",
    avatar: null as File | null,
  });
  const { data, setData, errors, processing } = form;
  const [avatarPreview, setAvatarPreview] = useState<string | null>(account.avatar_url || null);
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
    <form onSubmit={handleSubmit} method="post" className="mx-auto max-w-5xl" encType="multipart/form-data">
      <Card className="shadow-sm">
        <CardHeader className="bg-gray-50 dark:bg-gray-800">
          <h2 className="text-2xl font-bold mr-2">Account Details</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage basic account information and settings
          </p>
        </CardHeader>
        <Divider />

        <Tabs aria-label="Account sections" className="mx-4 mt-2">
          <Tab key="details" title="General Information">
            <CardBody className="px-4 py-6">
              <div className="space-y-8">
                {/* Avatar Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Avatar</h3>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {avatarPreview ? (
                        <Image
                          src={avatarPreview}
                          alt="Account avatar"
                          className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
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
                        {avatarPreview ? "Change Avatar" : "Upload Avatar"}
                      </Button>
                      {avatarPreview && (
                        <Button
                          onPress={() => {
                            setAvatarPreview(null);
                            setData("avatar", null);
                            if (fileInputRef.current) fileInputRef.current.value = "";
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

                {/* Account Information Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Basic Information
                  </h3>
                  <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                    <div className="space-y-2">
                      <Input
                        label="Account Name"
                        name="name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        isInvalid={Boolean(errors.name)}
                        errorMessage={errors.name}
                        placeholder="Enter account name"
                        className="w-full"
                        labelPlacement="outside"
                        description="This is the primary name associated with your account"
                      />
                    </div>

                    {/* Space for future fields */}
                    <div className="space-y-2 opacity-50">
                      <Input
                        label="Account Type"
                        disabled
                        placeholder="Will be available soon"
                        className="w-full"
                        labelPlacement="outside"
                        description="Select the type of account (coming soon)"
                      />
                    </div>
                  </div>
                </div>

                {/* Placeholder for future sections */}
                <div className="opacity-50">
                  <h3 className="text-lg font-semibold mb-4">
                    Additional Settings
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                    More account settings will be available in the future
                  </p>
                </div>
              </div>
            </CardBody>
          </Tab>
          <Tab key="permissions" title="Permissions" disabled>
            <CardBody>
              <p>Permission management will be available soon</p>
            </CardBody>
          </Tab>
        </Tabs>

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
