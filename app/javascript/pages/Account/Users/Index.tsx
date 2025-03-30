import { Head } from "@inertiajs/react";
import { useState } from "react";
import { AccountType } from "../types";
import { AccountUserType } from "./types";
import {
  Button,
  Breadcrumbs,
  BreadcrumbItem,
  Card,
  CardBody,
  CardHeader,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Alert,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  ButtonGroup,
  Tooltip,
} from "@heroui/react";
import { Link, router } from "@inertiajs/react";

interface IndexProps {
  account: AccountType;
  account_users: AccountUserType[];
  flash: { notice?: string; alert?: string };
}

export default function Index({ account, account_users, flash }: IndexProps) {
  const [flashVisible, setFlashVisible] = useState(!!flash.notice || !!flash.alert);

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

  return (
    <>
      <Head title={`Account: ${account.name} - Users`} />

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
        <BreadcrumbItem>
          <Link href={`/accounts/${account.id}`}>{account.name}</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>Users</BreadcrumbItem>
      </Breadcrumbs>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold">Account Users</h1>
        <div className="flex flex-wrap gap-2">
          <Button as={Link} href={`/accounts/${account.id}/users/new`} color="primary">
            Add New User
          </Button>
          <Button as={Link} href={`/accounts/${account.id}`} variant="bordered">
            Back to Account
          </Button>
        </div>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="flex justify-between items-center bg-gray-50 dark:bg-gray-800">
          <h2 className="text-xl font-semibold">Users</h2>
          <div className="text-sm text-gray-500">{account_users.length} users</div>
        </CardHeader>
        <CardBody className="p-0">
          <Table>
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
                    <Chip color={getRoleColor(account_user.role)} size="sm">
                      {account_user.role}
                    </Chip>
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
        </CardBody>
      </Card>
    </>
  );
} 