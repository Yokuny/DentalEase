import Link from "next/link";
import { cn } from "@/helpers/cn.util";
import type { Intraoral } from "@/types";

import { TabsContent } from "@/components/ui/tabs";
import { buttonVariants } from "@/components/ui/button";
import IconEditSquare from "../../../../public/EditSquare.Icon";
import IntraoralRender from "./IntraoralRender";

const PatientIntraoral = ({ intraoral, userID }: { intraoral: Intraoral | undefined | null; userID: string }) => {
  const hasIntraoral = (intraoral && intraoral.lastUpdate === undefined) || !intraoral;

  return (
    <TabsContent value="Intraoral" className="border rounded-md">
      <div className="w-full md:gap-6 gap-4 flex-wrap md:p-6 p-2 rounded-md flex">
        <div className="text-skyBlue">Registro de intraoral</div>
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
    </TabsContent>
  );
};

export default PatientIntraoral;
