"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { redirect } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { patientSchema } from "@/schemas/patient.schema";
import { request, POST } from "@/helpers/fetch.config";
import { ReloadIcon } from "@radix-ui/react-icons";
import type { ProfileFormProps } from "@/types";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ProfileForm = ({ toast }: ProfileFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof patientSchema>>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      name: "",
      email: "",
      cpf: "",
      rg: "",
      birthdate: "",
      sex: "M",
      phone: "",
      cep: "",
      address: "",
    },
  });

  async function onSubmit(values: z.infer<typeof patientSchema>) {
    setIsLoading(true);
    const body = {
      name: values.name,
      email: values.email,
      cpf: values.cpf,
      rg: values.rg,
      birthdate: values.birthdate,
      sex: values.sex,
      phone: values.phone,
      cep: values.cep,
      address: values.address,
    };

    try {
      const res = await request("patient", POST(body));
      if (res.message) throw new Error(res.message);

      form.reset();
      toast("Paciente registrado", "Paciente registrado com sucesso");
      redirect("/app/patient");
    } catch (Error: any) {
      toast("Erro ao registrar paciente", Error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-wrap justify-between gap-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Digite o nome..." disabled={isLoading} {...field} className="md:w-64" />
              </FormControl>
              <FormDescription>Digite o nome completo do paciente.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cpf"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CPF</FormLabel>
              <FormControl>
                <Input placeholder="Digite o CPF..." disabled={isLoading} {...field} className="md:w-48" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rg"
          render={({ field }) => (
            <FormItem>
              <FormLabel>RG</FormLabel>
              <FormControl>
                <Input placeholder="Digite o RG..." disabled={isLoading} {...field} className="md:w-44" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Digite o email..." disabled={isLoading} {...field} className="md:w-64" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="birthdate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data de Nascimento</FormLabel>
              <FormControl>
                <Input type="date" disabled={isLoading} {...field} className="md:w-40" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <Input placeholder="Digite o número..." disabled={isLoading} {...field} className="md:w-44" />
              </FormControl>
              <FormDescription>Opte por número WhatsApp</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sex"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sexo</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-28">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem disabled={isLoading} value="M">
                      Masculino
                    </SelectItem>
                    <SelectItem disabled={isLoading} value="F">
                      Feminino
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cep"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CEP</FormLabel>
              <FormControl>
                <Input placeholder="Digite aqui..." disabled={isLoading} {...field} className="md:w-44" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Endereço</FormLabel>
              <FormControl>
                <Input placeholder="Digite aqui..." disabled={isLoading} {...field} className="md:w-72" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant={"gradient"} className="w-full" disabled={isLoading}>
          {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          Cadastrar
        </Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
