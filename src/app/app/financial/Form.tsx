"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { financialSchema } from "@/schemas/financial.schema";
import { request, POST } from "@/helpers/fetch.config";
import { refreshFinancial } from "@/helpers/dataManager.helper";
import type { ToastProps } from "@/types";

import IconReload from "../../../../public/Reload.Icon";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PatientCombobox from "@/components/data-inputs/PatientCombobox";
import OdontogramCombobox from "@/components/data-inputs/OdontogramCombobox";
import DentistCombobox from "@/components/data-inputs/DentistCombobox";

const FinancialForm = ({ toast }: ToastProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof financialSchema>>({
    resolver: zodResolver(financialSchema),
    defaultValues: {
      Patient: "",
      Doctor: "",
      Odontogram: "",
      workToBeDone: "",
      price: 0,
      status: "pending",
    },
  });

  async function onSubmit(values: z.infer<typeof financialSchema>) {
    setIsLoading(true);
    const body: z.infer<typeof financialSchema> = {
      Patient: values.Patient,
      Doctor: values.Doctor,
      workToBeDone: values.workToBeDone,
      price: parseFloat(values.price.toString()),
      status: values.status,
    };
    if (values.Odontogram) body.Odontogram = values.Odontogram;

    try {
      const res = await request("financial/create", POST(body));
      if (res.success === false) throw new Error(res.message);

      localStorage.setItem("activeFinancial", JSON.stringify(body));
      toast("Sucesso", "Registrado financeiro gravado");
      form.reset();

      await refreshFinancial();
      return router.push(`/app/schedule`);
    } catch (Error: any) {
      toast("Erro ao salvar registro financeiro", Error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        id="financial-form"
        className="md:gap-4 gap-2 flex-wrap flex"
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
            name="Odontogram"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <OdontogramCombobox
                    controller={{ ...field }}
                    toast={toast}
                    patient={form.getValues().Patient}
                    disabled={form.getValues().Patient === ""}
                  />
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
            <FormItem className="w-full">
              <FormLabel className="md:text-sm text-xs">Trabalho a ser feito</FormLabel>
              <FormControl className="md:text-sm text-xs">
                <Textarea className="w-full font-normal" {...field} placeholder="O que será feito?" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full md:gap-6 gap-4 flex-wrap p-4 bg-slate-50 dark:bg-slate-900/70 rounded-md flex">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="md:w-1/6 md:max-w-none max-w-32">
                <FormLabel className="md:text-sm text-xs">Preço</FormLabel>
                <FormControl className="md:text-sm text-xs">
                  <Input
                    type="number"
                    placeholder="Digite aqui..."
                    disabled={isLoading}
                    className="bg-white dark:bg-slate-950/50"
                    {...field}
                  />
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
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="bg-white dark:bg-slate-950/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending" disabled={isLoading}>
                        Pendente
                      </SelectItem>
                      <SelectItem value="paid" disabled={isLoading}>
                        Pago
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button form="financial-form" type="submit" variant={"gradient"} className="mt-4 w-full" disabled={isLoading}>
          {isLoading && <IconReload className="mr-2 h-4 w-4 animate-spin" />}
          Cadastrar
        </Button>
      </form>
    </Form>
  );
};

export default FinancialForm;
