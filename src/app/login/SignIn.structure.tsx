"use client";

import * as React from "react";
import Cookie from "js-cookie";
import cn from "@/lib/utils";
import { ReloadIcon } from "@radix-ui/react-icons";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { POST } from "@/lib/fetchConfig";

const API = process.env.NEXT_PUBLIC_API;

const SignIn = ({ toast }: any) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setIsLoading(true);

    const body = {
      email: (event.currentTarget as HTMLFormElement).email.value,
      password: (event.currentTarget as HTMLFormElement).password.value,
    }; // validar com regex

    try {
      const res = await fetch(`${API}user/signin`, POST(body));
      const user = await res.json();

      if (user.message) throw new Error(user.message);

      localStorage.setItem("user", JSON.stringify(user.user));
      Cookie.set("auth", user.token, { expires: 4 });

      window.location.href = "/app";
    } catch (Error: any) {
      toast("Erro no login", Error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-60 space-y-6 sm:w-[350px] w-full flex flex-col justify-center items-center">
      <div className="mb-6 flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Conecte ao serviço</h1>
        <p className="text-sm text-muted-foreground">Insira seu e-mail e senha</p>
      </div>

      <div className="grid gap-6 w-full sm:w-full">
        <form onSubmit={onSubmit} className="grid gap-3">
          <div className="grid gap-3">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              className="h-12"
              disabled={isLoading}
            />
            <Input
              id="password"
              placeholder="digite sua senha"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              className="h-12"
              disabled={isLoading}
            />
          </div>
          <Button className={cn(buttonVariants({ variant: "gradientS" }))} disabled={isLoading}>
            {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            Entrar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
