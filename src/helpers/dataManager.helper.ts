import { request, GET } from "@/helpers/fetch.config";

import {
  comboboxDataFormat,
  parseCSV,
  patientComboboxDataFormat,
  procedureSheetDataFormat,
} from "@/helpers/formatter.helper";
import type {
  PartialPatient,
  PartialDoctor,
  PartialOdontogram,
  PartialFinancial,
  PartialSchedule,
  PartialUser,
  PartialClinic,
  ClinicProcedure,
  Combobox,
  PatientCombobox,
  ProcedureSheet,
} from "@/types";

// User

export const refreshUser = async () => {
  const res = await request("user/partial", GET());
  if (!res.success) throw new Error(res.message);

  localStorage.setItem("user", JSON.stringify(res.data));
  return res.data;
};

export const localUser = async (): Promise<PartialUser> => {
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user);

  return refreshUser();
};

// Clinic

export const refreshClinic = async () => {
  const res = await request("clinic", GET());
  if (!res.success) throw new Error(res.message);

  localStorage.setItem("clinic", JSON.stringify(res.data));
  return res.data;
};

export const localClinic = async (): Promise<PartialClinic> => {
  const clinic = localStorage.getItem("clinic");
  if (clinic) return JSON.parse(clinic);

  return refreshClinic();
};

// Patient

export const refreshPatient = async () => {
  const res = await request("patient/partial", GET());
  if (!res.success) throw new Error(res.message);

  localStorage.setItem("patients", JSON.stringify(res.data));
  return res.data;
};

export const localPatient = async (): Promise<PartialPatient[]> => {
  const patient = localStorage.getItem("patients");
  if (patient) return JSON.parse(patient);

  return refreshPatient();
};

export const comboboxPatient = async (): Promise<PatientCombobox[]> => {
  const patient = await localPatient();
  return patientComboboxDataFormat(patient);
};

// Odontogram

export const refreshOdontogram = async () => {
  const res = await request("odontogram/partial", GET());
  if (!res.success) throw new Error(res.message);

  localStorage.setItem("odontograms", JSON.stringify(res.data));
  return res.data;
};

export const localOdontogram = async (): Promise<PartialOdontogram[]> => {
  const odontogram = localStorage.getItem("odontograms");
  if (odontogram) return JSON.parse(odontogram);

  return refreshOdontogram();
};

type PatientFilter = { patient: string | null };

export const comboboxOdontogram = async ({ patient }: PatientFilter): Promise<Combobox[]> => {
  const odontogram = await localOdontogram();
  if (!odontogram.length) return comboboxDataFormat([]);

  if (patient)
    return comboboxDataFormat(odontogram.filter((el: any) => el.patient_id === patient && el.finished === false));
  return comboboxDataFormat(odontogram);
};

// Dentist

export const refreshDenstist = async () => {
  const res = await request("clinic/doctors", GET());
  if (!res.success) throw new Error(res.message);

  localStorage.setItem("dentists", JSON.stringify(res.data));
  return res.data;
};

export const localDentist = async (): Promise<PartialDoctor[]> => {
  const dentist = localStorage.getItem("dentists");
  if (dentist) return JSON.parse(dentist);

  return refreshDenstist();
};

export const comboboxDentist = async (): Promise<Combobox[]> => {
  const dentist = await localDentist();
  return comboboxDataFormat(dentist);
};

// Financial

export const refreshFinancial = async () => {
  const res = await request("financial/partial", GET());
  if (!res.success) throw new Error(res.message);

  localStorage.setItem("financials", JSON.stringify(res.data));
  return res.data;
};

export const localFinancial = async (): Promise<PartialFinancial[]> => {
  const financial = localStorage.getItem("financials");
  if (financial) return JSON.parse(financial);

  return refreshFinancial();
};

type OnlyActive = { onlyActive: boolean | undefined };

export const comboboxFinancial = async ({ onlyActive }: OnlyActive): Promise<Combobox[]> => {
  const financial = await localFinancial();

  if (onlyActive) return comboboxDataFormat(financial.filter((el: any) => el.status !== "canceled"));
  return comboboxDataFormat(financial);
};

// Schedule

export const refreshSchedule = async () => {
  const res = await request("schedule/partial", GET());
  if (!res.success) throw new Error(res.message);

  localStorage.setItem("schedules", JSON.stringify(res.data));
  return res.data;
};

export const localSchedule = async (): Promise<PartialSchedule[]> => {
  const schedule = localStorage.getItem("schedules");
  if (schedule) return JSON.parse(schedule);

  return refreshSchedule();
};

// Procedure

export const refreshProcedure = async () => {
  const res = await request("procedure", GET());
  if (!res.success) throw new Error(res.message);

  localStorage.setItem("procedures", res.data.procedure);
  return parseCSV(res.data.procedure);
};

export const localProcedure = async (): Promise<ClinicProcedure[]> => {
  const procedure = localStorage.getItem("procedures");
  if (procedure) return parseCSV(procedure);

  return refreshProcedure();
};

export const sheetProcedure = async (): Promise<ProcedureSheet[]> => {
  const procedure = await localProcedure();
  return procedureSheetDataFormat(procedure);
};