const padStart = (value: number) => String(value).padStart(2, "0");

export const numClean = (value: string) => value.replace(/[^0-9]/g, "");

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

export const stringToDate = (data: string | Date) => new Date(data);

export const extractData = (data: Date, format: string) => {
  const date = new Date(data);

  const hour = padStart(date.getHours());
  const minute = padStart(date.getMinutes());
  const second = padStart(date.getSeconds());
  const day = padStart(date.getDate());
  const month = padStart(date.getMonth() + 1);

  const dayAndMonth = `${day}/${month}`;
  const hourAndMinute = `${hour}:${minute}`;

  switch (format) {
    case "hour":
      return `${hourAndMinute}`;
    case "full":
      return `${dayAndMonth}/${date.getFullYear()} ${hourAndMinute}:${second}`;
    default:
      return `${dayAndMonth} ${hourAndMinute}`;
  }
};
