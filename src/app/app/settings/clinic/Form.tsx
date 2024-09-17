import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { request, PUT } from "@/helpers/fetch.config";
import { clinicSchema, NewClinic } from "@/schemas/clinic.schema";
import type { PartialClinic } from "@/types";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

type ProfileFormProps = {
  clinic: PartialClinic | null;
  toast: (title: string, message: string) => void;
};

const ClinicForm = ({ clinic, toast }: ProfileFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<NewClinic>({
    resolver: zodResolver(clinicSchema),
    defaultValues: {
      name: clinic?.name,
      email: clinic?.email,
      code: clinic?.code,
      cnpj: clinic?.cnpj,
    },
    mode: "onChange",
  });

  const onSubmit = async (values: NewClinic) => {
    setIsLoading(true);
    const body = {
      name: values.name,
      email: values.email,
      code: values.code,
      cnpj: values.cnpj,
    };

    try {
      const res = await request("user/change-password", PUT(body));
      if (res.success === false) throw new Error(res.message);
      toast("Sucesso", res.message);
    } catch (error: any) {
      toast("Erro", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    form.setValue("name", clinic?.name || "");
    form.setValue("email", clinic?.email || "");
    form.setValue("code", clinic?.code || "");
    form.setValue("cnpj", clinic?.cnpj || "");
  }, [form, clinic]);

  return (
    <Form {...form}>
      <form
        id="password-form"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(form.getValues());
        }}
        className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <div className="gap-2 flex">
                <FormLabel>Nome</FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <Input placeholder="Digite o nome da clínica" {...field} disabled={isLoading} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div className="gap-2 flex">
                <FormLabel>Email</FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <Input placeholder="Digite o email da clínica" {...field} disabled={isLoading} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <div className="gap-2 flex">
                <FormLabel>Código</FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <Input placeholder="Digite um código para a clínica" {...field} disabled={isLoading} />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="md:space-y-2 space-y-1">
          <FormLabel>Usuários</FormLabel>

          {clinic?.users.map((user) => (
            <div key={user.email} className="md:space-y-2 space-y-1">
              <div className="gap-2 flex">
                <span>{user.name}</span>
                <span>{user.email}</span>
              </div>
              <Badge variant={user.role === "admin" ? "positive" : user.role === "doctor" ? "neutral" : "pink"}>
                {user.role === "admin" ? "Administrador" : user.role === "doctor" ? "Dentista" : "Assistente"}
              </Badge>
            </div>
          ))}
        </div>

        <FormField
          control={form.control}
          name="cnpj"
          render={({ field }) => (
            <FormItem>
              <div className="gap-2 flex">
                <FormLabel>CNPJ</FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <Input placeholder="Digite o CNPJ da clínica" {...field} disabled={isLoading} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button form="password-form" type="submit" variant={"gradient"} disabled={isLoading}>
          {isLoading ? "Salvando..." : "Salvar"}
        </Button>
      </form>
    </Form>
  );
};

export default ClinicForm;
