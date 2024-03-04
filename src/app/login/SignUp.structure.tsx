import Link from "next/link";
import type { ProfileFormProps } from "@/types";

import { UserAuthForm } from "@/components/login/Login";

const SignUp = ({ toast }: ProfileFormProps) => {
  return (
    <div className="mx-auto mt-60 space-y-6 sm:w-[350px] w-full flex flex-col justify-center items-center">
      <div className="mb-6 flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Criar conta</h1>
        <p className="text-sm text-muted-foreground">Insira seu e-mail abaixo para se cadastrar.</p>
      </div>
      <UserAuthForm className="w-full" />
      <p className="px-8 text-center text-sm text-muted-foreground sm:w-[450px]">
        Ao clicar em continuar, você está concordando com nossos{" "}
        <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
          Termos de serviço
        </Link>{" "}
        e{" "}
        <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
          Politica de privacidade
        </Link>
        .
      </p>
    </div>
  );
};

export default SignUp;
