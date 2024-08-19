import Cookies from "js-cookie";
import { useState } from "react";
import { cn } from "@/helpers/cn.util";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import IconExit from "../../../../../public/Exit.Icon";

const ExitButton = ({ isOpen }: { isOpen: boolean | undefined }) => {
  const [open, setOpen] = useState(false);

  const handleExit = () => {
    Cookies.remove("auth");
    window.location.href = "/login";
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => {}} variant="blank" className="w-full justify-center h-10 mt-5">
          <span className={cn(isOpen === false ? "" : "mr-4")}>
            <IconExit className="dark:text-white text-black" />
          </span>
          <p className={cn("whitespace-nowrap", isOpen === false ? "opacity-0 hidden" : "opacity-100")}>Sair</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-auto">
        <div className="mx-auto gap-3 flex-col flex">
          <DialogHeader>
            <DialogTitle>Sair</DialogTitle>
            <DialogDescription>Deseja realmente sair?</DialogDescription>
          </DialogHeader>
          <div className="py-4 pb-0"></div>
          <DialogFooter>
            <Button onClick={() => setOpen(false)} className="w-32" variant={"blank"}>
              Cancelar
            </Button>
            <Button onClick={handleExit} className="w-32">
              Sair
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExitButton;
