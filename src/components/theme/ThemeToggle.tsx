"use client";

import MoonIcon from "../.././../public/Moon.Icon";
import SunIcon from "../.././../public/Sun.Icon";
import { useTheme } from "next-themes";
import { cn } from "@/helpers/cn.util";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

const ThemeToggle = ({ isOpen }: { isOpen: boolean | undefined }) => {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button variant="blank" className="w-full justify-center h-10 mt-5">
                <span className={cn(isOpen === false ? "" : "mr-4", "flex")}>
                  <SunIcon className="h-[1rem] w-[1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <MoonIcon className="absolute h-[1rem] w-[1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </span>
                <p className={cn("whitespace-nowrap", isOpen === false ? "opacity-0 hidden" : "opacity-100")}>Tema</p>
                <span className="sr-only">Trocar tema</span>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="right" align="start" alignOffset={2}>
            Trocar tema
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent side={isOpen === false ? "right" : "top"} sideOffset={isOpen === false ? 25 : 0}>
        <DropdownMenuItem onClick={() => setTheme("light")} className="cursor-pointer">
          Claro
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className="cursor-pointer">
          Escuro
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className="cursor-pointer">
          Sistema
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeToggle;
