"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { request, POST } from "@/helpers/fetch.config";
import { requestPatient } from "@/helpers/requestById.helper";
import type { ToastProps, FullPatient } from "@/types";

import IconReload from "../../../../../public/Reload.Icon";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import ActivePatientRender from "@/components/app/patient/ActivePatientRender";
import SubtitleSeparator from "@/components/app/patient/SubtitleSeparator";

const Patient = ({ toast }: ToastProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [patient, setPatient] = useState<FullPatient | null>(null);

  const router = useRouter();
  const { id } = useParams();

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
          <CardTitle className="text-primaryBlue md:text-xl tracking-tight">{patient?.name}</CardTitle>
          <CardDescription className="">Ficha completa do paciente.</CardDescription>
        </div>
        <ActivePatientRender />
      </CardHeader>
      <CardContent>
        <pre>{JSON.stringify(patient, null, 2)}</pre>
      </CardContent>
    </>
  );
};

export default Patient;
