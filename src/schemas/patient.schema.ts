import { z } from "zod";
import { validObjectID, numClean, birthRegExp } from "../helpers";
import { lengthMessage, mailMessage, objectIdMessage } from "../helpers/zodMessage.helper";

export const patientSchema = z.object({
  name: z.string().trim().min(5, lengthMessage(5, 30)).max(30, lengthMessage(5, 30)),
  email: z.string().trim().email(mailMessage()).min(5, lengthMessage(5, 50)).max(50, lengthMessage(5, 50)),
  cpf: z.string().trim().min(11, lengthMessage(11, 11)).max(11, lengthMessage(11, 11)).transform(numClean),
  rg: z.string().trim().min(7, lengthMessage(7, 7)).max(7, lengthMessage(7, 7)).transform(numClean),
  birthdate: z.string().trim().regex(birthRegExp),
  sex: z.enum(["M", "F"]),
  phone: z.string().trim().min(11, lengthMessage(11, 11)).max(11, lengthMessage(11, 11)).transform(numClean),
  cep: z.string().trim().min(8, lengthMessage(8, 8)).max(8, lengthMessage(8, 8)).transform(numClean),
  address: z.string().trim().min(5, lengthMessage(5, 50)).max(50, lengthMessage(5, 50)),
});

export const anamnesisSchema = z.object({
  Patient: z.string().refine(validObjectID, objectIdMessage()),
  mainComplaint: z.string().trim().max(250, lengthMessage(0, 250)),
  gumsBleedEasily: z.enum(["true", "false"]),
  sensitiveTeeth: z.enum(["true", "false"]),
  allergicToMedication: z.enum(["true", "false"]),
  medicationAllergy: z.string().trim().max(120, lengthMessage(0, 120)),
  bitesPenOrPencil: z.enum(["true", "false"]),
  nailsBiting: z.enum(["true", "false"]),
  otherHarmfulHabits: z.string().trim().max(120, lengthMessage(0, 120)),
  pregnant: z.enum(["true", "false"]),
  pregnancyMonth: z.number().max(10).min(0),
  breastfeeding: z.enum(["true", "false"]),
  underMedicalTreatment: z.enum(["true", "false"]),
  medicalTreatmentDetails: z.string().trim().max(120, lengthMessage(0, 120)),
  takingMedication: z.enum(["true", "false"]),
  medicationDetails: z.string().trim().max(120, lengthMessage(0, 120)),
  infectiousDisease: z.string().trim().max(120, lengthMessage(0, 120)),
  smoker: z.enum(["true", "false"]),
  alcoholConsumer: z.enum(["true", "false"]),
  illnesses: z.object({
    diabetes: z.enum(["true", "false"]).default("false"),
    tuberculosis: z.enum(["true", "false"]).default("false"),
    heartProblems: z.enum(["true", "false"]).default("false"),
    arthritis: z.enum(["true", "false"]).default("false"),
    asthma: z.enum(["true", "false"]).default("false"),
    highBloodPressure: z.enum(["true", "false"]).default("false"),
    kidneyProblems: z.enum(["true", "false"]).default("false"),
    liverProblems: z.enum(["true", "false"]).default("false"),
    otherIllnesses: z.string().trim().max(120, lengthMessage(0, 120)).default(""),
  }),
  importantHealthInformation: z.string().trim().max(250, lengthMessage(0, 250)),
});

export const intraoralSchema = z.object({
  Patient: z.string().refine(validObjectID, objectIdMessage()),
  hygiene: z.enum(["normal", "regular", "deficiente"]),
  halitosis: z.enum(["ausente", "moderada", "forte"]),
  tartar: z.enum(["ausente", "pouco", "muito"]),
  gums: z.enum(["normal", "gengivite", "periodontite"]),
  mucosa: z.enum(["normal", "alterada"]),
  tongue: z.string().trim().max(120, lengthMessage(0, 120)),
  palate: z.string().trim().max(120, lengthMessage(0, 120)),
  oralFloor: z.string().trim().max(120, lengthMessage(0, 120)),
  lips: z.string().trim().max(120, lengthMessage(0, 120)),
  otherObservations: z.string().trim().max(250, lengthMessage(0, 250)),
});

export type NewPatient = z.infer<typeof patientSchema>;
export type NewAnamnesis = z.infer<typeof anamnesisSchema>;
export type NewIntraoral = z.infer<typeof intraoralSchema>;
export type UpdateAnamnesis = z.infer<typeof anamnesisSchema> & { lastUpdate: Date | string };
export type UpdateIntraoral = z.infer<typeof intraoralSchema> & { lastUpdate: Date | string };