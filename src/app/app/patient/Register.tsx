import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
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
import ProfileForm from "./ProfileForm";

const DrawerDemo = () => {
  const searchParams = useSearchParams();
  const patientParam = searchParams.get("interface");

  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (patientParam === "register") setOpen(true);
  }, [patientParam]);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="gradientS">Adicionar</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Cadastro de paciente</DrawerTitle>
            <DrawerDescription>Adicione um novo paciente</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <ProfileForm />
          </div>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerDemo;
