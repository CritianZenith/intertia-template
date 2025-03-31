import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@heroui/react";
import { Link } from "@inertiajs/react";
import { AccountDropdown } from "../components/AccountDropdown";
import { ProfileDropdown } from "../components/ProfileDropdown";
import {
  HomeIcon,
  BuildingOfficeIcon,
  UserIcon,
  CogIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";

interface NavMobileProps {
  pathname: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function NavMobile({
  pathname,
  isOpen,
  onOpenChange,
}: NavMobileProps) {
  // Define navigation items
  const navItems = [
    { name: "Dashboard", href: "/", icon: HomeIcon },
    { name: "Profile", href: "/profile", icon: UserIcon },
    { name: "Settings", href: "/settings", icon: CogIcon },
  ];

  const CloseButton = () => (
    <button
      onClick={() => onOpenChange(false)}
      className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      <Bars3Icon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
    </button>
  );

  return (
    <Drawer
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="xs"
      placement="left"
      backdrop="blur"
      hideCloseButton
    >
      <DrawerContent>
        <DrawerHeader className="flex justify-between items-center">
          <AccountDropdown className="flex-1 max-w-[200px]" />
          <CloseButton />
        </DrawerHeader>
        <DrawerBody>
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
        </DrawerBody>
        <DrawerFooter className="justify-center">
          <div className="mt-6 flex justify-center w-full">
            <ProfileDropdown />
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
