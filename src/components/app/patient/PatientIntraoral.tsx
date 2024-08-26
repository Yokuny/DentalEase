import Link from "next/link";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/helpers/cn.util";
import { buttonVariants } from "@/components/ui/button";
import type { Intraoral } from "@/types";

import IconEditSquare from "../../../../public/EditSquare.Icon";
import IntraoralRender from "./IntraoralRender";

const PatientIntraoral = ({ intraoral, userID }: { intraoral: Intraoral | undefined | null; userID: string }) => {
  const hasIntraoral = (intraoral && intraoral.lastUpdate === undefined) || !intraoral;

  return (
    <AccordionItem value="Intraoral">
      <AccordionTrigger className="text-lg text-skyBlue">Registro de intraoral</AccordionTrigger>
      <AccordionContent>
        <div className="w-full md:gap-6 gap-4 flex-wrap p-4 bg-slate-50 dark:bg-slate-900/70 rounded-md flex">
          {hasIntraoral ? (
            <Link
              href={`/app/patient/${userID}?interface=intraoral`}
              className={"w-full gap-4 justify-center items-center flex"}>
              <div className="text-sm">Não há intraoral cadastrado</div>
              <div
                className={cn(buttonVariants({ variant: "primary" }), "gap-2  border-slate-300 dark:border-slate-600")}>
                <IconEditSquare className="w-6 h-6" />
                <p className="text-sm">Cadastrar</p>
              </div>
            </Link>
          ) : (
            <IntraoralRender intraoral={intraoral} />
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default PatientIntraoral;
