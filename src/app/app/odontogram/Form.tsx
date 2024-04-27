"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { odontogramSchema } from "@/schemas/odontogram.schema";
import { request, POST, GET } from "@/helpers/fetch.config";
import { ReloadIcon, CheckIcon, CaretSortIcon } from "@radix-ui/react-icons";
import type { Patient, ToastProps } from "@/types";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/helpers/cn.util";
import { Textarea } from "@/components/ui/textarea";

const ProfileForm = ({ toast }: ToastProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dentist, setDentist] = useState("");

  const router = useRouter();

  const form = useForm<z.infer<typeof odontogramSchema>>({
    resolver: zodResolver(odontogramSchema),
    defaultValues: {
      Patient: "",
      Doctor: "",
      workToBeDone: "",
      finished: false,
      teeth: [],
    },
  });

  async function onSubmit(values: z.infer<typeof odontogramSchema>) {
    setIsLoading(true);
    const body = {
      Patient: values.Patient,
      Doctor: values.Doctor,
      workToBeDone: values.workToBeDone,
      finished: values.finished,
      teeth: values.teeth,
    };

    try {
      const res = await request("odontogram/create", POST(body));

      if (res.success === false) throw new Error(res.message);

      localStorage.setItem("activeOdontogram", JSON.stringify(body));
      toast("Sucesso", "Odontograma registrado com sucesso");

      form.reset();
      return router.push(`/app/patient/${res.data.id}?interface=anamnese`);
      // mudar para agendamento
    } catch (Error: any) {
      toast("Erro ao registrar odontograma", Error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const comboboxDataFormat = (register: Patient[]) => {
    return register.map((data) => ({
      value: data._id,
      label: data.name,
    }));
  };

  const PatientCombobox = (field: any) => {
    const [open, setOpen] = useState(false);
    const [patient, setPatient] = useState("");

    let patients = [{ value: "", label: "Selecione o paciente..." }];

    const localPatients = localStorage.getItem("patients");
    if (localPatients) {
      const convertedPatients = comboboxDataFormat(JSON.parse(localPatients));
      patients = convertedPatients;
    }

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
                    field.onChange(currentValue === patient ? "" : currentValue);
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

  const DentistCombobox = (field: any) => {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [dentists, setDentists] = useState([{ value: "", label: "Selecione o dentista..." }]);

    useEffect(() => {
      const fetchDentist = async () => {
        const localDentist = localStorage.getItem("dentist");

        if (localDentist) {
          const parsedDentist = JSON.parse(localDentist);
          const convertedDentist = comboboxDataFormat(parsedDentist);
          setDentists(convertedDentist);
        } else {
          setIsLoading(true);
          try {
            const res = await request("clinic/doctors", GET());
            if (res.success === false) throw new Error(res.message);

            localStorage.setItem("dentist", JSON.stringify(res.data));

            const convertedDentist = comboboxDataFormat(res.data);
            setDentists(convertedDentist);
          } catch (error: any) {
            toast("Erro", error.message);
          } finally {
            setIsLoading(false);
          }
        }
      };

      fetchDentist();
    }, []);

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className="w-full">
          <Button role="combobox" aria-expanded={open} className="h-10 justify-between font-medium">
            {dentist ? dentists.find((item) => item.value === dentist)?.label : "Selecione o dentista..."}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0" />
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
                    field.onChange(currentValue === dentist ? "" : currentValue);
                    setOpen(false);
                  }}>
                  <CheckIcon className={cn("mr-2 h-4 w-4", dentist === item.value ? "opacity-100" : "opacity-0")} />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    );
  };

  return (
    <Form {...form}>
      <form
        id="odontogram-form"
        className="md:gap-4 gap-2 flex-wrap justify-between flex"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(form.getValues());
        }}>
        <div className="w-full gap-4 flex-col sm:flex-row flex">
          <FormField
            control={form.control}
            name="Patient"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>{PatientCombobox({ ...field })}</FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Doctor"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>{DentistCombobox({ ...field })}</FormControl>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="workToBeDone"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="md:text-sm text-xs">Trabalho a ser feito</FormLabel>
              <FormControl className="md:text-sm text-xs">
                <Textarea
                  className={cn(buttonVariants({ variant: "outline" }), "w-full font-normal")}
                  {...field}
                  placeholder="O que será feito?"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button form="odontogram-form" type="submit" variant={"gradient"} className="mt-4 w-full" disabled={isLoading}>
          {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          Cadastrar
        </Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
