import { buttonVariants } from "@/components/ui/button";
import cn from "@/lib/utils";
import Link from "next/link";

const AcessBtns = () => {
  return (
    <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
      <Link
        href={"/login?interface=login"}
        className={cn(buttonVariants({ variant: "gradientS" }), "font-semibold text-white")}>
        Acessar
      </Link>
      <Link
        href={"/login?interface=cadastro"}
        className={cn(buttonVariants({ variant: "solid600S" }), "font-semibold md:block hidden")}>
        Cadastrar
      </Link>
    </div>
  );
};

export default AcessBtns;
