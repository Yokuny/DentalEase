"use client";

import * as React from "react";
import Cookie from "js-cookie";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinSchema } from "@/schemas/user.schema";
import { request, POST } from "@/helpers/fetch.config";
import { cn } from "@/helpers/cn.util";
import type { ProfileFormProps } from "@/types";

import { ReloadIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

const SignIn = ({ toast }: ProfileFormProps) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signinSchema>) {
    setIsLoading(true);
    const body = {
      email: values.email,
      password: values.password,
    };

    try {
      const res = await request("user/signin", POST(body));
      if (res.message) throw new Error(res.message);

      localStorage.setItem("user", JSON.stringify(res.user));
      Cookie.set("auth", res.token, { expires: 4 });

      router.push("/app");
    } catch (Error: any) {
      toast("Erro no login", Error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mx-auto mt-60 space-y-6 sm:w-[350px] w-full flex flex-col justify-center items-center">
      <div className="mb-6 flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Conecte ao serviço</h1>
        <p className="text-sm text-muted-foreground">Insira seu e-mail e senha</p>
      </div>

      <div className="grid gap-6 w-full sm:w-full">
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Password"
                      type="password"
                      autoCapitalize="none"
                      autoComplete="password"
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
    </div>
  );
};

export default SignIn;
