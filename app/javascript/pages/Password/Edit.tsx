import { Head, useForm } from "@inertiajs/react";
import { Button, Input, Alert } from "@heroui/react";

interface EditProps {
  token: string;
  flash: {
    alert?: string;
    notice?: string;
  };
}

export default function Edit({ token, flash }: EditProps) {
  const form = useForm({
    password: "",
    password_confirmation: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.put(`/passwords/${token}`);
  };

  return (
    <>
      <Head title="Update Password" />

      <div className="max-w-md mx-auto my-10 p-8 rounded-md shadow-lg">
        <div className="mx-auto md:w-2/3 w-full">
          {flash.alert && (
            <Alert color="danger" className="mb-5">
              {flash.alert}
            </Alert>
          )}

          <h1 className="font-bold text-4xl">Update your password</h1>

          <form onSubmit={handleSubmit} className="contents">
            <div className="my-5">
              <Input
                type="password"
                name="password"
                required
                autoFocus
                autoComplete="new-password"
                placeholder="Enter new password"
                maxLength={72}
                value={form.data.password}
                onChange={(e) => form.setData("password", e.target.value)}
                className="w-full"
              />
            </div>

            <div className="my-5">
              <Input
                type="password"
                name="password_confirmation"
                required
                autoComplete="new-password"
                placeholder="Repeat new password"
                maxLength={72}
                value={form.data.password_confirmation}
                onChange={(e) => form.setData("password_confirmation", e.target.value)}
                className="w-full"
              />
            </div>

            <div className="inline">
              <Button
                type="submit"
                color="primary"
                isLoading={form.processing}
                className="w-full sm:w-auto"
              >
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

// Set layout to null to prevent the default ApplicationLayout from being applied
Edit.layout = null; 