"use client";

import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import PatientForm from "./PatientForm";
import { useState } from "react";
import {
  emailRegex,
  titleRegex,
  cepRegex,
  cpfRegex,
  birthRegex,
  addressRegex,
  rgRegex,
  sexRegex,
  telRegex,
} from "@/utils/regex";
import { Button } from "@nextui-org/button";

export default function Patient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [rg, setRg] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState("");

  const [emailErr, setEmailErr] = useState(false);
  const [nameErr, setNameErr] = useState(false);
  const [cpfErr, setCpfErr] = useState(false);
  const [rgErr, setRgErr] = useState(false);
  const [birthDateErr, setBirthDateErr] = useState(false);
  const [phoneErr, setPhoneErr] = useState(false);
  const [cepErr, setCepErr] = useState(false);
  const [addressErr, setAddressErr] = useState(false);

  // data validation
  const emailValidation = (value: string) => {
    if (emailRegex.test(value)) {
      setEmail(value);
      setEmailErr(false);
      return true;
    } else {
      setEmailErr(true);
      return false;
    }
  };
  const nameValidation = (value: string) => {
    if (titleRegex.test(value)) {
      setNameErr(false);
      setName(value);
      return true;
    } else {
      setNameErr(true);
      return false;
    }
  };
  const cpfValidation = (value: string) => {
    if (cpfRegex.test(value)) {
      setCpfErr(false);
      setCpf(value);
      return true;
    } else {
      setCpfErr(true);
      return false;
    }
  };
  const rgValidation = (value: string) => {
    if (rgRegex.test(value)) {
      setRgErr(false);
      setRg(value);
      return true;
    } else {
      setRgErr(true);
      return false;
    }
  };
  const birthDateValidation = (value: string) => {
    if (birthRegex.test(value)) {
      setBirthDateErr(false);
      setBirthDate(value);
      return true;
    } else {
      setBirthDateErr(true);
      return false;
    }
  };
  const phoneValidation = (value: string) => {
    if (telRegex.test(value)) {
      setPhoneErr(false);
      setPhone(value);
      return true;
    } else {
      setPhoneErr(true);
      return false;
    }
  };
  const cepValidation = (value: string) => {
    if (cepRegex.test(value)) {
      setCepErr(false);
      setCep(value);
      return true;
    } else {
      setCepErr(true);
      return false;
    }
  };
  const addressValidation = (value: string) => {
    if (addressRegex.test(value)) {
      setAddressErr(false);
      setAddress(value);
      return true;
    } else {
      setAddressErr(true);
      return false;
    }
  };

  const patientFormProps = {
    nameErr,
    emailErr,
    cpfErr,
    rgErr,
    birthDateErr,
    phoneErr,
    cepErr,
    addressErr,
    nameValidation,
    emailValidation,
    cpfValidation,
    rgValidation,
    birthDateValidation,
    phoneValidation,
    cepValidation,
    addressValidation,
  };

  return (
    <section className="flex flex-col items-center gap-3 pb-6 md:py-6 py-2">
      <Card className="max-w-full w-full" radius="none">
        <CardHeader className="flex items-center justify-between">
          <h3>Cadastro de paciente</h3>
        </CardHeader>
        <hr className="opacity-10" />
        <CardBody className="w-full">
          <PatientForm allProps={patientFormProps} />
        </CardBody>
        <CardFooter className="flex items-center justify-end">
          <Button className="btn btn-primary">Cadastrar</Button>
        </CardFooter>
      </Card>
    </section>
  );
}
