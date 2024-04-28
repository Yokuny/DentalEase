"use client";

import { Suspense, useEffect, useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { cn } from "@/helpers/cn.util";
import { columns } from "./List";
import { request, GET } from "@/helpers/fetch.config";
import type { Service } from "@/types";

import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import List from "../../../components/list/ServiceList";
import Register from "./Register";

const Interfaces = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const services = localStorage.getItem("services");
    if (services) setServices(JSON.parse(services));
  }, []);

  const fetchService = async () => {
    setIsLoading(true);
    try {
      const res = await request("service/partial", GET());
      if (res.success === false) throw new Error(res.message);

      localStorage.setItem("services", JSON.stringify(res.data));
      setServices(res.data);

      handlRequestResponse("Sucesso", "Lista de serviços atualizada.");
    } catch (error: any) {
      handlRequestResponse("Erro", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const { toast } = useToast();
  const handlRequestResponse = (title: string, message: string) => toast({ title: title, description: message });

  return (
    <>
      <CardHeader className="flex flex-row justify-between items-baseline">
        <div className="md:gap-2 md:flex-row md:items-baseline flex flex-col">
          <CardTitle className="text-primaryBlue md:text-xl">Serviços</CardTitle>
          <CardDescription className="md:block hidden text-xs">Lista de serviços prestados.</CardDescription>
        </div>
        <div className="gap-2 flex-row flex">
          <button
            className={cn(buttonVariants({ variant: "default" }), "flex items-center gap-2")}
            onClick={fetchService}>
            {isLoading ? <ReloadIcon className="animate-spin" /> : <ReloadIcon className="hover:animate-spin" />}
            <p className="md:block hidden">Atualizar</p>
          </button>
          <Suspense fallback={<div>Loading...</div>}>
            <Register toast={handlRequestResponse} />
          </Suspense>
        </div>
      </CardHeader>

      <CardContent className="flex items-center justify-center flex-col">
        <List columns={columns} data={services} />
      </CardContent>
    </>
  );
};

export default Interfaces;
