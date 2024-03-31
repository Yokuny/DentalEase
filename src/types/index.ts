export type ProfileFormProps = {
  toast: (title: string, message: string) => void;
};

export type ErrorProps = {
  error: Error;
  reset: () => void;
};