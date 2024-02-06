import DentalEaseLogo from "@/components/dentalEase/DentalEaseLogo";
import { NavMenu } from "@/components/home/header/NavMenu";
import { Button, buttonVariants } from "@/components/ui/button";
import cn from "@/lib/utils";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/10 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/20">
      <div className="max-w-screen-2xl container h-14 flex items-center">
        <div className="mr-4 hidden md:flex gap-3">
          <DentalEaseLogo />
          <NavMenu />
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <Button className={cn(buttonVariants({ variant: "gradient" }))}>Acessar</Button>
          <Button className={cn(buttonVariants({ variant: "solid600" }))}>Cadastrar</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
