import React from "react";
import Image from "next/image";
import { cn } from "@/helpers/cn.util";

import { Button, buttonVariants } from "@/components/ui/button";

const Page = () => {
  return (
    <div>
      <div className="flex w-screen max-h-[92lvh] h-full overflow-hidden items-center relative">
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-r from-black">
          <div className="w-full h-full flex justify-evenly bg-black bg-opacity-25 ">
            <div className="w-2/4 text-start gap-10 p-10 flex items-start justify-center flex-col rounded-3xl text-white">
              <h1 className="md:text-6xl text-xl font-semibold tracking-wide whitespace-break-spaces text-balance">
                DentalEase seu parceiro Completo de Gestão
              </h1>
              <p className="md:text-2xl text-white font-light whitespace-break-spaces text-balance">
                Transforme a gestão da sua clínica odontológica: Temos todas as ferramentas que você precisa para sua
                clínica crescer, simplificando cada etapa do processo.
              </p>

              <Button className={cn(buttonVariants({ variant: "default" }), "text-lg px-8 py-5")}>Teste grátis</Button>
            </div>
            <div></div>
          </div>
        </div>
        <Image className="w-full" height={5184} width={3456} alt="banner" src="/pictures/5.jpg" />
      </div>
    </div>
  );
};

export default Page;
