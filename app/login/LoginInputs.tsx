import { useState } from "react";
import { Input } from "@nextui-org/input";
import type { LoginInputsProps } from "@/types";

const LoginInputs = ({ emailErr, passwordErr, emailValidation, passwordValidation }: LoginInputsProps) => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  return (
    <>
      <Input
        type="email"
        label="Email"
        value={emailValue || ""}
        onChange={(e) => {
          setEmailValue(e.target.value);
          emailValidation(e.target.value);
        }}
        errorMessage={emailErr && "Email inválido"}
        color={emailErr ? "danger" : "primary"}
        variant="faded"
      />
      <Input
        type="password"
        label="Senha"
        value={passwordValue || ""}
        onChange={(e) => {
          setPasswordValue(e.target.value);
          passwordValidation(e.target.value);
        }}
        errorMessage={passwordErr && "Senha inválida"}
        color={passwordErr ? "danger" : "primary"}
        variant="faded"
      />
    </>
  );
};

export default LoginInputs;
