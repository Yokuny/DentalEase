"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ReloadIcon } from "@radix-ui/react-icons";
import cn from "@/lib/utils";

import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Patient, columns } from "./tableColumns";
import { GET } from "@/lib/fetchConfig";
import Table from "./Table";

import Register from "./Register";

const API = process.env.NEXT_PUBLIC_API;

const Interfaces = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const searchParams = useSearchParams();
  // const patientParam = searchParams.get("interface");

  const { toast } = useToast();
  const handlRequestResponse = (title: string, message: string) =>
    toast({ title: title, description: message });

  const fetchPatients = async () => {
    // setIsLoading(true);
    try {
      const res = await fetch(`${API}patient/partial`, GET());
      const patients = await res.json();

      if (patients.message) throw new Error(patients.message);
      handlRequestResponse("Sucesso", "Pacientes atualizados com sucesso");

      localStorage.setItem("patients", JSON.stringify(patients));
      setPatients(patients);
    } catch (error: any) {
      handlRequestResponse("Erro", error.message);
    } finally {
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    const patients = localStorage.getItem("patients");
    if (patients) setPatients(JSON.parse(patients));
  }, []);

  return (
    <>
      <Register />
      <CardHeader className="flex flex-row justify-between items-baseline">
        <div className="md:gap-2 md:flex-row md:items-baseline flex flex-col">
          <CardTitle className="text-blue400">Pacientes</CardTitle>
          <CardDescription className="md:block hidden">
            Cadastros, consultas, históricos, em um só lugar.
          </CardDescription>
        </div>
        <div className="md:gap-2 md:flex-row flex flex-col">
          <button
            className={cn(buttonVariants({ variant: "solid500S" }), "flex items-center gap-2")}
            onClick={fetchPatients}>
            <ReloadIcon />
            Atualizar
          </button>
          <Link
            href="/app/patient?interface=register"
            className={cn(buttonVariants({ variant: "gradientS" }))}>
            Adicionar
          </Link>
        </div>
      </CardHeader>

      <CardContent className="flex items-center justify-center flex-col">
        <Table columns={columns} data={patients} />
      </CardContent>
    </>
  );
};

export default Interfaces;
