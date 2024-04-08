"use client";

import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { cn } from "@/helpers/cn.util";
import { request, POST } from "@/helpers/fetch.config";
import type {} from "@/types";

import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Form from "./Form";

const Interfaces = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { toast } = useToast();
  const handlRequestResponse = (title: string, message: string) =>
    toast({ title: title, description: message });

  return (
    <>
      <CardHeader className="items-baseline md:gap-2 md:flex-row md:items-baseline flex flex-col">
        <CardTitle className="text-primaryBlue md:text-xl">Clinica</CardTitle>
        <CardDescription className="md:block hidden text-xs font-mono tracking-tighter">
          Registro da clinica.
        </CardDescription>
      </CardHeader>

      <CardContent className="md:p-6 p-0 pb-0 items-center justify-center flex flex-col">
        <Form toast={handlRequestResponse} />
      </CardContent>
    </>
  );
};

export default Interfaces;
