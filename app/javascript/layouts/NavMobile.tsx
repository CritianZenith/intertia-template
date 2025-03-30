import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Divider,
  Switch,
} from "@heroui/react";
import { Link } from "@inertiajs/react";
import { AccountDropdown } from "../components/AccountDropdown";
import {
  HomeIcon,
  BuildingOfficeIcon,
  UserIcon,
  CogIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";

interface NavMobileProps {
  pathname: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export function NavMobile({
  pathname,
  isOpen,
  onOpenChange,
  isDarkMode,
  toggleDarkMode,
}: NavMobileProps) {
  // Define navigation items
  const navItems = [
    { name: "Dashboard", href: "/", icon: HomeIcon },
    { name: "Accounts", href: "/accounts", icon: BuildingOfficeIcon },
    { name: "Profile", href: "/profile", icon: UserIcon },
    { name: "Settings", href: "/settings", icon: CogIcon },
  ];

  // Dark mode toggle component
  const DarkModeToggle = () => (
    <div className="flex items-center space-x-2">
      <SunIcon className="h-5 w-5 text-gray-500" />
      <Switch
        isSelected={isDarkMode}
        onValueChange={toggleDarkMode}
        size="sm"
      />
      <MoonIcon className="h-5 w-5 text-gray-500" />
    </div>
  );

  return (
    <Drawer
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="xs"
      placement="left"
    >
      <DrawerContent>
        <DrawerHeader className="flex justify-between items-center">
          <AccountDropdown className="flex-1 max-w-[200px]" />
        </DrawerHeader>
        <DrawerBody>
          <Divider className="my-4" />
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === item.href
                    ? "bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300"
                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                }`}
                onClick={() => onOpenChange(false)}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <DarkModeToggle />
          </div>
        </DrawerBody>
        <DrawerFooter>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Management App
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
