import type { NewPatient, UpdateAnamnesis, UpdateIntraoral } from "../schemas/patient.schema";
import type { NewOdontogram } from "../schemas/odontogram.schema";
import type { NewFinancial } from "../schemas/financial.schema";
import type { NewSchedule } from "../schemas/schedule.schema";

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

export type Combobox = { value: string; label: string };
export type PatientCombobox = Combobox & { image: string };

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
  image: string | null;
  anamnese: boolean;
  intraoral: boolean;
};
export type Anamnese = UpdateAnamnesis & { _id: string };
export type Intraoral = UpdateIntraoral & { _id: string };
export type ClinicPatient = NewPatient & Clinic & { anamnese: Anamnese; intraoral: Intraoral; image: string | null };
export type FullPatient = ClinicPatient & { _id: string; createdAt: Date };

export type procedure = {
  procedure: string;
  price: number;
  status: "pending" | "paid" | "canceled";
};

export type PartialOdontogram = {
  _id: string;
  procedures: procedure[];
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
  patient: string;
  doctor: string;
  patient_id: string;
  doctor_id: string;
  price: number;
  status: "Pendente" | "Parcial" | "Pago" | "Cancelado";
  date: Date;
};
export type ClinicFinancial = NewFinancial & Clinic;
export type FullFinancial = ClinicFinancial & { _id: string; createdAt: Date } & {
  Patient: {
    _id: string;
    name: string;
    image: string;
    email: string;
    phone: string;
    cpf: string;
    rg: string;
    sex: string;
    birthdate: Date;
  };
  Doctor: { _id: string; name: string; image: string };
  price: number;
};

export type PartialSchedule = {
  _id: string;
  startTime: string;
  endTime: string | null;
  patient: string;
  doctor: string;
  service: procedure[];
};
export type ClinicSchedule = NewSchedule & Clinic;
export type FullSchedule = ClinicSchedule & { _id: string; createdAt: Date };

export type ProcedurePrices = {
  costPrice: number;
  suggestedPrice: number;
  savedPrice: number;
};

export type ProcedureData = {
  procedure: string;
  costPrice: number;
  suggestedPrice: number;
  savedPrice: number;
};

export type ClinicProcedure = ProcedureData & { grouper: string };
export type ProcedureSheet = { groupName: string; procedures: ProcedureData[] };
