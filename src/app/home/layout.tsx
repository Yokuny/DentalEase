import DentalEaseLogo from "@/components/dentalEase/logo";
import { NavigationMenuDemo } from "@/components/navHome/nav-menu";
import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <header className="h-16 w-full flex justify-center items-center backdrop-blur-sm ">
        <nav className="max-w-[1300px] w-full flex justify-between items-center">
          <div className="flex items-center gap-12">
            <DentalEaseLogo />
            <NavigationMenuDemo />
          </div>
          <div className="flex items-center gap-2">
            <Button>Acessar</Button>
            <Button>Cadastrar</Button>
          </div>
        </nav>
      </header>
      <Separator />
      {children}
    </main>
  );
}
