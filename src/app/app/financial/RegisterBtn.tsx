"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { cn } from "@/helpers/cn.util";
import type { ToastProps } from "@/types";

import { buttonVariants } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import FinancialForm from "./Form";

const FinancialDrawer = ({ toast }: ToastProps) => {
  const searchParams = useSearchParams();
  const financialParam = searchParams.get("interface");
  const closed = () => toast("Operação cancelada", "O registro foi limpo");

  const [open, setOpen] = useState(false);
  useEffect(() => {
    financialParam === "register" ? setOpen(true) : setOpen(false);
  }, [financialParam]);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Link
          href={"/app/financial?interface=register"}
          className={cn(buttonVariants({ variant: "gradient" }), "md:text-sm text-xs w-[100px]")}>
          Adicionar
        </Link>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full md:max-w-6xl">
          <DrawerHeader>
            <DrawerTitle>Novo Registro Financeiro </DrawerTitle>
            <DrawerDescription>Adicione um novo registro financeiro</DrawerDescription>
          </DrawerHeader>
          <div className="py-4 pb-0">
            <FinancialForm toast={toast} />
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Link
                onClick={closed}
                href={"/app/financial"}
                className={cn(buttonVariants({ variant: "link" }), "text-darkBlue w-full !no-underline")}>
                Cancelar
              </Link>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default FinancialDrawer;
