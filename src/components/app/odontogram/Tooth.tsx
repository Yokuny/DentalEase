import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import TeethParts from "../../../../public/odontogram/teeth_parts";
import ToothNumber from "./ToothNumber";

const Tooth = ({ toothNumber, bottom, controller }: { toothNumber: number; bottom: boolean; controller: any }) => {
  return (
    <div className={`h-auto gap-2 justify-end items-center flex ${bottom ? "flex-col-reverse" : "flex-col"}`}>
      <ToothNumber toothNumber={toothNumber} />
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={"blank"} className="w-10">
            <TeethParts className="text-stone-500/70 dark:text-zinc-300/80" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className=" w-auto gap-2 flex-col flex">
          <div className="space-y-2">
            <p className="font-medium leading-none">{toothNumber}</p>
            <h4 className="text-sm leading-none text-muted-foreground">Face do dente:</h4>
          </div>
          <Button variant={"primary"} className="text-xs h-6">
            Mesial
          </Button>
          <Button variant={"primary"} className="text-xs h-6">
            Oclusal
          </Button>
          <Button variant={"primary"} className="text-xs h-6">
            Distal
          </Button>
          <Button variant={"primary"} className="text-xs h-6">
            Lingual
          </Button>
          <Button variant={"primary"} className="text-xs h-6">
            Vestibular
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Tooth;
