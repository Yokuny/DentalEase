"use client";

import { useEffect, useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { cn } from "@/helpers/cn.util";
import { columns } from "./List";
import { request, GET } from "@/helpers/fetch.config";
import type { Odontogram } from "@/types";

import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import List from "../../../components/list/OdontogramList";
import Register from "./Register";

const Interfaces = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [odontograms, setOdontograms] = useState<Odontogram[]>([]);

  useEffect(() => {
    const odontograms = localStorage.getItem("odontograms");
    if (odontograms) setOdontograms(JSON.parse(odontograms));
  }, []);

  const fetchOdontogram = async () => {
    setIsLoading(true);
    try {
      const res = await request("odontogram/partial", GET());
      if (res.success === false) throw new Error(res.message);

      localStorage.setItem("odontograms", JSON.stringify(res.data));
      setOdontograms(res.data);

      handlRequestResponse("Sucesso", "Lista de odontogramas atualizada.");
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
          <CardTitle className="text-primaryBlue md:text-xl">Odontograma</CardTitle>
          <CardDescription className="md:block hidden text-xs">
            Cadastros, consultas, históricos, em um só lugar.
          </CardDescription>
        </div>
        <div className="gap-2 flex-row flex">
          <button
            className={cn(buttonVariants({ variant: "default" }), "flex items-center gap-2")}
            onClick={fetchOdontogram}>
            {isLoading ? <ReloadIcon className="animate-spin" /> : <ReloadIcon className="hover:animate-spin" />}
            <p className="md:block hidden">Atualizar</p>
          </button>
          <Register toast={handlRequestResponse} />
        </div>
      </CardHeader>

      <CardContent className="flex items-center justify-center flex-col">
        <List columns={columns} data={odontograms} />
      </CardContent>
    </>
  );
};

export default Interfaces;
