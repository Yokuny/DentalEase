"use client";

import { Input } from "@nextui-org/input";
import { RadioGroup, Radio } from "@nextui-org/radio";

import { useState } from "react";
import type { PatientFormProps } from "@/types";

const PatientForm = ({ allProps }: { allProps: PatientFormProps }) => {
  const [nameValue, setNameValue] = useState("");
  const [sex, setSex] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [cpfValue, setCpfValue] = useState("");
  const [rgValue, setRgValue] = useState("");
  const [birthdateValue, setBirthdateValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [cepValue, setCepValue] = useState("");
  const [addressValue, setAddressValue] = useState("");

  return (
    <div className="flex flex-wrap">
      <Input
        type="text"
        label="Nome"
        onChange={(e) => {
          setNameValue(e.target.value);
          allProps.nameValidation(e.target.value);
        }}
        errorMessage={allProps.nameErr && "Nome inválido"}
        color={allProps.nameErr ? "danger" : "primary"}
        value={nameValue || ""}
        className="max-w-[300px] h-20 mr-4"
        radius="sm"
        size="sm"
        variant="faded"
      />

      <Input
        type="email"
        label="Email"
        value={emailValue || ""}
        onChange={(e) => {
          setEmailValue(e.target.value);
          allProps.emailValidation(e.target.value);
        }}
        errorMessage={allProps.emailErr && "Email inválido"}
        color={allProps.emailErr ? "danger" : "primary"}
        variant="faded"
        className="max-w-[280px] h-20 mr-4"
        radius="sm"
        size="sm"
      />

      <Input
        type="number"
        label="Telefone"
        value={phoneValue || ""}
        onChange={(e) => {
          setPhoneValue(e.target.value);
          allProps.phoneValidation(e.target.value);
        }}
        errorMessage={allProps.phoneErr && "Telefone inválido"}
        color={allProps.phoneErr ? "danger" : "primary"}
        variant="faded"
        className="max-w-[170px] h-20 mr-4"
        radius="sm"
        size="sm"
      />
      <Input
        type="number"
        label="CPF"
        value={cpfValue || ""}
        onChange={(e) => {
          setCpfValue(e.target.value);
          allProps.cpfValidation(e.target.value);
        }}
        errorMessage={allProps.cpfErr && "CPF inválido"}
        color={allProps.cpfErr ? "danger" : "primary"}
        variant="faded"
        className="max-w-[260px] md:w-1/4 h-20 mr-4"
        radius="sm"
        size="sm"
      />

      <Input
        type="number"
        label="RG"
        value={rgValue || ""}
        onChange={(e) => {
          setRgValue(e.target.value);
          allProps.rgValidation(e.target.value);
        }}
        errorMessage={allProps.rgErr && "RG inválido"}
        color={allProps.rgErr ? "danger" : "primary"}
        variant="faded"
        className="max-w-[180px] h-20 mr-4"
        radius="sm"
        size="sm"
      />

      <RadioGroup label="Sexo" className="flex gap-0 h-20 mr-4" orientation="horizontal">
        <Radio value="M">Masculino</Radio>
        <Radio value="F">Feminino</Radio>
      </RadioGroup>

      <Input
        type="date"
        label="Data de nascimento"
        value={birthdateValue || ""}
        placeholder="dd/mm/aaaa"
        onChange={(e) => {
          setBirthdateValue(e.target.value);
          allProps.birthdateValidation(e.target.value);
        }}
        errorMessage={allProps.birthdateErr && "Data inválida"}
        color={allProps.birthdateErr ? "danger" : "primary"}
        variant="faded"
        className="max-w-[190px] h-20 mr-4"
        radius="sm"
        size="sm"
      />

      <Input
        type="number"
        label="CEP"
        value={cepValue || ""}
        onChange={(e) => {
          setCepValue(e.target.value);
          allProps.cepValidation(e.target.value);
        }}
        errorMessage={allProps.cepErr && "CEP inválido"}
        color={allProps.cepErr ? "danger" : "primary"}
        variant="faded"
        className="max-w-[140px] h-20 mr-4"
        radius="sm"
        size="sm"
      />

      <Input
        type="text"
        label="Endereço"
        value={addressValue || ""}
        onChange={(e) => {
          setAddressValue(e.target.value);
          allProps.addressValidation(e.target.value);
        }}
        errorMessage={allProps.addressErr && "Endereço inválido"}
        color={allProps.addressErr ? "danger" : "primary"}
        variant="faded"
        className="max-w-[400px] h-20 mr-4"
        radius="sm"
        size="sm"
      />
    </div>
  );
};

export default PatientForm;
