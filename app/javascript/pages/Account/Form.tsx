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
  CardFooter,
  Tabs,
  Tab,
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
    <form onSubmit={handleSubmit} method="post" className="mx-auto max-w-5xl">
      <Card className="shadow-sm">
        <CardHeader className="bg-gray-50 dark:bg-gray-800">
          <h2 className="text-2xl font-bold">Account Details</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage basic account information and settings
          </p>
        </CardHeader>
        <Divider />
        
        <Tabs aria-label="Account sections" className="mx-4 mt-2">
          <Tab key="details" title="General Information">
            <CardBody className="px-4 py-6">
              <div className="space-y-8">
                {/* Account Information Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
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
                  <h3 className="text-lg font-semibold mb-4">Additional Settings</h3>
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
