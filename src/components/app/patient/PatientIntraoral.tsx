import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { Intraoral } from "@/types";

const PatientIntraoral = ({ intraoral }: { intraoral: Intraoral | undefined | null }) => {
  return (
    <AccordionItem value="Intraoral">
      <AccordionTrigger className="text-lg text-skyBlue">Intraoral</AccordionTrigger>
      <AccordionContent>
        <div className="w-full md:gap-6 gap-4 flex-wrap p-4 bg-slate-50 dark:bg-slate-900/70 rounded-md flex">
          <pre>{JSON.stringify(intraoral, null, 2)}</pre>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default PatientIntraoral;
