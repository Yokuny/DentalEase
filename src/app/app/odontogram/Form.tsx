"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { odontogramSchema } from "@/schemas/odontogram.schema";
import { request, POST } from "@/helpers/fetch.config";
import type { ToastProps } from "@/types";

import IconReload from "../../../../public/Reload.Icon";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import PatientCombobox from "@/components/data-inputs/PatientCombobox";
import DentistCombobox from "@/components/data-inputs/DentistCombobox";
import Teeth from "@/components/app/odontogram/Teeth";

const OdontogramForm = ({ toast }: ToastProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    } catch (Error: any) {
      toast("Erro ao registrar odontograma", Error.message);
    } finally {
      setIsLoading(false);
    }
  }

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
          name="teeth"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl className="md:text-sm text-xs">
                <Teeth controller={{ ...field }} />
              </FormControl>
            </FormItem>
          )}
        />

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
        <Button form="odontogram-form" type="submit" variant={"gradient"} className="mt-4 w-full" disabled={isLoading}>
          {isLoading && <IconReload className="mr-2 h-4 w-4 animate-spin" />}
          Cadastrar
        </Button>
      </form>
    </Form>
  );
};

export default OdontogramForm;
