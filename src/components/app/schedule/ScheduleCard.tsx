import { cn } from "@/helpers/cn.util";
import CalenderEdit from "../../../../public/CalenderEdit.Icon";
import IconClock from "../../../../public/Clock.Icon";

import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

type Financial = {
  _id: string;
  patient: string;
  doctor: string;
  price: number;
  procedures: string;
  status: "Cancelado" | "Pago" | "Pendente";
};

type ScheduleCardProps = {
  financial: Financial;
  startDate: Date;
};

const ScheduleCard = ({ financial, startDate }: ScheduleCardProps) => {
  const NoContent = (width: number) => {
    return <div className={`h-4 w-${width}  bg-slate-50 dark:bg-slate-900 rounded`}> </div>;
  };

  return (
    <div
      className={cn(
        buttonVariants({ variant: "link" }),
        "p-5 w-full min-h-[300px] h-auto hover:no-underline gap-2 border flex-col justify-start items-start flex"
      )}>
      <div className="gap-6 flex-wrap flex">
        <div className="flex-col flex gap-1">
          <span className="font-semibold text-lg">Paciente</span>
          <span>{financial?.patient ? <Badge>{financial.patient}</Badge> : NoContent(32)}</span>
        </div>
        <div className="flex-col flex gap-1">
          <span className="font-semibold text-lg">Doutor</span>
          <span>{financial?.doctor ? <Badge variant={"positive"}>{financial.doctor}</Badge> : NoContent(32)}</span>
        </div>
      </div>
      <Separator className="my-2" />
      <div className="gap-6 flex-wrap flex">
        <div className="items-center flex gap-3">
          <CalenderEdit className="h-6 w-6" />
          <span>{startDate ? startDate.toLocaleDateString().split("/").join(" ") : NoContent(12)}</span>
        </div>
        <div className="items-center flex gap-3">
          <IconClock className="h-6 w-6" />
          <span>{startDate ? startDate.toLocaleTimeString().split(":", 2).join(":") : NoContent(12)}</span>
        </div>
      </div>
      <Separator className="my-2" />
      <div className="gap-6 flex-wrap flex">
        <div className="flex-col flex gap-1">
          <span className="font-semibold text-lg">Serviço</span>
          <span>{financial?.procedures ? financial.procedures : NoContent(36)}</span>
        </div>
        <div className="flex-col flex gap-1">
          <span className="font-semibold text-lg">R$</span>
          <span>{financial?.price ? financial.price : NoContent(16)}</span>
        </div>
      </div>
    </div>
  );
};

export default ScheduleCard;
