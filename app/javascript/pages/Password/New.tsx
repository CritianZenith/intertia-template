import { Head, Link, useForm } from "@inertiajs/react";
import { Button, Input, Alert } from "@heroui/react";

interface NewProps {
  flash: {
    alert?: string;
    notice?: string;
  };
}

export default function New({ flash }: NewProps) {
  const form = useForm({
    email_address: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.post("/passwords");
  };

  return (
    <>
      <Head title="Reset Password" />

      <div className="max-w-md min-h-screen flex flex-col justify-center items-center mx-auto my-10 p-8 rounded-md shadow-lg">
        <div className="mx-auto md:w-2/3 w-full">
          {flash.alert && (
            <Alert color="danger" className="mb-5">
              {flash.alert}
            </Alert>
          )}

          <h1 className="font-bold text-4xl">Reset</h1>

          <form onSubmit={handleSubmit} className="contents">
            <div className="my-5">
              <Input
                type="email"
                name="email_address"
                required
                autoFocus
                autoComplete="username"
                placeholder="Enter your email address"
                value={form.data.email_address}
                onChange={(e) => form.setData("email_address", e.target.value)}
                className="w-full"
              />
            </div>

            <div className="col-span-6 sm:flex sm:items-center sm:gap-4">

              <div className="inline">
                <Button
                  type="submit"
                  color="primary"
                  isLoading={form.processing}
                  className="w-full sm:w-auto"
                >
                  Email reset instructions
                </Button>
              </div>
              <div className="mt-4 text-sm text-gray-500 sm:mt-0">
                  <Link href="/session/new" className="underline hover:no-underline">
                    Back
                  </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

// Set layout to null to prevent the default ApplicationLayout from being applied
New.layout = null; 