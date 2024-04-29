"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { columns } from "./List";
import { localOdontogram, refreshOdontogram } from "@/helpers/dataManager.helper";
import { cn } from "@/helpers/cn.util";
import type { Odontogram } from "@/types";

import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import List from "../../../components/list/OdontogramList";
import Register from "./Register";

const Interfaces = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [odontograms, setOdontograms] = useState<Odontogram[]>([]);

  const { toast } = useToast();
  const handlRequestResponse = useCallback(
    (title: string, message: string) => toast({ title: title, description: message }),
    [toast]
  );

  useEffect(() => {
    const fetchOdontogram = async () => {
      setIsLoading(true);
      try {
        const data = await localOdontogram();
        setOdontograms(data);
      } catch (error: any) {
        handlRequestResponse("Erro", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOdontogram();
  }, [handlRequestResponse]);

  const fetchOdontogram = async () => {
    setIsLoading(true);
    try {
      const data = await refreshOdontogram();
      handlRequestResponse("Sucesso", "Odontograma atualizado com sucesso");
      setOdontograms(data);
    } catch (error: any) {
      handlRequestResponse("Erro", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <CardHeader className="flex flex-row justify-between items-baseline">
        <div className="md:gap-2 md:flex-row md:items-baseline flex flex-col">
          <CardTitle className="text-primaryBlue md:text-xl">Odontograma</CardTitle>
          <CardDescription className="md:block hidden text-xs">Lista de odontogramas cadastrados</CardDescription>
        </div>
        <div className="gap-2 flex-row flex">
          <button
            className={cn(buttonVariants({ variant: "default" }), "flex items-center gap-2")}
            onClick={fetchOdontogram}>
            {isLoading ? <ReloadIcon className="animate-spin" /> : <ReloadIcon className="hover:animate-spin" />}
            <p className="md:block hidden">Atualizar</p>
          </button>
          <Suspense fallback={<div>Loading...</div>}>
            <Register toast={handlRequestResponse} />
          </Suspense>
        </div>
      </CardHeader>

      <CardContent className="flex items-center justify-center flex-col">
        <List columns={columns} data={odontograms} />
      </CardContent>
    </>
  );
};

export default Interfaces;
