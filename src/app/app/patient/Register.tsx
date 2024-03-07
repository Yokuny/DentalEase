import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { cn } from "@/helpers/cn.util";
import type { ProfileFormProps } from "@/types";

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

const DrawerDemo = ({ toast }: ProfileFormProps) => {
  const searchParams = useSearchParams();
  const patientParam = searchParams.get("interface");

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
          className={cn(buttonVariants({ variant: "gradient" }))}>
          Adicionar
        </Link>
      </DrawerTrigger>
      {/* Body */}
      <DrawerContent>
        <div className="mx-auto w-full md:max-w-6xl max-w-sm">
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
                onClick={() => toast("Operação cancelada", "O registro foi limpo")}
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
