import DentalEaseLogo from "@/components/dentalEase/logo";
import { NavigationMenuDemo } from "@/components/header/nav-menu";
import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "../theme-mode-toggle";

const Header = () => {
  return (
    <header className="h-20 backdrop-blur-lg bg-slate-50 bg-opacity-10 w-full flex flex-col items-center justify-between fixed top-0 z-50">
      <nav className="h-20 max-w-[1300px] w-full flex justify-between items-center">
        <div className="flex items-center gap-12">
          <DentalEaseLogo />
          <NavigationMenuDemo />
        </div>
        <div className="flex items-center gap-2">
          <Button className="bg-sky-500 dark:bg-sky-600 dark:text-white hover:bg-sky-400 dark:hover:bg-sky-500">
            Acessar
          </Button>
          <Button className="border-sky-400 dark:border-sky-400 text-sky-600 dark:text-sky-400 hover:text-sky-400 dark:hover:text-sky-300 bg-transparent hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent">
            Cadastrar
          </Button>
          <ModeToggle />
        </div>
      </nav>
      <Separator />
    </header>
  );
};

export default Header;
