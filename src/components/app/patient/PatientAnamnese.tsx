import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { Anamnese } from "@/types";

const PatientAnamnese = ({ anamenesis }: { anamenesis: Anamnese | undefined | null }) => {
  return (
    <AccordionItem value="Anamnese">
      <AccordionTrigger className="text-lg text-skyBlue">Anamnese</AccordionTrigger>
      <AccordionContent>
        <div className="w-full md:gap-6 gap-4 flex-wrap p-4 bg-slate-50 dark:bg-slate-900/70 rounded-md flex">
          <pre>{JSON.stringify(anamenesis, null, 2)}</pre>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default PatientAnamnese;
