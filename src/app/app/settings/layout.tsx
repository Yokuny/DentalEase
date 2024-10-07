import React from "react";
import { Metadata } from "next";

import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { SidebarNav } from "./sidebar-nav";

export const metadata: Metadata = {
  title: "Configurações",
  description: "Ajuste configurações da clinica e perfil.",
};

const sidebarNavItems = [
  {
    title: "Perfil",
    href: "/app/settings",
  },
  {
    title: "Acesso",
    href: "/app/settings/acess",
  },
  {
    title: "Clinica",
    href: "/app/settings/clinic",
  },
  {
    title: "Serviços",
    href: "/app/settings/services",
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
          <CardDescription>Configurações da clinica, perfil e notificações.</CardDescription>
        </div>
      </CardHeader>
      <div className="py-2 px-6">
        <Separator />

        <CardContent className="gap-10 pb-10 pt-6 justify-start flex">
          <aside className="lg:w-1/6">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1">{children}</div>
        </CardContent>
      </div>
    </>
  );
};

export default SettingsLayout;
