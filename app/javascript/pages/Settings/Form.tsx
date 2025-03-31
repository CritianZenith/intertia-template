import { useForm } from "@inertiajs/react";
import { SettingsAccountType, SettingsFormType } from "./types";
import { Button, Input, Image } from "@heroui/react";
import { useState, useRef, ChangeEvent } from "react";

interface FormProps {
  account: SettingsAccountType;
  errors?: Record<string, string[]>;
}

export default function Form({ account, errors }: FormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(account.avatar_url);

  const { data, setData, post, processing } = useForm<SettingsFormType>({
    name: account.name || "",
    avatar: null,
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    post(`/settings`, {
      forceFormData: true,
    });
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setData("avatar", file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  function removeAvatar() {
    setData("avatar", null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  return (
    <form onSubmit={submit}>
      <div className="space-y-6">
        {/* Avatar Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Avatar</h3>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              {preview ? (
                <Image
                  src={preview}
                  alt="Account avatar"
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
                onChange={handleFileChange}
              />
              <Button
                onPress={() => fileInputRef.current?.click()}
                size="sm"
                variant="bordered"
              >
                {preview ? "Change Avatar" : "Upload Avatar"}
              </Button>
              {preview && (
                <Button
                  onPress={removeAvatar}
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
                Supported formats: JPEG, PNG, GIF
              </p>
              {errors?.avatar && (
                <p className="text-red-500 text-xs mt-1">{errors.avatar[0]}</p>
              )}
            </div>
          </div>
        </div>

        {/* Account Information Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
          <div className="grid gap-6 grid-cols-1">
            <div className="space-y-2">
              <Input
                label="Account Name"
                name="name"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
                isInvalid={!!errors?.name}
                errorMessage={errors?.name?.[0]}
                placeholder="Enter account name"
                className="w-full"
                labelPlacement="outside"
                description="The name associated with your account"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button type="button" color="secondary" href="/settings" as="a">
            Cancel
          </Button>
          <Button type="submit" color="primary" isLoading={processing}>
            Save Changes
          </Button>
        </div>
      </div>
    </form>
  );
}
