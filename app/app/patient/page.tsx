"use client";

import axios from "axios";
import Cookie from "js-cookie";

import { useState } from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import PatientForm from "./PatientForm";
import bearerToken from "@/utils/bearerToken";
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

export default function Patient() {
  const API = process.env.NEXT_PUBLIC_API;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [rg, setRg] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [phone, setPhone] = useState("");
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState("");

  const [loading, setLoading] = useState(false);

  const [emailErr, setEmailErr] = useState(false);
  const [nameErr, setNameErr] = useState(false);
  const [cpfErr, setCpfErr] = useState(false);
  const [rgErr, setRgErr] = useState(false);
  const [birthdateErr, setBirthdateErr] = useState(false);
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
  const birthdateValidation = (value: string) => {
    if (birthRegex.test(value)) {
      setBirthdateErr(false);
      setBirthdate(value);
      return true;
    } else {
      setBirthdateErr(true);
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
    birthdateErr,
    phoneErr,
    cepErr,
    addressErr,
    nameValidation,
    emailValidation,
    cpfValidation,
    rgValidation,
    birthdateValidation,
    phoneValidation,
    cepValidation,
    addressValidation,
  };

  const handleSubmit = async () => {
    if (!nameValidation(name)) {
    } else if (!emailValidation(email)) {
    } else if (!phoneValidation(phone)) {
    } else if (!cpfValidation(cpf)) {
    } else if (!rgValidation(rg)) {
    } else if (!birthdateValidation(birthdate)) {
    } else if (!cepValidation(cep)) {
    } else if (!addressValidation(address)) {
    } else {
      setLoading(true);
      const data = {
        name,
        email,
        cpf,
        rg,
        sex: "M",
        birthdate,
        phone,
        cep,
        address,
      };
      try {
        const response = await axios.post(`${API}/patient/personaldata`, data, bearerToken);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <section className="flex flex-col items-center gap-3 pb-6 md:py-6 py-2">
      <Card className="max-w-full w-full" radius="none">
        <CardHeader className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500 to-sky-400 hover:saturate-200">
          <h3 className="text-white">Cadastro de paciente</h3>
        </CardHeader>
        <hr className="dark:opacity-10" />
        <CardBody className="w-full">
          <PatientForm allProps={patientFormProps} />
        </CardBody>
        <hr className="dark:opacity-10" />
        <CardFooter className="flex items-center justify-end">
          <Button
            className="p-6 bg-gradient-to-r from-sky-400 to-blue-500 hover:saturate-200"
            onPress={handleSubmit}>
            Cadastrar
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
