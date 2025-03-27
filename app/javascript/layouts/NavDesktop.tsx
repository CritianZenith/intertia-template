import React from "react";
import {
  Link,
  Divider,
  Switch,
  Tooltip,
} from "@heroui/react";
import { AccountsList } from "../components/AccountsList";
import {
  HomeIcon,
  BuildingOfficeIcon,
  UserIcon,
  CogIcon,
  SunIcon,
  MoonIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";

interface NavDesktopProps {
  pathname: string;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isExpanded: boolean;
  toggleExpanded: () => void;
}

export function NavDesktop({
  pathname,
  isDarkMode,
  toggleDarkMode,
  isExpanded,
  toggleExpanded,
}: NavDesktopProps) {
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
    <>
      {/* The sidebar container with width transition */}
      <div
        className={`hidden lg:flex lg:flex-col fixed inset-y-0 z-20 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out ${
          isExpanded ? "w-64" : "w-0 overflow-hidden"
        }`}
      >
        {/* Inner content with opacity transition to avoid animating text */}
        <div className={`w-64 ${isExpanded ? "opacity-100" : "opacity-0"}`} style={{ 
          transition: "opacity 0.15s ease-in-out",
          transitionDelay: isExpanded ? "0.15s" : "0s" 
        }}>
          <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
            <span className="text-xl font-bold dark:text-white">
              Management App
            </span>
            <button
              onClick={toggleExpanded}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Bars3Icon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          <div className="flex-1 flex flex-col overflow-y-auto p-2">
            <nav className="flex-1 space-y-1 mt-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === item.href
                      ? "bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300"
                      : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>

            <Divider className="my-4" />
            <AccountsList heading="Your Accounts" />
            <div className="mt-4 flex justify-center">
              <DarkModeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Floating button to open sidebar when collapsed */}
      {!isExpanded && (
        <button
          onClick={toggleExpanded}
          className="hidden lg:flex fixed top-4 left-4 z-10 p-2 rounded-md bg-white dark:bg-gray-800 shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-200"
        >
          <Bars3Icon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </button>
      )}
    </>
  );
} 