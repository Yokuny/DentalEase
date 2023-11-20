import { NavbarContent, NavbarItem } from "@nextui-org/navbar";
import { ThemeSwitch } from "@/components/theme-switch";

const DesktopMenu = () => {
  return (
    <>
      <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>
    </>
  );
};
export default DesktopMenu;
