import { z } from "zod";
import { patientSchema } from "@/schemas/patient.schema";
import { formatCpfCnpj, formatPhone } from "@/helpers";

const activePatientRender = () => {
  const storedActivePatient = localStorage.getItem("activePatient");
  if (!storedActivePatient) return;
  const activePatient = JSON.parse(storedActivePatient) as z.infer<typeof patientSchema>;

  return (
    <>
      <span className="flex flex-wrap gap-2 text-slate-500 dark:text-slate-400">
        <span className="border p-2 px-4 flex gap-1 rounded-md bg-muted/40 cursor-not-allowed">
          <span className="text-xs font-mono">Name:</span>
          <span className="text-xs font-medium">{activePatient.name}</span>
        </span>
        {activePatient.cpf && (
          <span className="border p-2 px-4 flex gap-1 rounded-md bg-muted/40 cursor-not-allowed">
            <span className="text-xs font-mono">CPF:</span>
            <span className="text-xs font-medium">{formatCpfCnpj(activePatient.cpf)}</span>
          </span>
        )}
        {activePatient.rg && (
          <span className="border p-2 px-4 flex gap-1 rounded-md bg-muted/40 cursor-not-allowed">
            <span className="text-xs font-mono">RG:</span>
            <span className="text-xs font-medium">{activePatient.rg}</span>
          </span>
        )}
        <span className="border p-2 px-4 flex gap-1 rounded-md bg-muted/40 cursor-not-allowed">
          <span className="text-xs font-mono">Celular:</span>
          <span className="text-xs font-medium">{formatPhone(activePatient.phone)}</span>
        </span>
        <span className="border p-2 px-4 flex gap-1 rounded-md bg-muted/40 cursor-not-allowed">
          <span className="text-xs font-mono">Email:</span>
          <span className="text-xs font-medium">{activePatient.email}</span>
        </span>
      </span>
    </>
  );
};

export default activePatientRender;
