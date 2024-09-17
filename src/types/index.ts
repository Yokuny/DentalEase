import type { NewPatient, UpdateAnamnesis, UpdateIntraoral } from "./patient.schema";
import type { NewOdontogram } from "./odontogram.schema";
import type { NewFinancial } from "./financial.schema";
import type { NewSchedule } from "./schedule.schema";

type Clinic = { Clinic: string };

export type ToastProps = {
  toast: (title: string, message: string) => void;
};

export type LogInProps = {
  toast: (title: string, message: string) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
};

export type ErrorProps = {
  error: Error;
  reset: () => void;
};

export type PartialUser = {
  name: string;
  email: string;
  clinic: string;
  image: string | null;
};

export type PartialClinic = {
  _id: string;
  name: string;
  email: string;
  code: string;
  cnpj: string;
  users: { name: string; email: string; role: "admin" | "doctor" | "assistant" }[];
};

export type PartialPatient = {
  _id: string;
  name: string;
  phone: string;
  email: string;
  sex: "M" | "F";
  anamnese: boolean;
  intraoral: boolean;
};
export type Anamnese = UpdateAnamnesis & { _id: string };
export type Intraoral = UpdateIntraoral & { _id: string };
export type ClinicPatient = NewPatient & Clinic & { anamnese: Anamnese; intraoral: Intraoral; image: string | null };
export type FullPatient = ClinicPatient & { _id: string; createdAt: Date };

export type PartialOdontogram = {
  _id: string;
  workToBeDone: string;
  finished: boolean;
  patient: string;
  doctor: string;
  patient_id: string;
  doctor_id: string;
};
export type ClinicOdontogram = NewOdontogram & Clinic;
export type FullOdontogram = ClinicOdontogram & { _id: string; createdAt: Date };

export type PartialDoctor = {
  _id: string;
  name: string;
  email: string;
  image: string | null;
};

export type PartialFinancial = {
  _id: string;
  workToBeDone: string;
  price: number;
  patient: string;
  doctor: string;
  patient_id: string;
  doctor_id: string;
  odontogram_id: string;
  status: "Pendente" | "Pago" | "Cancelado";
};
export type ClinicFinancial = NewFinancial & Clinic;
export type FullFinancial = ClinicFinancial & { _id: string; createdAt: Date };

export type PartialSchedule = {
  _id: string;
  startTime: string;
  endTime: string | null;
  patient: string;
  doctor: string;
  service: string;
};
export type ClinicSchedule = NewSchedule & Clinic;
export type FullSchedule = ClinicSchedule & { _id: string; createdAt: Date };
