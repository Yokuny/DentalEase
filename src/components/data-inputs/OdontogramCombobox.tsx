"use client";

import { useEffect, useState } from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { comboboxOdontogram } from "@/helpers/dataManager.helper";
import { cn } from "@/helpers/cn.util";

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const OdontogramCombobox = ({ controller, toast, patient, disabled }: any) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [odontograms, setOdontograms] = useState([{ value: "", label: "Selecione o odontograma..." }]);
  const [odontogram, setOdontogram] = useState("");

  useEffect(() => {
    setIsLoading(true);
    const fetchDentist = async () => {
      try {
        const data = await comboboxOdontogram(patient);
        setOdontograms(data);
      } catch (error: any) {
        toast("Erro", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDentist();
  }, [toast, patient]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="w-full" disabled={isLoading || disabled}>
        <Button role="combobox" aria-expanded={open} className="h-10 justify-between font-medium">
          {odontogram ? odontograms.find((item) => item.value === odontogram)?.label : "Selecione o odontograma..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Selecione o odontograma" disabled={isLoading || disabled} />
          <CommandEmpty>Odontograma não encontrado</CommandEmpty>
          <CommandGroup>
            {odontograms.map((item) => (
              <CommandItem
                key={item.value}
                value={item.value}
                onSelect={(currentValue) => {
                  setOdontogram(currentValue === odontogram ? "" : currentValue);
                  controller.onChange(currentValue === odontogram ? "" : currentValue);
                  setOpen(false);
                }}>
                <CheckIcon className={cn("mr-2 h-4 w-4", odontogram === item.value ? "opacity-100" : "opacity-0")} />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default OdontogramCombobox;
