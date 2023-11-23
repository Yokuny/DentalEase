"use client";
import Cookie from "js-cookie";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { emailRegex, passwordRegex, titleRegex } from "@/utils/regex";

import { Card, CardBody } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Spinner } from "@nextui-org/spinner";
import { Link } from "@nextui-org/link";
import { Tab, Tabs } from "@nextui-org/tabs";
import LoginInputs from "./LoginInputs";
import RegisterInputs from "./RegisterInputs";

const LoginLogout = () => {
  const router = useRouter();
  const API = process.env.NEXT_PUBLIC_API;

  const [selected, setSelected] = useState("Entrar");
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [nameErr, setNameErr] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // data validation
  const emailValidation = (value: string) => {
    if (emailRegex.test(value)) {
      setEmail(value);
      setEmailError(false);
      return true;
    } else {
      setEmailError(true);
      return false;
    }
  };
  const passwordValidation = (value: string) => {
    if (passwordRegex.test(value)) {
      setPassword(value);
      setPasswordError(false);
      return true;
    } else {
      setPasswordError(true);
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
  // clean fields
  const cleanFields = () => {
    setName("");
    setEmail("");
    setPassword("");
    setNameErr(false);
    setEmailError(false);
    setPasswordError(false);
  };
  // login and signup
  const handleSignin = async () => {
    if (!emailValidation(email)) {
    } else if (!passwordValidation(password)) {
    } else {
      setLoading(true);
      try {
        const res = await axios.post(`${API}/user/signin`, { email, password });
        cleanFields();
        Cookie.set("auth_token", res.data.token);
        router.push("/app");
      } catch (err) {
        setEmailError(true);
        setPasswordError(true);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSignup = async () => {
    if (!nameValidation(name)) {
    } else if (!emailValidation(email)) {
    } else if (!passwordValidation(password)) {
    } else {
      setLoading(true);
      try {
        const response = await axios.post(`${API}/user/signup`, { username: name, email, password });
        cleanFields();
        if (response.status === 201) setSelected("Entrar");
      } catch (err: any) {
        cleanFields();
        if (err.response.status === 409) {
          setEmailError(true);
        } else {
          setNameErr(true);
          setEmailError(true);
        }
      } finally {
        setLoading(false);
      }
    }
  };
  // tab selection
  const handleTabSelectionChange = (key: string | number) => {
    setSelected(key as string);
  };

  return (
    <Card className="max-w-full w-[340px]" radius="sm">
      <CardBody className="overflow-hidden">
        <Tabs
          selectedKey={selected}
          onSelectionChange={handleTabSelectionChange}
          fullWidth
          aria-label="Tabs form"
          size="md">
          <Tab key="Entrar" title="Entrar">
            <form className="flex flex-col gap-4">
              <LoginInputs
                emailErr={emailError}
                passwordErr={passwordError}
                emailValidation={emailValidation}
                passwordValidation={passwordValidation}
              />
              <p className="text-center text-small">
                Precisar criar conta?{" "}
                <Link size="sm" className="cursor-pointer" onPress={() => setSelected("Registre")}>
                  Cadastrar
                </Link>
              </p>
              <div className="flex gap-2 justify-end">
                <Button fullWidth color="primary" onClick={handleSignin}>
                  {loading ? <Spinner size="sm" color="default" /> : "Entrar"}
                </Button>
              </div>
            </form>
          </Tab>
          <Tab key="Registre" title="Registrar">
            <form className="flex flex-col gap-4">
              <RegisterInputs
                nameErr={nameErr}
                emailErr={emailError}
                passwordErr={passwordError}
                nameValidation={nameValidation}
                emailValidation={emailValidation}
                passwordValidation={passwordValidation}
              />
              <p className="text-center text-small">
                Já possui conta?{" "}
                <Link size="sm" className="cursor-pointer" onPress={() => setSelected("Entrar")}>
                  Entrar
                </Link>
              </p>
              <div className="flex gap-2 justify-end">
                <Button fullWidth color="primary" onClick={handleSignup}>
                  {loading ? <Spinner size="sm" color="default" /> : "Registre"}
                </Button>
              </div>
            </form>
          </Tab>
        </Tabs>
      </CardBody>
    </Card>
  );
};

export default LoginLogout;
