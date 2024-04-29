import { request, GET } from "@/helpers/fetch.config";
import { comboboxDataFormat } from "@/helpers/formatter.helper";

// Patient

export const refreshPatient = async () => {
  const res = await request("patient/partial", GET());
  if (res.success === false) throw new Error(res.message);

  localStorage.setItem("patients", JSON.stringify(res.data));

  return res.data;
};

export const localPatient = async () => {
  const patient = localStorage.getItem("patients");
  if (patient) return JSON.parse(patient);

  return refreshPatient();
};

export const comboboxPatient = async () => {
  const patient = await localPatient();
  return comboboxDataFormat(patient);
};

// Odontogram

export const refreshOdontogram = async () => {
  const res = await request("odontogram/partial", GET());
  if (res.success === false) throw new Error(res.message);

  localStorage.setItem("odontograms", JSON.stringify(res.data));

  return res.data;
};

export const localOdontogram = async () => {
  const odontogram = localStorage.getItem("odontograms");
  if (odontogram) return JSON.parse(odontogram);

  return refreshOdontogram();
};

export const comboboxOdontogram = async () => {
  const odontogram = await localOdontogram();
  return comboboxDataFormat(odontogram);
};

// Dentist

export const refreshDenstist = async () => {
  const res = await request("clinic/doctors", GET());
  if (res.success === false) throw new Error(res.message);

  localStorage.setItem("dentists", JSON.stringify(res.data));

  return res.data;
};

export const localDentist = async () => {
  const dentist = localStorage.getItem("dentists");
  if (dentist) return JSON.parse(dentist);

  return refreshDenstist();
};

export const comboboxDentist = async () => {
  const dentist = await localDentist();
  return comboboxDataFormat(dentist);
};

// Service

export const refreshService = async () => {
  const res = await request("service/partial", GET());
  if (res.success === false) throw new Error(res.message);

  localStorage.setItem("services", JSON.stringify(res.data));

  return res.data;
};

export const localService = async () => {
  const service = localStorage.getItem("services");
  if (service) return JSON.parse(service);

  return refreshService();
};

export const comboboxService = async () => {
  const service = await localService();
  return comboboxDataFormat(service);
};
