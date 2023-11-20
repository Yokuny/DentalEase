import clsx from "clsx";
import { usePathname } from "next/navigation";
import type { TabsProps } from "@/types";

import NextLink from "next/link";
import { NavbarItem } from "@nextui-org/navbar";
import { link as linkStyles } from "@nextui-org/theme";

const Tabs = ({ routes }: TabsProps) => {
  const path = usePathname();

  return (
    <ul className="hidden sm:flex gap-3 md:gap-4 justify-start ml-2">
      {routes.map((item, index) => (
        <NavbarItem key={item.href} isActive={item.href === path}>
          <NextLink
            className={clsx(
              linkStyles({ color: index === 1 ? "success" : "foreground" }),
              "data-[active=true]:text-primary data-[active=true]:font-medium"
            )}
            color="foreground"
            href={item.href}>
            {item.label}
          </NextLink>
        </NavbarItem>
      ))}
    </ul>
  );
};
export default Tabs;
