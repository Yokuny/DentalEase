import { request, GET } from "@/helpers/fetch.config";
import { comboboxDataFormat } from "@/helpers/formatter.helper";
import type { Patient, Doctor, Odontogram, Service, Schedule } from "@/types";

type Combobox = { value: string; label: string };

// Patient

export const refreshPatient = async () => {
  const res = await request("patient/partial", GET());
  if (res.success !== true) throw new Error(res.message);

  localStorage.setItem("patients", JSON.stringify(res.data));
  return res.data;
};

export const localPatient = async (): Promise<Patient[]> => {
  const patient = localStorage.getItem("patients");
  if (patient) return JSON.parse(patient);

  return refreshPatient();
};

export const comboboxPatient = async (): Promise<Combobox[]> => {
  const patient = await localPatient();
  return comboboxDataFormat(patient);
};

// Odontogram

export const refreshOdontogram = async () => {
  const res = await request("odontogram/partial", GET());
  if (res.success !== true) throw new Error(res.message);

  localStorage.setItem("odontograms", JSON.stringify(res.data));
  return res.data;
};

export const localOdontogram = async (): Promise<Odontogram[]> => {
  const odontogram = localStorage.getItem("odontograms");
  if (odontogram) return JSON.parse(odontogram);

  return refreshOdontogram();
};

type PatientFilter = { patient: string | null };

export const comboboxOdontogram = async ({ patient }: PatientFilter): Promise<Combobox[]> => {
  const odontogram = await localOdontogram();

  if (patient)
    return comboboxDataFormat(odontogram.filter((el: any) => el.patient_id === patient && el.finished === false));
  return comboboxDataFormat(odontogram);
};

// Dentist

export const refreshDenstist = async () => {
  const res = await request("clinic/doctors", GET());
  if (res.success !== true) throw new Error(res.message);

  localStorage.setItem("dentists", JSON.stringify(res.data));
  return res.data;
};

export const localDentist = async (): Promise<Doctor[]> => {
  const dentist = localStorage.getItem("dentists");
  if (dentist) return JSON.parse(dentist);

  return refreshDenstist();
};

export const comboboxDentist = async (): Promise<Combobox[]> => {
  const dentist = await localDentist();
  return comboboxDataFormat(dentist);
};

// Service

export const refreshService = async () => {
  const res = await request("service/partial", GET());
  if (res.success !== true) throw new Error(res.message);

  localStorage.setItem("services", JSON.stringify(res.data));
  return res.data;
};

export const localService = async (): Promise<Service[]> => {
  const service = localStorage.getItem("services");
  if (service) return JSON.parse(service);

  return refreshService();
};

type OnlyActive = { onlyActive: boolean | undefined };

export const comboboxService = async ({ onlyActive }: OnlyActive): Promise<Combobox[]> => {
  const service = await localService();

  if (onlyActive) return comboboxDataFormat(service.filter((el: any) => el.status !== "canceled"));
  return comboboxDataFormat(service);
};

// Schedule

export const refreshSchedule = async () => {
  const res = await request("schedule/partial", GET());
  if (res.success !== true) throw new Error(res.message);

  localStorage.setItem("schedules", JSON.stringify(res.data));
  return res.data;
};

export const localSchedule = async (): Promise<Schedule[]> => {
  const schedule = localStorage.getItem("schedules");
  if (schedule) return JSON.parse(schedule);

  return refreshSchedule();
};