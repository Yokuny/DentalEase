"use client";

import { useEffect, useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { cn } from "@/helpers/cn.util";
import { Patient, columns } from "../../../components/app/patient/tableColumns";
import { request, GET } from "@/helpers/fetch.config";

import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import HeaderDescription from "@/components/app/patient/HeaderDescription";
import List from "./List";
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
        <HeaderDescription />
        <div className="md:gap-2 md:flex-row flex flex-col">
          <button
            className={cn(buttonVariants({ variant: "outline" }), "flex items-center gap-2")}
            onClick={fetchPatients}>
            {isLoading ? <ReloadIcon className="animate-spin" /> : <ReloadIcon />}
            Atualizar
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
