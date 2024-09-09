import { Metadata } from "next";

import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { SidebarNav } from "./sidebar-nav";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Configurações",
  description: "Ajuste suas configurações e da clinica.",
};

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/app/config",
  },
  {
    title: "Clinica",
    href: "/app/config/clinic",
  },
  {
    title: "Account",
    href: "/app/config/account",
  },
  {
    title: "Appearance",
    href: "/app/config/appearance",
  },
  {
    title: "Notifications",
    href: "/app/config/notifications",
  },
  {
    title: "Display",
    href: "/app/config/display",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

const SettingsLayout = ({ children }: SettingsLayoutProps) => {
  return (
    <>
      <CardHeader className="hidden md:flex flex-row justify-between items-baseline">
        <div className="gap-2 flex-col flex">
          <CardTitle className="text-primaryBlue md:text-xl">Configurações</CardTitle>
          <CardDescription>Manage your account settings and set e-mail preferences.</CardDescription>
        </div>
      </CardHeader>
      <div className="py-2 px-6">
        <Separator />

        <CardContent className="gap-10 pb-10 pt-6 justify-start flex">
          <aside className="lg:w-1/6">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </CardContent>
      </div>
    </>
  );
};

export default SettingsLayout;
