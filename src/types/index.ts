export type ToastProps = {
  toast: (title: string, message: string) => void;
};

export type ErrorProps = {
  error: Error;
  reset: () => void;
};

export type Patient = {
  _id: string;
  name: string;
  phone: string;
  email: string;
  sex: "M" | "F";
  anamnese: boolean;
  intraoral: boolean;
};

export type Odontogram = {
  _id: string;
  workToBeDone: string;
  finished: boolean;
  patient: string;
  doctor: string;
  patient_id: string;
  doctor_id: string;
};

export type Service = {
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