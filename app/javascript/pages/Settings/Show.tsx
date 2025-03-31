import { Head, usePage, router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { SettingsAccountType, AccountUserType } from "./types";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Alert,
  Divider,
  Image,
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
  Switch,
} from "@heroui/react";
import { Link } from "@inertiajs/react";
import Account from "../Account/Account";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

interface ShowProps {
  account: SettingsAccountType;
  account_users: AccountUserType[];
  flash: { notice?: string; alert?: string };
}

export default function Show({ account, account_users = [], flash }: ShowProps) {
  const [flashVisible, setFlashVisible] = useState(true);
  const [selected, setSelected] = useState("details");
  const { url: pathname } = usePage();
  const availableRoles = ["admin", "member"];
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Initialize dark mode state based on document class
    setIsDarkMode(document.documentElement.classList.contains("dark"));
  }, []);

  useEffect(() => {
    const validTabs = ["details", "users", "preferences"];
    const tab = pathname.split("?tab=").pop() || "";
    setSelected(validTabs.includes(tab) ? tab : "details");
  }, [pathname]);

  const onChangeTab = (key: string) => {
    setSelected(key);
    router.visit(`/settings?tab=${key}`, {
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

  const confirmRemove = (
    accountUserId: number,
    userName: string | null,
    isAdmin: boolean,
  ) => {
    if (isAdmin) {
      const confirmMessage = `Are you sure you want to remove ${userName || "this admin"} from the account? This action cannot be undone.`;
      if (!confirm(confirmMessage)) return;
    }

    router.delete(`/settings/users/${accountUserId}`);
  };

  const updateUserRole = (
    accountUserId: number,
    userName: string | null,
    currentRole: string,
    newRole: string,
  ) => {
    if (currentRole === newRole) return;

    if (currentRole === "admin" && newRole !== "admin") {
      const confirmMessage = `Are you sure you want to change ${userName || "this admin"}'s role from admin to ${newRole}?`;
      if (!confirm(confirmMessage)) return;
    }

    router.patch(`/settings/users/${accountUserId}`, {
      account_user: { role: newRole },
    });
  };

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      document.cookie = "theme=light; path=/; max-age=31536000; SameSite=Lax";
      // Update theme-color meta tag
      const themeColorMeta = document.querySelector('meta[name="theme-color"]');
      if (themeColorMeta) {
        themeColorMeta.setAttribute("content", "#f3f4f6");
      }
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      document.cookie = "theme=dark; path=/; max-age=31536000; SameSite=Lax";
      // Update theme-color meta tag
      const themeColorMeta = document.querySelector('meta[name="theme-color"]');
      if (themeColorMeta) {
        themeColorMeta.setAttribute("content", "#111827");
      }
      setIsDarkMode(true);
    }
  };

  return (
    <>
      <Head title="Settings" />

      <div className="py-4 sm:py-6 lg:py-8 max-w-7xl mx-auto">
        {(flash.notice || flash.alert) && flashVisible && (
          <Alert
            color={flash.alert ? "danger" : "success"}
            onClose={() => setFlashVisible(false)}
            className="mb-4"
          >
            {flash.notice || flash.alert}
          </Alert>
        )}

        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-gray-500">Manage your account settings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2 shadow-sm">
            <CardHeader className="bg-gray-50 dark:bg-gray-800">
              <h2 className="text-xl font-semibold">Account Settings</h2>
            </CardHeader>
            <CardBody className="p-6">
              <div className="mb-8">
                <Account account={account} />
              </div>

              <Tabs
                aria-label="Account sections"
                selectedKey={selected}
                onSelectionChange={(key) => onChangeTab(key.toString())}
              >
                <Tab key="details" title="Details">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium text-gray-500">Account Details</h3>
                    <Button
                      as={Link}
                      href="/settings/edit"
                      color="primary"
                      size="sm"
                    >
                      Edit Settings
                    </Button>
                  </div>
                  <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <div className="text-sm text-gray-500">Account Name</div>
                        <div className="font-medium">{account.name}</div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <div className="text-sm text-gray-500">Members</div>
                        <div className="font-medium">{account.users_count}</div>
                      </div>
                    </div>
                  </div>
                </Tab>
                
                <Tab key="users" title="Members">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium text-gray-500">Account Members</h3>
                    <Button
                      as={Link}
                      href="/settings/users/new"
                      color="primary"
                      size="sm"
                    >
                      Add New User
                    </Button>
                  </div>
                  
                  {account_users.length > 0 ? (
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
                                    <Chip
                                      color={getRoleColor(account_user.role)}
                                      size="sm"
                                    >
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
                                      key as string,
                                    );
                                  }}
                                >
                                  {availableRoles.map((role) => (
                                    <DropdownItem
                                      key={role}
                                      textValue={role}
                                      className={
                                        role === account_user.role
                                          ? "font-bold"
                                          : ""
                                      }
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
                                    onPress={() =>
                                      confirmRemove(
                                        account_user.id,
                                        account_user.user.name,
                                        account_user.role === "admin",
                                      )
                                    }
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
                  ) : (
                    <div className="text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <p className="text-gray-500 mb-2">No users found in this account.</p>
                      <Button
                        as={Link}
                        href="/settings/users/new"
                        color="primary"
                        variant="flat"
                        className="mt-4"
                        size="sm"
                      >
                        Add New User
                      </Button>
                    </div>
                  )}
                </Tab>
                
                <Tab key="preferences" title="Preferences">
                  <div className="space-y-6">
                    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                      <h3 className="font-medium text-lg mb-4">Theme Settings</h3>
                      
                      <div className="flex items-center justify-between py-2 px-2 border-b border-gray-200 dark:border-gray-700">
                        <div>
                          <p className="font-medium">Dark Mode</p>
                          <p className="text-sm text-gray-500">Enable dark mode for the application</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <SunIcon className="h-5 w-5 text-gray-500" />
                          <Switch
                            isSelected={isDarkMode}
                            onValueChange={toggleDarkMode}
                            size="sm"
                          />
                          <MoonIcon className="h-5 w-5 text-gray-500" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                      <h3 className="font-medium text-lg mb-3">Notification Preferences</h3>
                      <p className="text-gray-500 mb-4">
                        Notification settings will be available soon. This will include 
                        email notifications, in-app alerts, and more.
                      </p>
                      <div className="flex items-center gap-2">
                        <Button color="primary" disabled>
                          Configure Notifications
                        </Button>
                        <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">
                          Coming soon
                        </span>
                      </div>
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </CardBody>
          </Card>

          <div className="lg:col-span-1">
            <Card className="shadow-sm mb-6">
              <CardHeader className="bg-gray-50 dark:bg-gray-800">
                <h3 className="text-lg font-semibold">Quick Actions</h3>
              </CardHeader>
              <CardBody>
                <div className="space-y-2">
                  <Button
                    as={Link}
                    href="/settings/users/new"
                    color="primary"
                    variant="flat"
                    className="w-full justify-start"
                  >
                    Invite Team Member
                  </Button>
                  <Button
                    as={Link}
                    href="/settings/edit"
                    color="secondary"
                    variant="flat"
                    className="w-full justify-start"
                  >
                    Edit Profile Settings
                  </Button>
                  <Button
                    onPress={() => onChangeTab("preferences")}
                    color="secondary"
                    variant="flat"
                    className="w-full justify-start"
                  >
                    Theme Settings
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}