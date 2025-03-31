import { usePage } from '@inertiajs/react'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Avatar,
  Switch,
} from "@heroui/react";
import { Link } from "@inertiajs/react";
import {
  ArrowRightOnRectangleIcon,
  UserIcon,
  CogIcon,
  SunIcon,
  MoonIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";

interface ProfileDropdownProps {
  className?: string;
}

interface User {
  name: string;
  email_address: string;
  avatar_url?: string;
}

export function ProfileDropdown({
  className = "",
}: ProfileDropdownProps) {
  let { user: userData } = usePage().props;

  const user = userData as User;

  return (
    <div className={`${className} w-full`}>
      <Dropdown placement="top">
        <DropdownTrigger>
          <Button
            variant="light"
            className="flex items-center justify-between pl-0 space-x-2 w-full"
            isIconOnly
          >
            <div className="flex items-center space-x-2">
              <Avatar
                src={user.avatar_url}
                name={user.name ? user.name.slice(0, 1) : user.email_address.slice(0, 1)}
                size="sm"
              />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {user.name ? user.name : user.email_address}
              </span>
            </div>
            <ChevronUpIcon className="h-4 w-4 ml-2" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile actions">
          <DropdownItem key="user-info" isReadOnly showDivider>
            <div className="flex flex-col">
              <span className="font-medium">{user.name}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {user.email_address}
              </span>
            </div>
          </DropdownItem>
          
          <DropdownItem key="profile" as={Link} href="/profile" startContent={<UserIcon className="h-5 w-5" />}>
            Profile
          </DropdownItem>
          
          <DropdownItem key="settings" as={Link} href="/settings" startContent={<CogIcon className="h-5 w-5" />}>
            Settings
          </DropdownItem>
          
          <DropdownItem 
            key="logout" 
            color="danger" 
            as={Link} 
            href="/session/destroy"
            startContent={<ArrowRightOnRectangleIcon className="h-5 w-5" />}
          >
            Logout
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
} 