export type ToastProps = {
  toast: (title: string, message: string) => void;
};

export type ErrorProps = {
  error: Error;
  reset: () => void;
};

export type Patient = {
  id: string;
  name: string;
  phone: string;
  email: string;
  sex: "M" | "F";
  anamnese: boolean;
  intraoral: boolean;
};
