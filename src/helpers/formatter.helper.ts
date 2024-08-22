import type { PartialPatient, PartialDoctor, PartialOdontogram, PartialService } from "@/types";

type Register = PartialPatient | PartialDoctor | PartialOdontogram | PartialService;

const padStart = (value: number) => String(value).padStart(2, "0");
export const numClean = (value: string) => value.replace(/[^0-9]/g, "");
const valueAndLabel = (value: string, label: string) => ({ value, label });

export const comboboxDataFormat = (register: Register[]): { value: string; label: string }[] => {
  if (register.length === 0) return [{ value: "", label: "Nenhum registro encontrado" }];

  return register.map((data) => {
    if ("name" in data) return valueAndLabel(data._id, data.name);
    if ("patient" in data) return valueAndLabel(data._id, data.patient);
    return valueAndLabel("", "Erro ao carregar dados");
  });
};

export const formatCpfCnpj = (value: string) => {
  const num = numClean(value);

  const cpfCheck = num.length === 11;
  const cnpjCheck = num.length === 14;

  function cpf(num: string) {
    return `${num.slice(0, 3)}.${num.slice(3, 6)}.${num.slice(6, 9)}-${num.slice(9)}`;
  }

  function cnpj(num: string) {
    return `${num.slice(0, 2)}.${num.slice(2, 5)}.${num.slice(5, 8)}/${num.slice(8, 12)}-${num.slice(12)}`;
  }

  if (cpfCheck) return cpf(num);
  if (cnpjCheck) return cnpj(num);

  return num;
};

export const formatPhone = (value: string | undefined | null) => {
  if (!value) return "";
  const num = numClean(value);

  if (num.length === 11) return `(${num.slice(0, 2)}) ${num.slice(2, 7)}-${num.slice(7)}`;
  return `(${num.slice(0, 2)}) ${num.slice(2, 6)}-${num.slice(6)}`;
};

export const stringToDate = (data: Date | string) => new Date(data);

export const extractData = (data: Date | string | undefined | null, format: string) => {
  if (!data) return "";
  const date = new Date(data);

  const hour = padStart(date.getHours());
  const minute = padStart(date.getMinutes());
  const second = padStart(date.getSeconds());
  const day = padStart(date.getDate());
  const month = padStart(date.getMonth() + 1);

  const dayAndMonth = `${day} ${month}`;
  const hourAndMinute = `${hour}:${minute}`;

  switch (format) {
    case "hour":
      return `${hourAndMinute}`;
    case "full":
      return `${dayAndMonth} ${date.getFullYear()} ${hourAndMinute}:${second}`;
    default:
      return `${dayAndMonth} ${date.getFullYear()}`;
  }
};
