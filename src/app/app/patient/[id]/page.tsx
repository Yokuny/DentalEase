"use client";

import { useState, useEffect, Suspense } from "react";
import { useParams } from "next/navigation";
import { requestPatient } from "@/helpers/requestById.helper";
import type { FullPatient } from "@/types";

import { useToast } from "@/components/ui/use-toast";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import PatientAboutField from "@/components/app/patient/PatientAboutField";
import PatientAnamenesis from "@/components/app/patient/PatientAnamnese";
import PatientIntraoral from "@/components/app/patient/PatientIntraoral";
import Avatar from "@/components/app/patient/Avatar";
import Anamnesis from "./Anamnesis";
import Intraoral from "./Intraoral";

const PatientData = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [patient, setPatient] = useState<FullPatient | null>(null);
  const { id } = useParams();

  const { toast } = useToast();
  const handlRequestResponse = (title: string, message: string) => toast({ title: title, description: message });

  useEffect(() => {
    setIsLoading(true);
    const fetchPatient = async () => {
      try {
        const data = await requestPatient(String(id));
        localStorage.setItem("activePatient", JSON.stringify(data));
        setPatient(data);
      } catch (error: any) {
        toast({ title: "Erro", description: error.message });
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchPatient();
  }, [id, toast]);

  return (
    <>
      <CardHeader>
        <div className="mb-4 gap-4 items-center flex">
          <Avatar patientID={String(id)} image={patient?.image} fallback={patient?.name.slice(0, 2) || ""} />
          <CardTitle className="text-skyBlue md:text-2xl tracking-wide">{patient?.name}</CardTitle>
        </div>
        {patient && <PatientAboutField patient={patient} />}
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="Anamnese" className="px-10 pb-6 gap-2 flex-col flex">
          <TabsList className="w-fit p-5 px-6 gap-3 rounded-md border bg-slate-50 dark:bg-slate-900/70 shadow-sm">
            <TabsTrigger value="Schedule">Agendamentos</TabsTrigger>
            <TabsTrigger value="Odontogram">Odontograma</TabsTrigger>
            <TabsTrigger value="Anamnesis">Anamnese</TabsTrigger>
            <TabsTrigger value="Intraoral">Intraoral</TabsTrigger>
          </TabsList>
          <PatientAnamenesis anamenesis={patient?.anamnese} userID={String(id)} />
          <PatientIntraoral intraoral={patient?.intraoral} userID={String(id)} />
        </Tabs>
      </CardContent>

      <Suspense fallback={<div>Carregando...</div>}>
        <Anamnesis toast={handlRequestResponse} />
        <Intraoral toast={handlRequestResponse} />
      </Suspense>
    </>
  );
};

export default PatientData;