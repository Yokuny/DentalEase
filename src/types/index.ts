import type { NewPatient, NewAnamnesis, NewIntraoral } from "./patient.schema";
import type { NewOdontogram } from "./odontogram.schema";
import type { NewService } from "./service.schema";
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

export type PartialPatient = {
  _id: string;
  name: string;
  phone: string;
  email: string;
  sex: "M" | "F";
  anamnese: boolean;
  intraoral: boolean;
};
export type ClinicPatient = NewPatient & Clinic & { anamnese: NewAnamnesis; intraoral: NewIntraoral };
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
  avatar: string | null;
};

export type PartialService = {
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
export type ClinicService = NewService & Clinic;
export type FullService = ClinicService & { _id: string; createdAt: Date };

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
