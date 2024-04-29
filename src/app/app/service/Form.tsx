"use client";

import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { serviceSchema } from "@/schemas/service.schema";
import { request, POST } from "@/helpers/fetch.config";
import { ReloadIcon } from "@radix-ui/react-icons";
import type { ToastProps } from "@/types";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PatientCombobox from "@/components/data-inputs/PatientCombobox";
import DentistCombobox from "@/components/data-inputs/DentistCombobox";

const ServiceForm = ({ toast }: ToastProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof serviceSchema>>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      Patient: "",
      Doctor: "",
      Odontogram: "",
      workToBeDone: "",
      price: 0,
      status: "pending",
    },
  });

  async function onSubmit(values: z.infer<typeof serviceSchema>) {
    setIsLoading(true);
    const body = {
      Patient: values.Patient,
      Doctor: values.Doctor,
      Odontogram: values.Odontogram,
      workToBeDone: values.workToBeDone,
      price: values.price,
      status: values.status,
    };

    try {
      const res = await request("service/create", POST(body));
      if (res.success === false) throw new Error(res.message);

      localStorage.setItem("activeService", JSON.stringify(body));
      toast("Sucesso", "Serviço registrado com sucesso");

      form.reset();
      return router.push(`/app`);
    } catch (Error: any) {
      toast("Erro ao registrar serviço", Error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        id="service-form"
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
                <FormControl>
                  <PatientCombobox controller={{ ...field }} toast={toast} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Doctor"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <DentistCombobox controller={{ ...field }} toast={toast} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="workToBeDone"
          render={({ field }) => (
            <FormItem className="md:w-1/2 md:max-w-none max-w-96 w-full">
              <FormLabel className="md:text-sm text-xs">Trabalho a ser feito</FormLabel>
              <FormControl className="md:text-sm text-xs">
                <Input placeholder="Digite aqui..." disabled={isLoading} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem className="md:w-1/6 md:max-w-none max-w-32">
              <FormLabel className="md:text-sm text-xs">Preço</FormLabel>
              <FormControl className="md:text-sm text-xs">
                <Input type="number" placeholder="Digite aqui..." disabled={isLoading} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="md:w-1/4 md:max-w-none max-w-48">
              <FormLabel className="md:text-sm text-xs">Status</FormLabel>
              <FormControl className="md:text-sm text-xs">
                <Select {...field}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="paid">Pago</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button form="service-form" type="submit" variant={"gradient"} className="mt-4 w-full" disabled={isLoading}>
          {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          Cadastrar
        </Button>
      </form>
    </Form>
  );
};

export default ServiceForm;
