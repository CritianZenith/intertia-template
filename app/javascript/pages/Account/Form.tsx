import { useForm, type InertiaFormProps } from "@inertiajs/react";
import { FormEvent } from "react";
import { AccountFormType, AccountType } from "./types";

// Import your custom UI components
import { Heading, Subheading } from "../../components/heading";
import { Divider } from "../../components/divider";
import { Text } from "../../components/text";
import { Input } from "../../components/input";
import { Button } from "../../components/button";

interface FormProps {
  account: AccountType;
  onSubmit: (form: InertiaFormProps<AccountFormType>) => void;
  submitText: string;
}

export default function Form({ account, onSubmit, submitText }: FormProps) {
  const form = useForm<AccountFormType>({
    name: account.name || "",
  });
  const { data, setData, errors, processing } = form;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} method="post" className="mx-auto max-w-4xl">
      <Heading>Account</Heading>
      <Divider className="my-10 mt-6" />

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Name</Subheading>
          <Text>This is the name associated with your account.</Text>
        </div>
        <div>
          <Input
            aria-label="Name"
            name="name"
            value={data.name}
            onChange={(e) => setData("name", e.target.value)}
          />
          {/* Display error if present */}
          {errors.name && (
            <div className="mt-1 text-sm text-red-500">{errors.name}</div>
          )}
        </div>
      </section>

      <Divider className="my-10" soft />

      <div className="flex justify-end gap-4">
        <Button type="submit" disabled={processing}>
          {submitText}
        </Button>
      </div>
    </form>
  );
}
