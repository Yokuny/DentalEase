"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import getMenuList from "@/data/menuList";
import { cn } from "@/helpers/cn.util";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import CollapseMenuButton from "./CollapseMenuButton";
import ThemeToggle from "@/components/theme/ThemeToggle";
import ExitButton from "./ExitButton";

interface MenuProps {
  isOpen: boolean | undefined;
}

const Menu = ({ isOpen }: MenuProps) => {
  const pathname = usePathname();
  const menuList = getMenuList(pathname);

  return (
    <ScrollArea className="[&>div>div[style]]:!block">
      <nav className="h-full w-full">
        <ul className="min-h-[calc(100vh-48px-36px-16px-32px)] lg:min-h-[calc(100vh-32px-40px-32px)] items-start space-y-1 px-1 flex flex-col">
          {menuList.map(({ groupLabel, menus }, index) => (
            <li className={cn("w-full mt-4", groupLabel ? "pt-5" : "")} key={index}>
              {(isOpen && groupLabel) ||
                (isOpen === undefined && (
                  <p className="text-sm font-medium text-muted-foreground px-4 pb-2 max-w-[248px] truncate">
                    {groupLabel}
                  </p>
                ))}
              {menus.map(({ href, label, icon: Icon, active, submenus }, index) =>
                submenus.length === 0 ? (
                  <div className="mt-8 w-full" key={index}>
                    <TooltipProvider disableHoverableContent>
                      <Tooltip delayDuration={100}>
                        <TooltipTrigger asChild>
                          <Button
                            variant={active ? "primary" : "link"}
                            className="w-full justify-start h-10 mb-1"
                            asChild>
                            <Link href={href} className={cn(isOpen === false && "flex items-center justify-center")}>
                              <span className={cn(isOpen === false ? "" : "mr-4")}>
                                <Icon className="dark:text-white text-black" />
                              </span>
                              <p
                                className={cn(
                                  "max-w-[200px] truncate",
                                  isOpen === false ? "-translate-x-96 opacity-0" : "translate-x-0 opacity-100"
                                )}>
                                {label}
                              </p>
                            </Link>
                          </Button>
                        </TooltipTrigger>
                        {isOpen === false && <TooltipContent side="right">{label}</TooltipContent>}
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                ) : (
                  <div className="w-full" key={index}>
                    <CollapseMenuButton icon={Icon} label={label} active={active} submenus={submenus} isOpen={isOpen} />
                  </div>
                )
              )}
            </li>
          ))}
          <li className="w-full grow justify-end items-center flex-col flex">
            <ThemeToggle isOpen={isOpen} />
            <ExitButton isOpen={isOpen} />
          </li>
        </ul>
      </nav>
    </ScrollArea>
  );
};

export default Menu;
