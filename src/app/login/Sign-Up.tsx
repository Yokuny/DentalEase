"use client";

import * as React from "react";
import { z } from "zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { request, POST } from "@/helpers/fetch.config";
import { ReloadIcon } from "@radix-ui/react-icons";
import { cn } from "@/helpers/cn.util";
import type { ProfileFormProps } from "@/types";

import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

const emailSchema = z.object({
  email: z.string().email("Insira um e-mail válido"),
});

const SignUp = ({ toast }: ProfileFormProps) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof emailSchema>) {
    setIsLoading(true);

    const body = {
      email: values.email,
    };

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <div className="mx-auto mt-60 space-y-6 sm:w-[350px] w-full flex flex-col justify-center items-center">
      <div className="mb-6 flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Criar conta</h1>
        <p className="text-sm text-muted-foreground">Insira seu e-mail abaixo para se cadastrar.</p>
      </div>
      <div className="grid gap-6 w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Email"
                      type="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      className="h-12"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className={cn(buttonVariants({ variant: "gradient" }))} disabled={isLoading}>
              {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
              Entrar
            </Button>
          </form>
        </Form>
      </div>
      <p className="px-8 text-center text-sm text-muted-foreground sm:w-[450px]">
        Ao clicar em continuar, você está concordando com nossos{" "}
        <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
          Termos de serviço
        </Link>{" "}
        e{" "}
        <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
          Politica de privacidade
        </Link>
        .
      </p>
    </div>
  );
};

export default SignUp;
