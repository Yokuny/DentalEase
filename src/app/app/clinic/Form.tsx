"use client";

import { z } from "zod";
import Cookie from "js-cookie";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { clinicSchema } from "@/schemas/clinic.schema";
import { request, POST } from "@/helpers/fetch.config";
import { ReloadIcon } from "@radix-ui/react-icons";
import type { ToastProps } from "@/types";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SubtitleSeparator from "@/components/app/patient/SubtitleSeparator";

const ClinicForm = ({ toast }: ToastProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof clinicSchema>>({
    resolver: zodResolver(clinicSchema),
    defaultValues: {
      name: "",
      email: "",
      code: "",
      cnpj: "",
    },
  });

  async function onSubmit(values: z.infer<typeof clinicSchema>) {
    setIsLoading(true);
    const body = {
      name: values.name,
      email: values.email,
      code: values.code,
      cnpj: values.cnpj,
    };

    try {
      const res = await request("clinic/create", POST(body));
      if (res.success === false) throw new Error(res.message);

      toast("Sucesso", "A clinica foi registrada com sucesso. Entre novamente");

      Cookie.remove("auth");
      router.push("/login?interface=login");
    } catch (Error: any) {
      toast("Erro ao registrar paciente", Error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form id="form-id" className="gap-4 flex-col flex w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="bg-slate-50 dark:bg-slate-900/70 p-4 pb-8 gap-4 rounded-md w-full flex-wrap justify-start flex">
          <SubtitleSeparator subtitle="Informações da clinica" />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="md:w-1/4 md:max-w-none max-w-48">
                <FormLabel className="md:text-sm text-xs">Nome</FormLabel>
                <FormControl className="md:text-sm text-xs">
                  <Input
                    className="bg-white dark:bg-slate-950/50"
                    placeholder="Digite o nome da clinica."
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="md:w-1/4 md:max-w-none max-w-48">
                <FormLabel className="md:text-sm text-xs">Email</FormLabel>
                <FormControl className="md:text-sm text-xs">
                  <Input
                    className="bg-white dark:bg-slate-950/50"
                    placeholder="Digite o email da clinica."
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cnpj"
            render={({ field }) => (
              <FormItem className="md:w-1/4 md:max-w-none max-w-48">
                <FormLabel className="md:text-sm text-xs">CNPJ</FormLabel>
                <FormControl className="md:text-sm text-xs">
                  <Input
                    className="bg-white dark:bg-slate-950/50"
                    placeholder="Digite o CNPJ da clinica."
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem className="md:w-1/4 md:max-w-none max-w-48">
                <FormLabel className="md:text-sm text-xs">Codigo</FormLabel>
                <FormControl className="md:text-sm text-xs">
                  <Input
                    className="bg-white dark:bg-slate-950/50"
                    placeholder="Digite um codigo para a clinica."
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormDescription>Código utilizado para identificar a clinica.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button form="form-id" type="submit" variant={"gradient"} className="mt-4" disabled={isLoading}>
          {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          Registrar
        </Button>
      </form>
    </Form>
  );
};

export default ClinicForm;
