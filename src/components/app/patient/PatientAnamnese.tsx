import Link from "next/link";
import { cn } from "@/helpers/cn.util";
import type { Anamnese } from "@/types";

import { TabsContent } from "@/components/ui/tabs";
import { buttonVariants } from "@/components/ui/button";
import IconEditSquare from "../../../../public/EditSquare.Icon";
import AnamneseRender from "./AnamneseRender";

const PatientAnamnese = ({ anamenesis, userID }: { anamenesis: Anamnese | undefined | null; userID: string }) => {
  const hasAnamnese = (anamenesis && anamenesis.lastUpdate === undefined) || !anamenesis;

  return (
    <TabsContent value="Anamnesis" className="border rounded-md">
      <div className="w-full md:gap-6 gap-4 flex-wrap md:p-6 p-2 rounded-md flex">
        <div className="text-skyBlue">Registro de Anamnese</div>
        {hasAnamnese ? (
          <Link
            href={`/app/patient/${userID}?interface=anamnesis`}
            className={"w-full gap-4 justify-center items-center flex"}>
            <div className="text-sm">Não há anamnese cadastrada</div>
            <div
              className={cn(buttonVariants({ variant: "primary" }), "gap-2  border-slate-300 dark:border-slate-600")}>
              <IconEditSquare className="w-6 h-6" />
              <p className="text-sm">Cadastrar</p>
            </div>
          </Link>
        ) : (
          <AnamneseRender anamnese={anamenesis} />
        )}
      </div>
    </TabsContent>
  );
};

export default PatientAnamnese;
