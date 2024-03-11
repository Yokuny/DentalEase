import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/helpers/cn.util";
import Link from "next/link";

const AcessBtns = () => {
  return (
    <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
      <Link href={"/login?interface=login"} className={cn(buttonVariants({ variant: "default" }))}>
        Acessar
      </Link>
      <Link
        href={"/login?interface=cadastro"}
        className={cn(buttonVariants({ variant: "gradient" }), "md:block hidden")}>
        Cadastrar
      </Link>
    </div>
  );
};

export default AcessBtns;