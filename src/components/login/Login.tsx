"use client";

import * as React from "react";

import cn from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ReloadIcon } from "@radix-ui/react-icons";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <div className={cn("grid gap-6", className)}>
      <form onSubmit={onSubmit}>
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
          <Button className={cn(buttonVariants({ variant: "gradientS" }))} disabled={isLoading}>
            {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            Entrar com email
          </Button>
        </div>
      </form>
    </div>
  );
}
