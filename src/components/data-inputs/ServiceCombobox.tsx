"use client";

import { useEffect, useState } from "react";
import { comboboxService } from "@/helpers/dataManager.helper";
import { cn } from "@/helpers/cn.util";

import IconCheck from "../../../public/Check.Icon";
import IconSort from "../../../public/Sort.Icon";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const ServiceCombobox = ({ controller, toast, disabled }: any) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [services, setServices] = useState([{ value: "", label: "Selecione um serviço..." }]);
  const [service, setService] = useState("");

  useEffect(() => {
    setIsLoading(true);
    const fetchDentist = async () => {
      try {
        const data = await comboboxService({ onlyActive: true });
        setServices(data);
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
        <Button role="combobox" aria-expanded={open} className="h-10 justify-between font-medium">
          {service ? services.find((item) => item.value === service)?.label : "Selecione um serviço..."}
          <IconSort className="ml-2 h-3 w-3 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Selecione um serviço" disabled={isLoading || disabled} />
          <CommandEmpty>Serviço não encontrado</CommandEmpty>
          <CommandGroup>
            {services.map((item) => (
              <CommandItem
                key={item.value}
                value={item.value}
                onSelect={(currentValue) => {
                  setService(currentValue === service ? "" : currentValue);
                  controller.onChange(currentValue === service ? "" : currentValue);
                  setOpen(false);
                }}>
                <IconCheck className={cn("mr-2 h-3 w-3", service === item.value ? "opacity-100" : "opacity-0")} />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ServiceCombobox;
