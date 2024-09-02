import { request, GET } from "@/helpers/fetch.config";
import type { FullPatient, FullService, FullSchedule, FullOdontogram } from "@/types";

// Patient

export const requestPatient = async (id: string) => {
  const res = await request(`patient?id=${id}`, GET());
  if (res.success !== true) throw new Error(res.message);

  return res.data as FullPatient;
};

// Odontogram

export const requestOdontogram = async (id: string) => {
  const res = await request(`odontogram?id=${id}`, GET());
  if (res.success !== true) throw new Error(res.message);

  return res.data as FullOdontogram;
};

// Service

export const requestService = async (id: string) => {
  const res = await request(`service?id=${id}`, GET());
  if (res.success !== true) throw new Error(res.message);

  return res.data as FullService;
};

// Schedule

export const requestSchedule = async (id: string) => {
  const res = await request(`schedule?id=${id}`, GET());
  if (res.success !== true) throw new Error(res.message);

  return res.data as FullSchedule;
};
