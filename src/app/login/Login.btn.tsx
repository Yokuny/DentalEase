import Link from "next/link";
import cn from "@/lib/utils";

import { buttonVariants } from "@/components/ui/button";

const LoginBtn = () => {
  return (
    <Link
      href="/examples/authentication"
      className={cn(
        buttonVariants({ variant: "gradientS" }),
        "absolute right-6 top-6 md:right-10 md:top-10 w-28 text-white font-semibold"
      )}>
      Login
    </Link>
  );
};

export default LoginBtn;
