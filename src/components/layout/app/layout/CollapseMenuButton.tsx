"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/helpers/cn.util";

import DotIcon from "../../../../../public/Dot.Icon";
import DownIcon from "../../../../../public/Down.Icon";
import { Button, buttonVariants } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

interface CollapseMenuButtonProps {
  icon: React.ElementType;
  label: string;
  active: boolean;
  submenus: Submenu[];
  isOpen: boolean | undefined;
}

const CollapseMenuButton = ({ icon: Icon, label, active, submenus, isOpen }: CollapseMenuButtonProps) => {
  const isSubmenuActive = submenus.some((submenu) => submenu.active);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(isSubmenuActive);

  return isOpen ? (
    <Collapsible open={isCollapsed} onOpenChange={setIsCollapsed} className="w-full">
      <CollapsibleTrigger className="[&[data-state=open]>div>div>svg]:rotate-180 mb-1" asChild>
        <Button variant={active ? "primary" : "link"} className="w-full h-10 justify-start">
          <div className="w-full items-center justify-between flex">
            <div className="items-center flex">
              <span className="mr-4">
                <Icon className="dark:text-white text-black" />
              </span>
              <p
                className={cn(
                  "max-w-[150px] truncate",
                  isOpen ? "translate-x-0 opacity-100" : "-translate-x-96 opacity-0"
                )}>
                {label}
              </p>
            </div>
            <div
              className={cn("whitespace-nowrap", isOpen ? "translate-x-0 opacity-100" : "-translate-x-96 opacity-0")}>
              <DownIcon className="transition-transform duration-200" />
            </div>
          </div>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
        {submenus.map(({ href, label, active }, index) => (
          <Link
            href={href}
            key={index}
            className={cn(buttonVariants({ variant: "link" }), "w-full h-8 justify-start items-center flex")}>
            <span className="mx-2">{active ? <DotIcon fill="currentColor" /> : <DotIcon />}</span>
            <p
              className={cn(
                "max-w-[170px] truncate text-xs text-muted-foreground",
                isOpen ? "translate-x-0 opacity-100" : "-translate-x-96 opacity-0"
              )}>
              {label}
            </p>
          </Link>
        ))}
      </CollapsibleContent>
    </Collapsible>
  ) : (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button variant={active ? "primary" : "link"} className="p-[12px] w-full justify-start h-10 mb-1">
                <div className="w-full items-center flex justify-between">
                  <div className="flex items-center">
                    <span className={cn(isOpen === false ? "" : "mr-4")}>
                      <Icon className="dark:text-white text-black" />
                    </span>
                    <p className={cn("max-w-[200px] truncate", isOpen === false ? "opacity-0" : "opacity-100")}>
                      {label}
                    </p>
                  </div>
                </div>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="right" align="start" alignOffset={2}>
            {label}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent side="right" sideOffset={25} align="start">
        <DropdownMenuLabel className="max-w-[190px] truncate">{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {submenus.map(({ href, label }, index) => (
          <DropdownMenuItem key={index} asChild>
            <Link className="cursor-pointer" href={href}>
              <p className="max-w-[180px] truncate">{label}</p>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CollapseMenuButton;
