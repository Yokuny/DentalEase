"use client";

import { useEffect, useState } from "react";
import { CheckIcon, CaretSortIcon } from "@radix-ui/react-icons";
import { comboboxPatient } from "@/helpers/dataManager.helper";
import { cn } from "@/helpers/cn.util";

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const PatientCombobox = ({ controller, toast }: { controller: any; toast: any }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [patient, setPatient] = useState("");
  const [patients, setPatients] = useState([{ value: "", label: "Selecione o paciente..." }]);

  useEffect(() => {
    setIsLoading(true);
    const fetchPatient = async () => {
      try {
        const data = await comboboxPatient();
        setPatients(data);
      } catch (error: any) {
        toast("Erro", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPatient();
  }, [toast]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button role="combobox" aria-expanded={open} className="h-10 w-full justify-between font-medium">
          {patient ? patients.find((item) => item.value === patient)?.label : "Selecione o paciente..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Selecione o paciente" />
          <CommandEmpty>Paciente não encontrado</CommandEmpty>
          <CommandGroup>
            {patients.map((item) => (
              <CommandItem
                key={item.value}
                value={item.value}
                onSelect={(currentValue) => {
                  setPatient(currentValue === patient ? "" : currentValue);
                  controller.onChange(currentValue === patient ? "" : currentValue);
                  setOpen(false);
                }}>
                <CheckIcon className={cn("mr-2 h-4 w-4", patient === item.value ? "opacity-100" : "opacity-0")} />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default PatientCombobox;
