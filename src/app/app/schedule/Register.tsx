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
import ScheduleForm from "./Form";

const NewAppointment = ({ toast }: ToastProps) => {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get("interface");
  const closed = () => toast("Operação cancelada", "O registro foi limpo");

  const [open, setOpen] = useState(false);
  useEffect(() => {
    serviceParam === "register" ? setOpen(true) : setOpen(false);
  }, [serviceParam]);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Link
          href={"/app/schedule?interface=register"}
          className={cn(buttonVariants({ variant: "gradient" }), "md:text-sm text-xs w-[100px]")}>
          Adicionar
        </Link>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full md:max-w-6xl">
          <DrawerHeader>
            <DrawerTitle>Agendar</DrawerTitle>
            <DrawerDescription>Adicione um novo compromisso</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <ScheduleForm toast={toast} />
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Link
                onClick={closed}
                href={"/app/schedule"}
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

export default NewAppointment;
