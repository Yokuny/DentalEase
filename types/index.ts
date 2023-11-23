import { SVGProps, Dispatch, SetStateAction } from "react";
import { ThemeProviderProps } from "next-themes/dist/types";
import { SwitchProps } from "@nextui-org/switch";

export type ChildrenProps = { children: React.ReactNode };
export type ProvidersProps = ChildrenProps & { themeProps?: ThemeProviderProps };
export type Icon = { icon?: boolean };
export type DisabledProps = { disabled: boolean };
export type IconSvgProps = SVGProps<SVGSVGElement> & { size?: number };

export type ThemeSwitchProps = {
  className?: string;
  classNames?: SwitchProps["classNames"];
};

export type ErrorProps = {
  error: Error;
  reset: () => void;
};

export type ContextProps = {
  user: string | null;
  setUser: Dispatch<SetStateAction<string | null>>;
};

export type RegisterInputsProps = {
  nameErr: boolean;
  emailErr: boolean;
  passwordErr: boolean;
  nameValidation: (name: string) => void;
  emailValidation: (email: string) => void;
  passwordValidation: (password: string) => void;
};

export type LoginInputsProps = {
  emailErr: boolean;
  passwordErr: boolean;
  emailValidation: (value: string) => boolean;
  passwordValidation: (value: string) => boolean;
};

export type PatientFormProps = {
  nameErr: boolean;
  emailErr: boolean;
  cpfErr: boolean;
  rgErr: boolean;
  birthdateErr: boolean;
  phoneErr: boolean;
  cepErr: boolean;
  addressErr: boolean;
  nameValidation: (value: string) => boolean;
  emailValidation: (value: string) => boolean;
  cpfValidation: (value: string) => boolean;
  rgValidation: (value: string) => boolean;
  birthdateValidation: (value: string) => boolean;
  phoneValidation: (value: string) => boolean;
  cepValidation: (value: string) => boolean;
  addressValidation: (value: string) => boolean;
};
