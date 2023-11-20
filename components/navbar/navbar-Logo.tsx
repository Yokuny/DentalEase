import NextLink from "next/link";

import { NavbarBrand } from "@nextui-org/navbar";
import { LogoImg } from "@/components/icons";

const Logo = () => {
  return (
    <NavbarBrand as="li" className="gap-3 max-w-fit">
      <NextLink className="flex sm:hidden md:flex justify-start items-center gap-2" href="/">
        <LogoImg />
        <p className="font-bold text-inherit">Dental Ease</p>
      </NextLink>
    </NavbarBrand>
  );
};
export default Logo;
