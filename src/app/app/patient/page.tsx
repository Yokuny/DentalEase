"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { columns } from "./List";
import { localPatient, refreshPatient } from "@/helpers/dataManager.helper";
import type { PartialPatient } from "@/types";

// import IconReload from "../../../../public/Reload.Icon";
// import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import List from "../../../components/list/PatientList";
import Register from "./Register";

const Interfaces = () => {
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const [patients, setPatients] = useState<PartialPatient[]>([]);

  const { toast } = useToast();
  const handlRequestResponse = useCallback(
    (title: string, message: string) => toast({ title: title, description: message }),
    [toast]
  );

  useEffect(() => {
    // setIsLoading(true);
    const fetchPatients = async () => {
      try {
        const data = await localPatient();
        setPatients(data);
      } catch (error: any) {
        handlRequestResponse("Erro", error.message);
      } finally {
        // setIsLoading(false);
      }
    };
    fetchPatients();
  }, [handlRequestResponse]);

  // const fetchPatients = async () => {
  //   setIsLoading(true);
  //   try {
  //     const data = await refreshPatient();
  //     handlRequestResponse("Sucesso", "Pacientes atualizados com sucesso");
  //     setPatients(data);
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
          <CardTitle className="text-primaryBlue md:text-xl">Pacientes</CardTitle>
          <CardDescription className="md:block hidden text-xs font-mono tracking-tighter">
            Lista de pacientes cadastrados
          </CardDescription>
        </div>
        <div className="gap-2 flex-row flex">
          {/* <Button
            variant="primary"
            className="group flex items-center gap-2 text-slate-700 dark:text-slate-300"
            onClick={fetchPatients}>
            {isLoading ? <IconReload className="animate-spin" /> : <IconReload className="group-hover:animate-spin" />}
            <p className="md:block hidden">Atualizar</p>
          </Button> */}
          <Suspense fallback={<div>Carregando...</div>}>
            <Register toast={handlRequestResponse} />
          </Suspense>
        </div>
      </CardHeader>

      <CardContent className="flex items-center justify-center flex-col">
        <List columns={columns} data={patients} />
      </CardContent>
    </>
  );
};

export default Interfaces;
