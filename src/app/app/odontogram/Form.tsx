"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { odontogramSchema, NewOdontogram } from "@/schemas/odontogram.schema";
import { request, POST } from "@/helpers/fetch.config";
import { refreshOdontogram } from "@/helpers/dataManager.helper";
import type { ToastProps } from "@/types";

import IconReload from "../../../../public/Reload.Icon";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import PatientCombobox from "@/components/data-inputs/PatientCombobox";
import DentistCombobox from "@/components/data-inputs/DentistCombobox";
import Teeth from "@/components/app/odontogram/Teeth";

const OdontogramForm = ({ toast }: ToastProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<NewOdontogram>({
    resolver: zodResolver(odontogramSchema),
    defaultValues: {
      Patient: "",
      Doctor: "",
      procedures: [
        {
          procedure: "",
          status: "pending",
        },
      ],
      finished: false,
      teeth: [],
    },
    mode: "onChange",
  });

  const onSubmit = async (values: NewOdontogram) => {
    setIsLoading(true);
    const body = {
      Patient: values.Patient,
      Doctor: values.Doctor,
      procedures: values.procedures,
      finished: values.finished,
      teeth: values.teeth,
    };

    try {
      const res = await request("odontogram/create", POST(body));
      if (res.success !== true) throw new Error(res.message);

      localStorage.setItem("activeOdontogram", JSON.stringify(body));
      toast("Sucesso", res.message);
      form.reset();

      await refreshOdontogram();
      return router.push(`/app/odontogram`);
    } catch (Error: any) {
      toast("Erro ao registrar odontograma", Error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        id="odontogram-form"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(form.getValues());
        }}
        className="space-y-5">
        <FormField
          control={form.control}
          name="Patient"
          render={({ field }) => (
            <FormItem className="max-w-sm w-full">
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
            <FormItem className="max-w-sm w-full">
              <FormControl>
                <DentistCombobox controller={{ ...field }} toast={toast} />
              </FormControl>
            </FormItem>
          )}
        />

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

        <Button form="odontogram-form" type="submit" variant={"gradient"} className="mt-4 w-full" disabled={isLoading}>
          {isLoading && <IconReload className="mr-2 h-4 w-4 animate-spin" />}
          Cadastrar
        </Button>
      </form>
    </Form>
  );
};

export default OdontogramForm;
