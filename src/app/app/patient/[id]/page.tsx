"use client";

import { useState, useEffect, Suspense } from "react";
import { useParams } from "next/navigation";
import { request, POST } from "@/helpers/fetch.config";
import { requestPatient } from "@/helpers/requestById.helper";
import type { FullPatient } from "@/types";

import { useToast } from "@/components/ui/use-toast";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion } from "@/components/ui/accordion";

import PatientAboutField from "@/components/app/patient/PatientAboutField";
import PatientAnamenesis from "@/components/app/patient/PatientAnamnese";
import PatientIntraoral from "@/components/app/patient/PatientIntraoral";
import Anamnesis from "./Anamnesis";
import Intraoral from "./Intraoral";

const CloseView = () => {
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
        <div className="md:gap-2 mb-4 md:flex-row md:items-baseline flex flex-col">
          <CardTitle className="text-skyBlue md:text-2xl tracking-wide">{patient?.name}</CardTitle>
          {/* <CardDescription>Ficha completa do paciente.</CardDescription> */}
        </div>
        {patient && <PatientAboutField patient={patient} />}
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="px-10">
          <PatientAnamenesis anamenesis={patient?.anamnese} userID={String(id)} />
          <PatientIntraoral intraoral={patient?.intraoral} userID={String(id)} />
        </Accordion>
      </CardContent>

      <Suspense fallback={<div>Carregando...</div>}>
        <Anamnesis toast={handlRequestResponse} />
        <Intraoral toast={handlRequestResponse} />
      </Suspense>
    </>
  );
};

export default CloseView;