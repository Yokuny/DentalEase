"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/helpers/cn.util";
import { workSpace } from "@/data/workSpace";

import IconCheck from "../../../../../public/Check.Icon";
import IconSort from "../../../../../public/Sort.Icon";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const WorkSpace = () => {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const pathString = pathname.split("/app")[1];
  const path = pathString.split("/")[1];

  useEffect(() => {
    setValue(path);
  }, [path]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="sticky top-0 z-40">
        <div className="md:h-16 h-14 w-full bg-gradient-to-r from-sky-400 to-primaryBlue saturate-150 flex items-center justify-center">
          <Button
            variant="outlineBlue"
            role="combobox"
            aria-expanded={open}
            className="h-12 md:max-w-[700px] md:w-full w-11/12 justify-between text-white shadow-sm">
            {value ? workSpace.find((space) => space.value === value)?.label : "Selecione o ambiente..."}
            <IconSort className="ml-2 h-3 w-3 shrink-0" />
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="max-w-[700px] w-full p-0">
        <Command className="max-w-[700px] w-screen">
          <CommandInput placeholder="Pesquisar ambiente..." className="h-12" />
          <CommandEmpty>Não encontrado</CommandEmpty>
          <CommandGroup>
            {workSpace.map((space) => (
              <CommandItem
                key={space.value}
                value={space.value}
                onSelect={(currentValue) => {
                  router.push(`/app/${currentValue}`);
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}>
                {space.label}
                <IconCheck className={cn("ml-auto h-3 w-3", value === space.value ? "opacity-100" : "opacity-0")} />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default WorkSpace;
