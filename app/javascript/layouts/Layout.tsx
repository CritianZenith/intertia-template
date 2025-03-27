import React, { useState, useEffect } from "react";
import { usePage, router } from "@inertiajs/react";
import { Button, HeroUIProvider } from "@heroui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { NavDesktop } from "./NavDesktop";
import { NavMobile } from "./NavMobile";

// Configure the router for HeroUI components
const navigate = (href: string, options: { scroll?: boolean } = {}) => {
  router.push({
    url: href,
    preserveScroll: options.scroll === false ? false : true,
    ...options,
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

  // Toggle nav expansion
  const toggleNavExpanded = () => {
    const newState = !isNavExpanded;
    setIsNavExpanded(newState);
  };

  // Fix for iOS Safari height issues - use CSS variables for viewport height
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setVh();
    window.addEventListener("resize", setVh);
    return () => window.removeEventListener("resize", setVh);
  }, []);

  return (
    <HeroUIProvider navigate={navigate} useHref={useHref}>
      <div className="flex h-[100vh] h-[calc(var(--vh,1vh)*100)] overflow-hidden">
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
          className={`flex flex-col flex-1 w-full max-w-full transition-all duration-300 ease-in-out ${
            isNavExpanded ? "lg:ml-64" : "lg:ml-0"
          }`}
        >
          {/* Mobile navbar */}
          <div className="sticky top-0 z-10 bg-gray-100 dark:bg-gray-900 p-2 lg:hidden">
            <Button
              isIconOnly
              variant="light"
              onPress={() => setIsSidebarOpen(true)}
            >
              <Bars3Icon className="h-6 w-6" />
            </Button>
          </div>

          {/* Main content */}
          <main className="flex-1 overflow-y-auto overflow-x-hidden lg:pt-4 pb-safe">
            <div
              className={`w-full ${!isNavExpanded ? "lg:px-16" : ""} px-4 max-w-full mx-auto pb-6`}
            >
              {children}
            </div>
          </main>
        </div>
      </div>
    </HeroUIProvider>
  );
}
