"use client";

import { useState } from "react";
import cn from "@/lib/utils";

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

const workSpace = [
  { value: "home", label: "Agenda" },
  { value: "dashboard", label: "Dashboard" },
  { value: "patient", label: "Paciente" },
  { value: "odontogram", label: "Odontogram" },
  { value: "service", label: "Serviço" },
  { value: "schedule", label: "Agendamento" },
  { value: "config", label: "Configurações" },
];

const WorkSpace = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="gradient"
          role="combobox"
          aria-expanded={open}
          className="h-12 max-w-[700px] w-full justify-between text-white font-semibold">
          {value ? workSpace.find((space) => space.value === value)?.label : "Selecione o ambiente..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-[700px] w-full p-0">
        <Command className="max-w-[700px] w-screen">
          <CommandInput placeholder="Pesquisar ambiente..." className="h-9" />
          <CommandEmpty>Não encontrado</CommandEmpty>
          <CommandGroup>
            {workSpace.map((space) => (
              <CommandItem
                key={space.value}
                value={space.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}>
                {space.label}
                <CheckIcon
                  className={cn("ml-auto h-4 w-4", value === space.value ? "opacity-100" : "opacity-0")}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default WorkSpace;
