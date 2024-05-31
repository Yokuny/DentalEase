"use client";

import { useEffect, useState } from "react";
import { comboboxDentist } from "@/helpers/dataManager.helper";
import { cn } from "@/helpers/cn.util";

import IconCheck from "../../../public/Check.Icon";
import IconSort from "../../../public/Sort.Icon";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const DentistCombobox = ({ controller, toast }: { controller: any; toast: any }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dentists, setDentists] = useState([{ value: "", label: "Selecione o dentista..." }]);
  const [dentist, setDentist] = useState("");

  useEffect(() => {
    setIsLoading(true);
    const fetchDentist = async () => {
      try {
        const data = await comboboxDentist();
        setDentists(data);
      } catch (error: any) {
        toast("Erro", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDentist();
  }, [toast]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="w-full">
        <Button role="combobox" aria-expanded={open} className="h-10 justify-between font-medium">
          {dentist ? dentists.find((item) => item.value === dentist)?.label : "Selecione o dentista..."}
          <IconSort className="ml-2 h-3 w-3 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Selecione o dentista" disabled={isLoading} />
          <CommandEmpty>Dentista não encontrado</CommandEmpty>
          <CommandGroup>
            {dentists.map((item) => (
              <CommandItem
                key={item.value}
                value={item.value}
                onSelect={(currentValue) => {
                  setDentist(currentValue === dentist ? "" : currentValue);
                  controller.onChange(currentValue === dentist ? "" : currentValue);
                  setOpen(false);
                }}>
                <IconCheck className={cn("mr-2 h-3 w-3", dentist === item.value ? "opacity-100" : "opacity-0")} />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default DentistCombobox;
