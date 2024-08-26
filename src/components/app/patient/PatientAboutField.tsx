import { useCallback, useEffect, useState } from "react";
import { formatPhone, extractData, formatCpfCnpj } from "@/helpers/formatter.helper";
import type { FullPatient } from "@/types";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import PatientAboutBlock from "./PatientAboutBlock";
import More from "../../../../public/AddSquare.Icon";
import Less from "../../../../public/CloseSquare.Icon";

const PatientAboutField = ({ patient }: { patient: FullPatient }) => {
  const [basePatientInfo, setBasePatientInfo] = useState<{ title: string; value: string | undefined }[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const setBaseInfo = useCallback(() => {
    setBasePatientInfo([
      { title: "Contato", value: formatPhone(patient?.phone) },
      { title: "Sexo", value: patient?.sex == "F" ? "Feminino" : "Masculino" },
    ]);
  }, [patient]);

  const setFullInfo = useCallback(() => {
    setBasePatientInfo([
      { title: "Contato", value: formatPhone(patient?.phone) },
      { title: "Sexo", value: patient?.sex == "F" ? "Feminino" : "Masculino" },
      { title: "CPF", value: formatCpfCnpj(patient?.cpf) },
      { title: "RG", value: patient?.rg },
      { title: "E-mail", value: patient?.email },
      { title: "Nascimento", value: extractData(patient?.birthdate, "") },
      { title: "Endereço", value: patient?.address },
      { title: "Cadastrado em", value: extractData(patient?.createdAt, "") },
    ]);
  }, [patient]);

  const patientInfo = () => {
    setIsOpen(!isOpen);
    if (isOpen) return setBaseInfo();
    return setFullInfo();
  };

  useEffect(() => {
    return setBaseInfo();
  }, [patient, setBaseInfo]);

  return (
    <ScrollArea className="whitespace-nowrap">
      <div className="flex w-max items-center space-x-5">
        {basePatientInfo.map((info, index) => (
          <PatientAboutBlock key={`patient-info-${index}`} title={info.title} value={info.value} />
        ))}
        <div onClick={() => patientInfo()} className="cursor-pointer">
          {isOpen ? (
            <Less className="w-5 h-5 dark:w-6 dark:h-6 text-primaryBlue" />
          ) : (
            <More className="w-5 h-5 dark:w-6 dark:h-6 text-primaryBlue" />
          )}
        </div>
        <ScrollBar orientation="horizontal" />
      </div>
    </ScrollArea>
  );
};

export default PatientAboutField;
