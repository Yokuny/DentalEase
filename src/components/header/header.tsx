import DentalEaseLogo from "@/components/dentalEase/DentalEaseLogo";
import { NavMenu } from "@/components/header/NavMenu";
import { Button, buttonVariants } from "@/components/ui/button";
import cn from "@/lib/utils";

import ThemeToggle from "../ThemeToggle";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/10 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/20">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex gap-3">
          <DentalEaseLogo />
          <NavMenu />
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <Button className={cn(buttonVariants({ variant: "gradient" }))}>Acessar</Button>
          <Button className={cn(buttonVariants({ variant: "solid700" }))}>Cadastrar</Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
