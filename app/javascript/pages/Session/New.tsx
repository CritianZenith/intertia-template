import { Head, useForm } from "@inertiajs/react";
import { Button, Input, Alert } from "@heroui/react";
import { Link } from "@inertiajs/react";

interface NewProps {
  flash: {
    alert?: string;
    notice?: string;
  };
}

export default function New({ flash }: NewProps) {
  const form = useForm({
    email_address: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.post("/session");
  };

  return (
    <>
      <Head title="Sign in" />

      <div
        id="container"
        className="max-w-xs lg:max-w-md min-h-screen flex flex-col justify-center items-center mx-auto rounded-md"
      >
        <div className="mx-auto md:w-2/3 w-full">
          {flash.alert && (
            <Alert color="danger" className="mb-5">
              {flash.alert}
            </Alert>
          )}

          {flash.notice && (
            <Alert color="success" className="mb-5">
              {flash.notice}
            </Alert>
          )}

          <h1 className="font-bold text-4xl">Sign in</h1>

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
                className="w-full border-2 border-gray-300 rounded-lg"
              />
            </div>

            <div className="my-5">
              <Input
                type="password"
                name="password"
                required
                autoComplete="current-password"
                placeholder="Enter your password"
                maxLength={72}
                value={form.data.password}
                onChange={(e) => form.setData("password", e.target.value)}
                className="w-full border-2 border-gray-300 rounded-lg"
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
                  Sign in
                </Button>
              </div>

              <div className="mt-4 text-sm text-gray-500 sm:mt-0">
                <Link
                  href="/passwords/new"
                  className="underline hover:no-underline"
                >
                  Forgot password?
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
