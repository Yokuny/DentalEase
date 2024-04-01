"use client";

import { useEffect, useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { cn } from "@/helpers/cn.util";
import { columns } from "./List";
import { request, GET } from "@/helpers/fetch.config";
import type { Patient } from "@/types";

import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import List from "../../../components/list/List";
import Register from "./Register";

const Interfaces = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const patients = localStorage.getItem("patients");
    if (patients) setPatients(JSON.parse(patients));
  }, []);

  const { toast } = useToast();
  const handlRequestResponse = (title: string, message: string) =>
    toast({ title: title, description: message });

  const fetchPatients = async () => {
    setIsLoading(true);
    try {
      const res = await request("patient/partial", GET());
      if (res.message) throw new Error(res.message);

      localStorage.setItem("patients", JSON.stringify(res));
      setPatients(res);

      handlRequestResponse("Sucesso", "Lista de pacientes atualizada.");
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
          <CardTitle className="text-primaryBlue md:text-xl">Pacientes</CardTitle>
          <CardDescription className="md:block hidden text-xs">
            Cadastros, consultas, históricos, em um só lugar.
          </CardDescription>
        </div>
        <div className="gap-2 flex-row flex">
          <button
            className={cn(buttonVariants({ variant: "default" }), "flex items-center gap-2")}
            onClick={fetchPatients}>
            {isLoading ? (
              <ReloadIcon className="animate-spin" />
            ) : (
              <ReloadIcon className="hover:animate-spin" />
            )}
            <p className="md:block hidden">Atualizar</p>
          </button>
          <Register toast={handlRequestResponse} />
        </div>
      </CardHeader>

      <CardContent className="flex items-center justify-center flex-col">
        <List columns={columns} data={patients} />
      </CardContent>
    </>
  );
};

export default Interfaces;
