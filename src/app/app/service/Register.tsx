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
import ServiceForm from "./Form";

const NewService = ({ toast }: ToastProps) => {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get("interface");
  const closed = () => toast("Operação cancelada", "O registro foi limpo");

  const [open, setOpen] = useState(false);
  useEffect(() => {
    serviceParam === "register" ? setOpen(true) : setOpen(false);
  }, [serviceParam]);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      {/* Button */}
      <DrawerTrigger asChild>
        <Link
          href={"/app/service?interface=register"}
          className={cn(buttonVariants({ variant: "gradient" }), "md:text-sm text-xs")}>
          Adicionar
        </Link>
      </DrawerTrigger>
      {/* Body */}
      <DrawerContent>
        <div className="mx-auto w-full md:max-w-6xl">
          <DrawerHeader>
            <DrawerTitle>Cadastro de serviço</DrawerTitle>
            <DrawerDescription>Adicione um novo serviço</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <ServiceForm toast={toast} />
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Link
                onClick={closed}
                href={"/app/service"}
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

export default NewService;
