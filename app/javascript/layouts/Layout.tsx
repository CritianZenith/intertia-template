import React, { useState, useEffect } from "react";
import { usePage, router } from "@inertiajs/react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Divider,
  Switch,
  HeroUIProvider,
} from "@heroui/react";
import { AccountsList } from "../components/AccountsList";
import {
  Bars3Icon,
  HomeIcon,
  BuildingOfficeIcon,
  UserIcon,
  CogIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import { NavDesktop } from "./NavDesktop";
import { NavMobile } from "./NavMobile";

// Configure the router for HeroUI components
const navigate = (href: string, options: { scroll?: boolean } = {}) => {
  router.push({
    url: href,
    preserveScroll: options.scroll === false ? false : true,
    ...options
  });
};

// Convert route paths to full URLs
const useHref = (href: string) => href;

export function ApplicationLayout({ children }: { children: React.ReactNode }) {
  const { url } = usePage();
  const pathname = url;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize dark mode based on system preference or saved setting
  useEffect(() => {
    // Check if user has a saved preference
    const savedTheme = localStorage.getItem("theme");

    if (
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
      // Ensure cookie is in sync
      document.cookie = "theme=dark; path=/; max-age=31536000; SameSite=Lax";
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
      // Ensure cookie is in sync
      document.cookie = "theme=light; path=/; max-age=31536000; SameSite=Lax";
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      document.cookie = "theme=light; path=/; max-age=31536000; SameSite=Lax";
      // Update theme-color meta tag
      const themeColorMeta = document.querySelector('meta[name="theme-color"]');
      if (themeColorMeta) {
        themeColorMeta.setAttribute('content', '#f9fafb');
      }
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      document.cookie = "theme=dark; path=/; max-age=31536000; SameSite=Lax";
      // Update theme-color meta tag
      const themeColorMeta = document.querySelector('meta[name="theme-color"]');
      if (themeColorMeta) {
        themeColorMeta.setAttribute('content', '#111827');
      }
      setIsDarkMode(true);
    }
  };

  // Toggle nav expansion
  const toggleNavExpanded = () => {
    const newState = !isNavExpanded;
    setIsNavExpanded(newState);
  };

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

  // Mobile sidebar (Drawer)
  const MobileSidebar = () => (
    <Drawer
      isOpen={isSidebarOpen}
      onOpenChange={setIsSidebarOpen}
      placement="left"
    >
      <DrawerContent>
        <DrawerHeader className="flex justify-between items-center">
          <span className="text-xl font-bold">Management App</span>
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
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </div>
          <Divider className="my-4" />
          <AccountsList heading="Your Accounts" />
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

  return (
    <HeroUIProvider navigate={navigate} useHref={useHref}>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden">
        {/* Desktop Navigation */}
        <NavDesktop 
          pathname={pathname}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          isExpanded={isNavExpanded}
          toggleExpanded={toggleNavExpanded}
        />

        {/* Mobile Navigation */}
        <NavMobile
          pathname={pathname}
          isOpen={isSidebarOpen}
          onOpenChange={setIsSidebarOpen}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />

        {/* Content container that adjusts based on nav state */}
        <div 
          className={`flex flex-col flex-1 w-full max-w-full transition-all duration-300 ease-in-out overflow-hidden ${
            isNavExpanded ? "lg:ml-64" : "lg:ml-0"
          }`}
        >
          {/* Mobile navbar */}
          <Navbar shouldHideOnScroll className="lg:hidden bg-gray-100 dark:bg-gray-900 dark:text-white">
            <NavbarContent>
              <NavbarItem>
                <Button
                  isIconOnly
                  variant="light"
                  onClick={() => setIsSidebarOpen(true)}
                >
                  <Bars3Icon className="h-6 w-6" />
                </Button>
              </NavbarItem>
            </NavbarContent>
          </Navbar>

          {/* Main content */}
          <main className="flex-1 overflow-auto dark:bg-gray-900 dark:text-gray-200 lg:pt-4">
            <div className={`w-full ${!isNavExpanded ? "lg:pl-16" : ""} px-4 max-w-full mx-auto`}>
              {children}
            </div>
          </main>
        </div>
      </div>
    </HeroUIProvider>
  );
}
