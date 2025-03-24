import { useForm, type InertiaFormProps } from "@inertiajs/react";
import { FormEvent } from "react";
import { AccountFormType, AccountType } from "./types";
import { 
  Input, 
  Button, 
  Divider, 
  Card, 
  CardBody, 
  CardHeader,
  CardFooter
} from "@heroui/react";

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
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold">Account</h2>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">Name</h3>
              <p className="text-gray-600 dark:text-gray-400">This is the name associated with your account.</p>
            </div>
            <div>
              <Input
                label="Name"
                name="name"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
                isInvalid={Boolean(errors.name)}
                errorMessage={errors.name}
                placeholder="Enter account name"
                className="w-full"
              />
            </div>
          </div>
        </CardBody>
        <Divider />
        <CardFooter className="flex justify-end gap-4">
          <Button 
            type="submit" 
            color="primary" 
            isLoading={processing}
            isDisabled={processing}
          >
            {submitText}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
