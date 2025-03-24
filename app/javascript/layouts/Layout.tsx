import { Avatar } from "../components/ui/avatar";
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from "../components/ui/dropdown";
import {
  Navbar,
  NavbarItem,
  NavbarSection,
  NavbarSpacer,
} from "../components/ui/navbar";
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarHeading,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarSpacer,
} from "../components/ui/sidebar";
import { SidebarLayout } from "../components/ui/sidebar-layout";

import {
  ArrowRightStartOnRectangleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Cog8ToothIcon,
  LightBulbIcon,
  PlusIcon,
  ShieldCheckIcon,
  UserCircleIcon,
} from "@heroicons/react/16/solid";
import {
  Cog6ToothIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
  Square2StackIcon,
  TicketIcon,
} from "@heroicons/react/20/solid";
import { MenuItemsProps } from "@headlessui/react";
import { usePage } from "@inertiajs/react";
import { useQuery } from "@apollo/client";
import { GET_ACCOUNTS } from "../lib/queries";

type AnchorProps = MenuItemsProps["anchor"];

// Interface for the account data returned from GraphQL
interface Account {
  id: string;
  name: string;
}

interface AccountsData {
  accounts: {
    edges: {
      node: Account;
    }[];
  };
}

function AccountDropdownMenu({ anchor }: { anchor: AnchorProps }) {
  return (
    <DropdownMenu className="min-w-64" anchor={anchor}>
      <DropdownItem href="#">
        <UserCircleIcon />
        <DropdownLabel>My account</DropdownLabel>
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem href="#">
        <ShieldCheckIcon />
        <DropdownLabel>Privacy policy</DropdownLabel>
      </DropdownItem>
      <DropdownItem href="#">
        <LightBulbIcon />
        <DropdownLabel>Share feedback</DropdownLabel>
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem href="/session/destroy">
        <ArrowRightStartOnRectangleIcon />
        <DropdownLabel>Sign out</DropdownLabel>
      </DropdownItem>
    </DropdownMenu>
  );
}

export function ApplicationLayout({ children }: { children: React.ReactNode }) {
  const { url } = usePage();
  let pathname = url;
  
  // Fetch accounts from GraphQL
  const { loading, error, data } = useQuery<AccountsData>(GET_ACCOUNTS);
  
  // Extract accounts from the data if available
  const accounts = data?.accounts?.edges?.map(edge => edge.node) || [];

  return (
    <SidebarLayout
      navbar={
        <Navbar>
          <NavbarSpacer />
          <NavbarSection>
            <Dropdown>
              <DropdownButton as={NavbarItem}>
                <Avatar initials="JK" square />
              </DropdownButton>
              <AccountDropdownMenu anchor="bottom end" />
            </Dropdown>
          </NavbarSection>
        </Navbar>
      }
      sidebar={
        <Sidebar>
          <SidebarHeader>
            <Dropdown>
              <DropdownButton as={SidebarItem}>
                <Avatar initials={accounts.length > 0 ? accounts[0].name.charAt(0) : "M"} />
                <SidebarLabel>{accounts.length > 0 ? accounts[0].name : "Loading..."}</SidebarLabel>
                <ChevronDownIcon />
              </DropdownButton>
              <DropdownMenu
                className="min-w-80 lg:min-w-64"
                anchor="bottom start"
              >
                {loading && (
                  <DropdownItem disabled>
                    <DropdownLabel>Loading accounts...</DropdownLabel>
                  </DropdownItem>
                )}
                
                {error && (
                  <DropdownItem disabled>
                    <DropdownLabel>Error loading accounts</DropdownLabel>
                  </DropdownItem>
                )}
                
                {!loading && !error && accounts.map((account) => (
                  <DropdownItem key={account.id} href="#">
                    <Avatar slot="icon" initials={account.name.charAt(0)} />
                    <DropdownLabel>{account.name}</DropdownLabel>
                  </DropdownItem>
                ))}
                
                <DropdownDivider />
                <DropdownItem href="/accounts/new">
                  <PlusIcon />
                  <DropdownLabel>New account&hellip;</DropdownLabel>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </SidebarHeader>

          <SidebarBody>
            <SidebarSection>
              <SidebarItem href="/" current={pathname === "/"}>
                <HomeIcon />
                <SidebarLabel>Home</SidebarLabel>
              </SidebarItem>
              <SidebarItem
                href="/events"
                current={pathname.startsWith("/events")}
              >
                <Square2StackIcon />
                <SidebarLabel>Events</SidebarLabel>
              </SidebarItem>
              <SidebarItem
                href="/orders"
                current={pathname.startsWith("/orders")}
              >
                <TicketIcon />
                <SidebarLabel>Orders</SidebarLabel>
              </SidebarItem>
              <SidebarItem
                href="/settings"
                current={pathname.startsWith("/settings")}
              >
                <Cog6ToothIcon />
                <SidebarLabel>Settings</SidebarLabel>
              </SidebarItem>
            </SidebarSection>

            <SidebarSection className="max-lg:hidden">
              <SidebarHeading>Your Accounts</SidebarHeading>
              {loading && <SidebarItem disabled>Loading accounts...</SidebarItem>}
              {error && <SidebarItem disabled>Error loading accounts</SidebarItem>}
              {!loading && !error && accounts.map((account) => (
                <SidebarItem key={account.id} href="#">
                  <Avatar initials={account.name.charAt(0)} />
                  <SidebarLabel>{account.name}</SidebarLabel>
                </SidebarItem>
              ))}
              <SidebarItem href="/accounts/new">
                <PlusIcon />
                <SidebarLabel>New account</SidebarLabel>
              </SidebarItem>
            </SidebarSection>

            <SidebarSpacer />

            <SidebarSection>
              <SidebarItem href="#">
                <QuestionMarkCircleIcon />
                <SidebarLabel>Support</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="#">
                <SparklesIcon />
                <SidebarLabel>Changelog</SidebarLabel>
              </SidebarItem>
            </SidebarSection>
          </SidebarBody>

          <SidebarFooter className="max-lg:hidden">
            <Dropdown>
              <DropdownButton as={SidebarItem}>
                <span className="flex min-w-0 items-center gap-3">
                  <Avatar initials="SB" className="size-10" square alt="" />
                  <span className="min-w-0">
                    <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">
                      Sheila
                    </span>
                    <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                      sheila@example.com
                    </span>
                  </span>
                </span>
                <ChevronUpIcon />
              </DropdownButton>
              <AccountDropdownMenu anchor="top start" />
            </Dropdown>
          </SidebarFooter>
        </Sidebar>
      }
    >
      {children}
    </SidebarLayout>
  );
}
