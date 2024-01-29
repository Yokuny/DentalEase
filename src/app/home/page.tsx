import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const Page = () => {
  return (
    <div className="flex w-screen max-h-[92lvh] h-full overflow-hidden items-center relative">
      <div className="absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-r from-black">
        <div className="w-full flex justify-evenly">
          <div className="w-2/5 text-start gap-5 p-10 bg-black bg-opacity-5 flex flex-col rounded-3xl text-white">
            <h1 className="md:text-4xl text-xl font-semibold tracking-wide whitespace-break-spaces text-balance">
              Dental Ease seu parceiro Completo de Gestão
            </h1>
            <p className="md:text-2xl text-base font-light whitespace-break-spaces text-balance">
              Transforme a gestão da sua clínica odontológica: Temos todas as ferramentas que você precisa
              para sua clínica crescer, simplificando cada etapa do processo.
            </p>
            <Button className="w-60 bg-white text-black hover:bg-slate-100 md:tracking-wide">
              Teste grátis
            </Button>
          </div>
          <div></div>
        </div>
      </div>
      <Image className="-z-10 w-full" height={5184} width={3456} alt="banner" src="/5.jpg" />
    </div>
  );
};

export default Page;
