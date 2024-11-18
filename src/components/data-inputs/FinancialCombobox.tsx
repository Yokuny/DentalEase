"use client";

import { useEffect, useState } from "react";
import { comboboxFinancial } from "@/helpers/dataManager.helper";
import { cn } from "@/helpers/cn.util";

import IconCheck from "../../../public/Check.Icon";
import IconSort from "../../../public/Sort.Icon";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const FinancialCombobox = ({ controller, toast, disabled }: any) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [financial, setFinancial] = useState("");
  const [financials, setFinancials] = useState([{ value: "", label: "Selecione um registro" }]);

  useEffect(() => {
    setIsLoading(true);
    const fetchDentist = async () => {
      try {
        const data = await comboboxFinancial({ onlyActive: true });
        setFinancials(data);
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
      <PopoverTrigger asChild className="w-full" disabled={isLoading || disabled}>
        <Button
          variant={financial ? "secondary" : "primary"}
          className="h-10 w-full justify-between font-medium"
          aria-expanded={open}
          role="combobox">
          {financial ? financials.find((item) => item.value === financial)?.label : "Selecione um registro..."}
          <IconSort className="ml-2 h-3 w-3 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Selecione um registro..." disabled={isLoading || disabled} />
          <CommandEmpty>Registro financeiro não encontrado</CommandEmpty>
          <CommandGroup>
            {financials.map((item) => (
              <CommandItem
                key={item.value}
                value={item.value}
                onSelect={(currentValue) => {
                  setFinancial(currentValue === financial ? "" : currentValue);
                  controller.onChange(currentValue === financial ? "" : currentValue);
                  setOpen(false);
                }}>
                <IconCheck className={cn("mr-2 h-3 w-3", financial === item.value ? "opacity-100" : "opacity-0")} />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default FinancialCombobox;
