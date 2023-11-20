import { useRouter } from "next/navigation";
import Cookie from "js-cookie";
import type { MenuProps } from "@/types";

import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { ThemeSwitch } from "@/components/theme-switch";
import { NavbarContent, NavbarMenu, NavbarMenuToggle, NavbarMenuItem } from "@nextui-org/navbar";

const Menu = ({ routes, loggedIn }: MenuProps) => {
  const router = useRouter();

  const handleLogout = async () => {
    Cookie.remove("auth_token");
    router.push("/");
  };

  return (
    <>
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu className="flex justify-between py-6">
        <div className="mx-4 mt-2 flex flex-col justify-between gap-2">
          {routes.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={index === 1 ? "success" : index === 2 ? "primary" : "foreground"}
                href={item.href}
                size="lg">
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>

        {loggedIn ? (
          <Button className="mx-4 mt-2" color="primary" onClick={handleLogout}>
            Sair
          </Button>
        ) : (
          <Link className="m-4" href="/login" size="lg">
            <Button className="w-full text-white" color="success">
              Entrar
            </Button>
          </Link>
        )}
      </NavbarMenu>
    </>
  );
};
export default Menu;
