import { use, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { cn } from "@/helpers/cn.util";
import type { ToastProps } from "@/types";

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
import { buttonVariants } from "@/components/ui/button";
import PatientForm from "./Form";

const DrawerDemo = ({ toast }: ToastProps) => {
  const searchParams = useSearchParams();
  const patientParam = searchParams.get("interface");
  const closed = () => toast("Operação cancelada", "O registro foi limpo");

  const [open, setOpen] = useState(false);
  useEffect(() => {
    patientParam === "register" ? setOpen(true) : setOpen(false);
  }, [patientParam]);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      {/* Adicionar Button */}
      <DrawerTrigger asChild>
        <Link
          href={"/app/patient?interface=register"}
          className={cn(buttonVariants({ variant: "gradient" }), "md:text-sm text-xs")}>
          Adicionar
        </Link>
      </DrawerTrigger>
      {/* Body */}
      <DrawerContent>
        <div className="mx-auto w-full md:max-w-6xl">
          <DrawerHeader>
            <DrawerTitle>Cadastro de paciente</DrawerTitle>
            <DrawerDescription>Adicione um novo paciente</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <PatientForm toast={toast} />
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Link
                onClick={closed}
                href={"/app/patient"}
                className={cn(buttonVariants({ variant: "outlineBlue" }), "text-darkBlue")}>
                Cancelar
              </Link>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerDemo;