"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { columns } from "./List";
import { localService, refreshService } from "@/helpers/dataManager.helper";
import type { Service } from "@/types";

// import IconReload from "../../../../public/Reload.Icon";
// import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import List from "../../../components/list/ServiceList";
import Register from "./Register";

const Interfaces = () => {
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const [services, setServices] = useState<Service[]>([]);

  const { toast } = useToast();
  const handlRequestResponse = useCallback(
    (title: string, message: string) => toast({ title: title, description: message }),
    [toast]
  );

  useEffect(() => {
    // setIsLoading(true);
    const fetchService = async () => {
      try {
        const data = await localService();
        setServices(data);
      } catch (error: any) {
        handlRequestResponse("Erro", error.message);
      } finally {
        // setIsLoading(false);
      }
    };
    fetchService();
  }, [handlRequestResponse]);

  // const fetchService = async () => {
  //   setIsLoading(true);
  //   try {
  //     const data = await refreshService();
  //     handlRequestResponse("Sucesso", "Serviços atualizados com sucesso");
  //     setServices(data);
  //   } catch (error: any) {
  //     handlRequestResponse("Erro", error.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <>
      <CardHeader className="flex flex-row justify-between items-baseline">
        <div className="md:gap-2 md:flex-row md:items-baseline flex flex-col">
          <CardTitle className="text-primaryBlue md:text-xl">Serviços</CardTitle>
          <CardDescription className="md:block hidden text-xs">Lista de serviços prestados.</CardDescription>
        </div>
        <div className="gap-2 flex-row flex">
          {/* <Button
            variant="primary"
            className="group flex items-center gap-2 text-slate-700 dark:text-slate-300"
            onClick={fetchService}>
            {isLoading ? <IconReload className="animate-spin" /> : <IconReload className="group-hover:animate-spin" />}
            <p className="md:block hidden">Atualizar</p>
          </Button> */}
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
