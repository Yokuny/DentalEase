import type {
  PartialPatient,
  PartialDoctor,
  PartialOdontogram,
  PartialFinancial,
  Combobox,
  PatientCombobox,
  ClinicProcedure,
  ProcedureData,
  ProcedureSheet,
} from "@/types";

type Register = PartialDoctor | PartialOdontogram | PartialFinancial;

const padStart = (value: number) => String(value).padStart(2, "0");
export const numClean = (value: string) => value.replace(/[^0-9]/g, "");
const valueAndLabel = (value: string, label: string) => ({ value, label });

export const capitalizeString = (str: string) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const comboboxDataFormat = (register: Register[]): Combobox[] => {
  if (!register.length) return [{ value: "", label: "Nenhum registro encontrado" }];

  return register.map((data) => {
    if ("name" in data) return valueAndLabel(data._id, data.name);
    if ("patient" in data) return valueAndLabel(data._id, data.patient);
    return valueAndLabel("", "Erro ao carregar dados");
  });
};

export const procedureSheetDataFormat = (register: ClinicProcedure[]): ProcedureSheet[] => {
  if (!register.length)
    return [{ groupName: "", procedures: [{ procedure: "", costPrice: 0, savedPrice: 0, suggestedPrice: 0 }] }];

  const grouper = register.reduce((acc, data) => {
    if (!acc[data.grouper]) acc[data.grouper] = [];
    acc[data.grouper].push(data);
    return acc;
  }, {} as { [key: string]: ClinicProcedure[] });

  return Object.entries(grouper).map(([groupName, procedures]) => ({ groupName, procedures }));
};

export const patientComboboxDataFormat = (register: PartialPatient[]): PatientCombobox[] => {
  if (!register.length) return [{ value: "", label: "Nenhum registro encontrado", image: "" }];
  return register.map((data) => ({ value: data._id, label: data.name, image: data.image || "" }));
};

export const formatCpfCnpj = (value: string | undefined | null) => {
  if (!value) return "";
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

export const stringPriceClean = (value: string | number): number => {
  if (typeof value === "number") {
    if (value > 0) return value;
    throw new Error("Valor deve ser maior que 0");
  }

  if (typeof value === "string") {
    const sanitized = value.replace(/[^\d.]/g, "");
    const parts = sanitized.split(".");
    const cleaned = parts.length > 2 ? parts[0] + "." + parts.slice(1).join("") : sanitized;
    const parsed = parseFloat(cleaned);
    if (!parsed || parsed <= 0) {
      throw new Error("Erro no valor informado ou valor não pode ser 0");
    }
    return parsed;
  }

  throw new Error("Tipo de valor não suportado");
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

export const parseCSV = (csv: string): ClinicProcedure[] => {
  const getRows = (csv: string) => {
    const [header, ...rows] = csv.split("\\n");
    if (rows.length <= 1) {
      const [header, ...rows] = csv.split("\n");
      return rows;
    }
    return rows;
  };

  const rows = getRows(csv);
  return rows.map((row) => {
    const [procedimento, agrupador, precoCusto, precoSugerido, precoSalvo] = row
      .split(",") // ou .split(";")
      .map((val) => val.replace(/"/g, ""));
    return {
      procedure: procedimento,
      grouper: agrupador,
      costPrice: parseFloat(precoCusto),
      suggestedPrice: parseFloat(precoSugerido),
      savedPrice: parseFloat(precoSalvo),
    } as ClinicProcedure;
  });
};
