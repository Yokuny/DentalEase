"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { request, POST } from "@/helpers/fetch.config";
import { requestPatient } from "@/helpers/requestById.helper";
import { formatPhone, extractData, formatCpfCnpj } from "@/helpers/formatter.helper";
import type { ToastProps, FullPatient } from "@/types";

import IconReload from "../../../../../public/Reload.Icon";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import ActivePatientRender from "@/components/app/patient/ActivePatientRender";
import SubtitleSeparator from "@/components/app/patient/SubtitleSeparator";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import IconAddSquare from "../../../../../public/AddSquare.Icon";
import IconCloseSquare from "../../../../../public/CloseSquare.Icon";
import PatientAbout from "./PatientAbout";

const Patient = ({ toast }: ToastProps) => {
  const router = useRouter();
  const { id } = useParams();

  const [patient, setPatient] = useState<FullPatient | null>(null);
  const [basePatientInfo, setBasePatientInfo] = useState<{ title: string; value: string | undefined }[]>([]);
  const [patientInfoOpen, setPatientInfoOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchPatient = async () => {
      try {
        const data = await requestPatient(String(id));
        if (data?.phone && data?.birthdate && data?.sex) {
          setBasePatientInfo([
            { title: "Contato", value: formatPhone(data.phone) },
            { title: "Nascimento", value: extractData(data.birthdate, "") },
            { title: "Sexo", value: data?.sex == "F" ? "Feminino" : "Masculino" },
          ]);
        }
        setPatient(data);
      } catch (error: any) {
        toast("Erro", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchPatient();
  }, [id, toast, setBasePatientInfo]);

  const patientInfo = () => {
    setPatientInfoOpen(!patientInfoOpen);
    if (patientInfoOpen)
      return setBasePatientInfo([
        { title: "Contato", value: formatPhone(patient?.phone) },
        { title: "Nascimento", value: extractData(patient?.birthdate, "") },
        { title: "Sexo", value: patient?.sex == "F" ? "Feminino" : "Masculino" },
      ]);

    setBasePatientInfo([
      { title: "Contato", value: formatPhone(patient?.phone) },
      { title: "Nascimento", value: extractData(patient?.birthdate, "") },
      { title: "Sexo", value: patient?.sex == "F" ? "Feminino" : "Masculino" },
      { title: "E-mail", value: patient?.email },
      { title: "CPF", value: formatCpfCnpj(patient?.cpf) },
      { title: "RG", value: patient?.rg },
      { title: "Endereço", value: patient?.address },
      { title: "Criado em", value: extractData(patient?.createdAt, "") },
    ]);
  };

  return (
    <>
      <CardHeader>
        <div className="md:gap-2 mb-4 md:flex-row md:items-baseline flex flex-col">
          <CardTitle className="text-primaryBlue md:text-xl tracking-tight">{patient?.name}</CardTitle>
          {/* <CardDescription className="">Ficha completa do paciente.</CardDescription> */}
        </div>
        <ScrollArea className="whitespace-nowrap">
          <div className="flex w-max items-center space-x-5">
            {basePatientInfo.map((info, index) => (
              <PatientAbout key={`patient-info-${index}`} title={info.title} value={info.value} />
            ))}
            <div onClick={() => patientInfo()} className="cursor-pointer">
              {patientInfoOpen ? (
                <IconCloseSquare className="w-5 h-5 dark:w-6 dark:h-6" />
              ) : (
                <IconAddSquare className="w-5 h-5 dark:w-6 dark:h-6" />
              )}
            </div>
            <ScrollBar orientation="horizontal" />
          </div>
        </ScrollArea>
      </CardHeader>
      <CardContent>
        <pre>{JSON.stringify(patient, null, 2)}</pre>
      </CardContent>
    </>
  );
};

export default Patient;
