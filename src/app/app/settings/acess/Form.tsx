import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { request, PUT } from "@/helpers/fetch.config";
import { PasswordUpdate, passwordUpdateSchema } from "@/schemas/user.schema";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AcessForm = ({ toast }: { toast: (title: string, message: string) => void }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<PasswordUpdate>({
    resolver: zodResolver(passwordUpdateSchema),
    mode: "onChange",
  });

  const onSubmit = async (values: PasswordUpdate) => {
    setIsLoading(true);
    const body = {
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    };

    try {
      if (values.newPassword !== values.confirmPassword) throw new Error("Você digitou senhas diferentes");

      const res = await request("user/change-password", PUT(body));
      if (res.success === false) throw new Error(res.message);
      toast("Sucesso", res.message);
    } catch (error: any) {
      toast("Erro", error.message);
    } finally {
      setIsLoading(false);
    }
  };

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
          name="oldPassword"
          render={({ field }) => (
            <FormItem>
              <div className="gap-2 flex">
                <FormLabel>Senha antiga</FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <Input placeholder="Senha antiga" type="password" {...field} disabled={isLoading} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <div className="gap-2 flex">
                <FormLabel>Nova senha</FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <Input placeholder="Nova senha" type="password" {...field} disabled={isLoading} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <div className="gap-2 flex">
                <FormLabel>Confirmar senha</FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <Input placeholder="Confirmar senha" type="password" {...field} disabled={isLoading} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button form="password-form" type="submit" variant={"gradient"} disabled={isLoading}>
          Atualizar perfil
        </Button>
      </form>
    </Form>
  );
};

export default AcessForm;
