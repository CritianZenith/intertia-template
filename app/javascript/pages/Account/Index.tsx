import { Head } from "@inertiajs/react";
import { useState } from "react";
import Account from "./Account";
import { AccountType } from "./types";
import {
  Link,
  Button,
  Card,
  CardBody,
  CardFooter,
  Alert,
  Divider,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";

import { ApplicationLayout } from "../../layouts/Layout";

interface IndexProps {
  accounts: AccountType[];
  flash: { notice?: string };
}

function Index({ accounts, flash }: IndexProps) {
  const [flashVisible, setFlashVisible] = useState(!!flash.notice);
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredAccounts = accounts.filter(account => 
    account.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Head title="Accounts" />

      {flash.notice && flashVisible && (
        <Alert
          className="mb-6"
          onClose={() => setFlashVisible(false)}
          color="success"
        >
          {flash.notice}
        </Alert>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold">Accounts</h1>
        <Link href="/accounts/new">
          <Button color="primary" size="lg">
            Create New Account
          </Button>
        </Link>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="w-full sm:w-64">
          <Input
            placeholder="Search accounts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            isClearable
            className="w-full"
          />
        </div>
        
        <div className="flex gap-2">
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered">Sort By</Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Sort options">
              <DropdownItem key="name">Name</DropdownItem>
              <DropdownItem key="recent">Recently Created</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      
      <Divider className="mb-6" />

      {filteredAccounts.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredAccounts.map((account) => (
            <Card key={account.id} className="shadow-sm hover:shadow-md transition-shadow">
              <CardBody className="p-6">
                <Account account={account} />
              </CardBody>
              <Divider />
              <CardFooter className="flex justify-between items-center px-6 py-4">
                <div className="text-sm text-gray-500">
                  ID: {account.id}
                </div>
                <div className="flex gap-2">
                  <Link href={`/accounts/${account.id}/edit`}>
                    <Button size="sm" variant="flat">
                      Edit
                    </Button>
                  </Link>
                  <Link href={`/accounts/${account.id}`}>
                    <Button size="sm" color="primary">
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="shadow-sm">
          <CardBody className="p-8 text-center">
            <div className="flex flex-col items-center justify-center py-8">
              <div className="text-gray-400 mb-4 text-5xl">
                <span role="img" aria-label="No accounts">📁</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">No accounts found</h3>
              <p className="text-gray-500 mb-4">
                {searchQuery ? `No accounts match "${searchQuery}"` : 'Create your first account to get started.'}
              </p>
              {searchQuery ? (
                <Button color="primary" onClick={() => setSearchQuery("")}>
                  Clear Search
                </Button>
              ) : (
                <Link href="/accounts/new">
                  <Button color="primary">
                    Create Account
                  </Button>
                </Link>
              )}
            </div>
          </CardBody>
        </Card>
      )}
    </>
  );
}

Index.layout = (page: React.ReactNode) => <ApplicationLayout>{page}</ApplicationLayout>;

export default Index;
