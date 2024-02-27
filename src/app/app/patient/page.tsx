"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import cn from "@/lib/utils";

import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Patient, columns } from "./tableColumns";
import PatientTable from "./PatientTable";
import ContentHeader from "./ContentHeader";
import { GET } from "@/lib/fetchConfig";
import DataTableDemo from "./TableComplete";

const API = process.env.NEXT_PUBLIC_API;

const Interfaces = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const searchParams = useSearchParams();
  const patientParam = searchParams.get("interface");

  useEffect(() => {
    // setIsLoading(true);
    const fetchPatients = async () => {
      console.log("fetch patients");
      try {
        console.log("fetching patients");
        const patients = await fetch(`${API}patient/partial`, GET());
        const response = await patients.json();

        localStorage.setItem("patients", JSON.stringify(response));

        setPatients(response);
      } catch (error) {
        console.error(error);
      } finally {
        // setIsLoading(false);
      }
    };
    fetchPatients();
  }, []);

  return (
    <>
      <CardHeader className="flex flex-row justify-between items-baseline">
        <div className="md:gap-2 md:flex-row md:items-baseline flex flex-col">
          <CardTitle className="text-blue400">Pacientes</CardTitle>
          <CardDescription className="md:block hidden">
            Cadastros, consultas, históricos, em um só lugar.
          </CardDescription>
        </div>
        <Link
          href="/app/patient?interface=register"
          className={cn(buttonVariants({ variant: "gradientS" }), "text-white font-semibold")}>
          Adicionar
        </Link>
      </CardHeader>

      <CardContent className="flex items-center justify-center flex-col">
        <ContentHeader />
        <PatientTable columns={columns} data={patients} />
        <DataTableDemo />
      </CardContent>
      <CardFooter>
        <></>
      </CardFooter>
    </>
  );
};

export default Interfaces;
