"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { odontogramSchema } from "@/schemas/odontogram.schema";
import { request, POST } from "@/helpers/fetch.config";
import { ReloadIcon } from "@radix-ui/react-icons";
import type { ToastProps } from "@/types";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ProfileForm = ({ toast }: ToastProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      toast("Sucesso", "Paciente registrado com sucesso");

      form.reset();
      return router.push(`/app/patient/${res.data.id}?interface=anamnese`);
      // mudar para agendamento
    } catch (Error: any) {
      toast("Erro ao registrar odontograma", Error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="md:gap-4 gap-2 flex-wrap md:justify-between justify-between flex">
        <FormField
          control={form.control}
          name="Patient"
          render={({ field }) => (
            <FormItem className="md:w-1/4 md:max-w-none max-w-48">
              <FormLabel className="md:text-sm text-xs">Paciente</FormLabel>
              <FormControl className="md:text-sm text-xs">
                <Input placeholder="Digite o nome..." disabled={isLoading} {...field} />
              </FormControl>
              <FormDescription className="md:block hidden">ID do paciente</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Doctor"
          render={({ field }) => (
            <FormItem className="md:w-1/6 md:max-w-none max-w-36 w-full">
              <FormLabel className="md:text-sm text-xs">Dentista</FormLabel>
              <FormControl className="md:text-sm text-xs">
                <Input placeholder="Digite o número..." disabled={isLoading} {...field} />
              </FormControl>
              <FormDescription className="md:block hidden">ID do dentista</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="workToBeDone"
          render={({ field }) => (
            <FormItem className="md:w-1/6 md:max-w-none max-w-36 w-full">
              <FormLabel className="md:text-sm text-xs">Trabalho a ser feito</FormLabel>
              <FormControl className="md:text-sm text-xs">
                <Input placeholder="Digite aqui..." disabled={isLoading} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant={"gradient"} className="mt-4 w-full" disabled={isLoading}>
          {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          Cadastrar
        </Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
