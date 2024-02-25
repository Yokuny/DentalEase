"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import cn from "@/lib/utils";

import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Patient, columns } from "./columns";
import PatientTable from "./PatientTable";
import ContentHeader from "./ContentHeader";

export const payments: Patient[] = [
  {
    id: "728ed52f",
    name: "Maria da Silva",
    phone: "123456789",
    cadastro: "01/01/2021",
    status: "Ativo",
  },
  {
    id: "489e1d42",
    name: "João rodrigues",
    phone: "987654321",
    cadastro: "01/01/2021",
    status: "Ativo",
  },
  {
    id: "f6b1e3f4",
    name: "José Pereira",
    phone: "987654321",
    cadastro: "01/01/2021",
    status: "Ativo",
  },
  {
    id: "f6b1e3f4",
    name: "José Carlos",
    phone: "987654321",
    cadastro: "01/01/2021",
    status: "Ativo",
  },
];

const Interfaces = () => {
  const searchParams = useSearchParams();
  const patientParam = searchParams.get("interface");

  const API = process.env.NEXT_PUBLIC_API;

  return (
    <>
      <CardHeader className="flex flex-row justify-between items-baseline">
        <div className="md:gap-2 md:flex-row md:items-baseline flex  flex-col">
          <CardTitle className="text-blue400">Pacientes</CardTitle>
          <CardDescription>Cadastros, consultas, históricos, em um só lugar.</CardDescription>
        </div>
        <Link
          href="/app/patient?interface=register"
          className={cn(buttonVariants({ variant: "gradientS" }), " text-white font-semibold")}>
          Adicionar
        </Link>
      </CardHeader>

      <CardContent className="flex items-center justify-center flex-col">
        <ContentHeader />
        <PatientTable columns={columns} data={payments} />
      </CardContent>
      <CardFooter>
        <></>
      </CardFooter>
    </>
  );
};

export default Interfaces;
