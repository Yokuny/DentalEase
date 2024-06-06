import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { cn } from "@/helpers/cn.util";
import type { ToastProps } from "@/types";

import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import OdontogramForm from "./Form";

const NewOdontogram = ({ toast }: ToastProps) => {
  const searchParams = useSearchParams();
  const odontogramParam = searchParams.get("interface");
  const closed = () => toast("Operação cancelada", "O registro foi limpo");

  const [open, setOpen] = useState(false);
  useEffect(() => {
    odontogramParam === "register" ? setOpen(true) : setOpen(false);
  }, [odontogramParam, searchParams]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Adicionar Button */}
      <DialogTrigger asChild>
        <Link
          href={"/app/odontogram?interface=register"}
          className={cn(buttonVariants({ variant: "gradient" }), "md:text-sm text-xs w-[100px]")}>
          Adicionar
        </Link>
      </DialogTrigger>
      {/* Body */}
      <DialogContent>
        <div className="mx-auto w-full gap-3 flex-col flex">
          <DialogHeader>
            <DialogTitle>Cadastro de odontograma</DialogTitle>
            <DialogDescription>Adicione um novo odontograma</DialogDescription>
          </DialogHeader>
          <div className="py-4 pb-0">
            <OdontogramForm toast={toast} />
          </div>
          <DialogFooter>
            <Link
              onClick={closed}
              href={"/app/odontogram"}
              className={cn(buttonVariants({ variant: "outlineBlue" }), "text-darkBlue w-full")}>
              Cancelar
            </Link>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewOdontogram;
