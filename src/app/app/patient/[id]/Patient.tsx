import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { request, POST } from "@/helpers/fetch.config";
import { requestPatient } from "@/helpers/requestById.helper";
import type { ToastProps, FullPatient } from "@/types";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion } from "@/components/ui/accordion";

import PatientAboutField from "@/components/app/patient/PatientAboutField";
import PatientAnamenesis from "@/components/app/patient/PatientAnamnese";
import PatientIntraoral from "@/components/app/patient/PatientIntraoral";

const Patient = ({ toast }: ToastProps) => {
  const router = useRouter();
  const { id } = useParams();

  const [patient, setPatient] = useState<FullPatient | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchPatient = async () => {
      try {
        const data = await requestPatient(String(id));
        setPatient(data);
      } catch (error: any) {
        toast("Erro", error.message);
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
          {/* <CardDescription className="">Ficha completa do paciente.</CardDescription> */}
        </div>
        {patient && <PatientAboutField patient={patient} />}
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="px-8">
          <PatientAnamenesis anamenesis={patient?.anamnese} userID={String(id)} />
          <PatientIntraoral intraoral={patient?.intraoral} userID={String(id)} />
        </Accordion>
      </CardContent>
    </>
  );
};

export default Patient;
