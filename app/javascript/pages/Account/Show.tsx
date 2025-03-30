import { Head, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import Account from "./Account";
import { AccountType } from "./types";
import { AccountUserType } from "./Users/types";
import {
  Button,
  Breadcrumbs,
  BreadcrumbItem,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Alert,
  Divider,
  Tabs,
  Tab,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  ButtonGroup,
  Tooltip,
} from "@heroui/react";
import { Link, router } from "@inertiajs/react";

interface ShowProps {
  account: AccountType;
  account_users: AccountUserType[];
  flash: { notice?: string; alert?: string };
}

export default function Show({ account, account_users, flash }: ShowProps) {
  const [flashVisible, setFlashVisible] = useState(!!flash.notice || !!flash.alert);
  const [selected, setSelected] = useState("details");

  const availableRoles = ["admin", "member"];
  const { url: pathname } = usePage();

  useEffect(() => {
    const validTabs = ["details", "users", "activity"];
    const tab = pathname.split("?tab=").pop() || "";
    setSelected(validTabs.includes(tab) ? tab : "details");
  }, [pathname]);

  const onChangeTab = (key: string) => {
    setSelected(key);
    router.visit(`/accounts/${account.id}?tab=${key}`, {
      preserveScroll: true,
      preserveState: true,
      replace: true,
    });
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "primary";
      case "member":
        return "secondary";
      default:
        return "default";
    }
  };

  const confirmRemove = (accountUserId: number, userName: string | null, isAdmin: boolean) => {
    if (isAdmin) {
      const confirmMessage = `Are you sure you want to remove ${userName || "this admin"} from the account? This action cannot be undone.`;
      if (!confirm(confirmMessage)) return;
    }
    
    router.delete(`/accounts/${account.id}/users/${accountUserId}`);
  };

  const updateUserRole = (accountUserId: number, userName: string | null, currentRole: string, newRole: string) => {
    if (currentRole === newRole) return;

    if (currentRole === "admin" && newRole !== "admin") {
      const confirmMessage = `Are you sure you want to change ${userName || "this admin"}'s role from admin to ${newRole}?`;
      if (!confirm(confirmMessage)) return;
    }

    router.patch(`/accounts/${account.id}/users/${accountUserId}`, {
      account_user: { role: newRole }
    });
  };

  return (
    <>
      <Head title={`Account: ${account.name}`} />

      {(flash.notice || flash.alert) && flashVisible && (
        <Alert
          className="mb-6"
          onClose={() => setFlashVisible(false)}
          color={flash.alert ? "danger" : "success"}
        >
          {flash.alert || flash.notice}
        </Alert>
      )}

      <Breadcrumbs className="mb-6">
        <BreadcrumbItem>
          <Link href="/accounts">Accounts</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>{account.name}</BreadcrumbItem>
      </Breadcrumbs>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold">{account.name}</h1>
        <div className="flex flex-wrap gap-2">
          <Button
            as={Link}
            href={`/accounts/${account.id}/edit`}
            color="primary"
          >
            Edit Account
          </Button>
          <Button
            onPress={() => {
              if (confirm("Are you sure you want to delete this account?")) {
                router.delete(`/accounts/${account.id}`);
              }
            }}
            color="danger"
            variant="light"
          >
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2 shadow-sm">
          <CardHeader className="bg-gray-50 dark:bg-gray-800">
            <h2 className="text-xl font-semibold">Account Overview</h2>
          </CardHeader>
          <CardBody className="p-6">
            <div className="mb-8">
              <Account account={account} />
            </div>

            <Tabs aria-label="Account sections" selectedKey={selected} onSelectionChange={(key) => onChangeTab(key.toString())}>
              <Tab key="details" title="Details">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-gray-500">
                    Account Details
                  </h3>
                  <Button
                    as={Link}
                    href={`/accounts/${account.id}/edit`}
                    color="primary"
                    size="sm"
                  >
                    Edit Account
                  </Button>
                </div>
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <div className="text-sm text-gray-500">
                        Account Name
                      </div>
                      <div className="font-medium">{account.name}</div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <div className="text-sm text-gray-500">Account ID</div>
                      <div className="font-medium">{account.id}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-16">
                  <h3 className="text-md font-medium text-gray-500 mb-2">
                    Coming Soon
                  </h3>
                  <p className="text-sm text-gray-500 italic">
                    Additional account details will be displayed here in the
                    future.
                  </p>
                </div>
              </Tab>
              <Tab key="users" title="Members">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-gray-500">
                    Account Members
                  </h3>
                  <Button
                    as={Link}
                    href={`/accounts/${account.id}/users/new`}
                    color="primary"
                    size="sm"
                  >
                    Add New User
                  </Button>
                </div>
                <Table removeWrapper aria-label="Users table">
                  <TableHeader>
                    <TableColumn>USER</TableColumn>
                    <TableColumn>EMAIL</TableColumn>
                    <TableColumn>ROLE</TableColumn>
                    <TableColumn className="text-right">ACTIONS</TableColumn>
                  </TableHeader>
                  <TableBody emptyContent="No users found.">
                    {account_users.map((account_user) => (
                      <TableRow key={account_user.id}>
                        <TableCell>
                          <div className="font-medium">
                            {account_user.user.name || "Unnamed User"}
                          </div>
                        </TableCell>
                        <TableCell>{account_user.user.email_address}</TableCell>
                        <TableCell>
                          <Dropdown>
                            <DropdownTrigger>
                              <Button variant="light" size="sm">
                                <Chip color={getRoleColor(account_user.role)} size="sm">
                                  {account_user.role}
                                </Chip>
                              </Button>
                            </DropdownTrigger>
                            <DropdownMenu 
                              aria-label="Role selection"
                              onAction={(key) => {
                                updateUserRole(
                                  account_user.id, 
                                  account_user.user.name, 
                                  account_user.role, 
                                  key as string
                                );
                              }}
                            >
                              {availableRoles.map((role) => (
                                <DropdownItem 
                                  key={role}
                                  textValue={role}
                                  className={role === account_user.role ? "font-bold" : ""}
                                >
                                  {role.charAt(0).toUpperCase() + role.slice(1)}
                                  {role === account_user.role && " (current)"}
                                </DropdownItem>
                              ))}
                            </DropdownMenu>
                          </Dropdown>
                        </TableCell>
                        <TableCell className="text-right">
                          <ButtonGroup size="sm">
                            <Tooltip content="Remove user from account">
                              <Button
                                color="danger"
                                variant="light"
                                onPress={() => confirmRemove(
                                  account_user.id, 
                                  account_user.user.name, 
                                  account_user.role === "admin"
                                )}
                              >
                                Remove
                              </Button>
                            </Tooltip>
                          </ButtonGroup>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Tab>
              <Tab key="activity" title="Activity">
                <p>Account activity will be available soon</p>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>

        <Card className="shadow-sm h-min">
          <CardHeader className="bg-gray-50 dark:bg-gray-800">
            <h2 className="text-xl font-semibold">Quick Actions</h2>
          </CardHeader>
          <CardBody className="p-4">
            <div className="flex flex-col gap-2">
              <Button
                as={Link}
                href={`/accounts/${account.id}/edit`}
                color="primary"
                variant="flat"
                fullWidth
                className="justify-start"
              >
                Edit Account Details
              </Button>
              <Button
                as={Link}
                href={`/accounts/${account.id}/users/new`}
                color="secondary"
                variant="flat"
                fullWidth
                className="justify-start"
              >
                Add New User
              </Button>
              <Button
                color="secondary"
                variant="flat"
                fullWidth
                className="justify-start"
                disabled
              >
                Account Settings (Coming Soon)
              </Button>
            </div>
          </CardBody>
          <Divider />
          <CardFooter className="flex justify-end">
            <Button as={Link} href="/accounts" variant="light">
              Back to accounts
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
