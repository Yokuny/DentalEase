"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

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

      if (res.id) {
        localStorage.setItem("activePatient", JSON.stringify(body));
        toast("Paciente registrado", "Paciente registrado com sucesso");

        form.reset();
        return router.push(`/app/patient/${res.id}?interface=anamnesis`);
      }

      throw new Error(res.message);
    } catch (Error: any) {
      console.log(Error);
      console.log(Error.message);
      toast("Erro ao registrar paciente", Error.message);
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
          name="name"
          render={({ field }) => (
            <FormItem className="md:w-1/4 md:max-w-none max-w-48">
              <FormLabel className="md:text-sm text-xs">Nome</FormLabel>
              <FormControl className="md:text-sm text-xs">
                <Input placeholder="Digite o nome..." disabled={isLoading} {...field} />
              </FormControl>
              <FormDescription className="md:block hidden">
                Digite o nome completo do paciente.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="md:w-1/6 md:max-w-none max-w-36 w-full">
              <FormLabel className="md:text-sm text-xs">Telefone</FormLabel>
              <FormControl className="md:text-sm text-xs">
                <Input placeholder="Digite o número..." disabled={isLoading} {...field} />
              </FormControl>
              <FormDescription className="md:block hidden">Opte por número WhatsApp</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="birthdate"
          render={({ field }) => (
            <FormItem className="md:w-1/6 md:max-w-none max-w-36 w-full">
              <FormLabel className="md:text-sm text-xs">Nascimento</FormLabel>
              <FormControl className="md:text-sm text-xs">
                <Input type="date" disabled={isLoading} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="md:w-1/4 md:max-w-none max-w-52 w-full">
              <FormLabel className="md:text-sm text-xs">Email</FormLabel>
              <FormControl className="md:text-sm text-xs">
                <Input placeholder="Digite o email..." disabled={isLoading} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cpf"
          render={({ field }) => (
            <FormItem className="md:w-1/6 md:max-w-none max-w-32">
              <FormLabel className="md:text-sm text-xs">CPF</FormLabel>
              <FormControl className="md:text-sm text-xs">
                <Input placeholder="Digite o CPF..." disabled={isLoading} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rg"
          render={({ field }) => (
            <FormItem className="md:w-1/6 md:max-w-none max-w-28">
              <FormLabel className="md:text-sm text-xs">RG</FormLabel>
              <FormControl className="md:text-sm text-xs">
                <Input placeholder="Digite o RG..." disabled={isLoading} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sex"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="md:text-sm text-xs">Sexo</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl className="md:text-sm text-xs">
                    <SelectTrigger className="max-w-28 w-full">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem className="text-xs" disabled={isLoading} value="M">
                      Masculino
                    </SelectItem>
                    <SelectItem className="text-xs" disabled={isLoading} value="F">
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
            <FormItem className="md:w-1/6 md:max-w-none max-w-32 w-full">
              <FormLabel className="md:text-sm text-xs">CEP</FormLabel>
              <FormControl className="md:text-sm text-xs">
                <Input placeholder="Digite aqui..." disabled={isLoading} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="md:w-1/4 md:max-w-none max-w-48 w-full">
              <FormLabel className="md:text-sm text-xs">Endereço</FormLabel>
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
