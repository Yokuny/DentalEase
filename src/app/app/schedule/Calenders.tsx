"use client";

import { useCallback, useEffect, useState } from "react";
import { Internationalization, registerLicense } from "@syncfusion/ej2-base";
import {
  ScheduleComponent,
  Day,
  WorkWeek,
  Month,
  Agenda,
  Inject,
  ViewsDirective,
  ViewDirective,
} from "@syncfusion/ej2-react-schedule";

import { useToast } from "@/components/ui/use-toast";
import { localSchedule, refreshSchedule } from "@/helpers/dataManager.helper";
import { cn } from "@/helpers/cn.util";
import type { PartialSchedule } from "@/types";

registerLicense("Ngo9BigBOggjHTQxAR8/V1NBaF5cXmZCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWXdecXZUQ2VYVE11V0I=");

const FinancialForm = () => {
  const [schedule, setSchedule] = useState<PartialSchedule[]>([]);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  let instance: Internationalization = new Internationalization();

  const fieldsToProcess = {
    id: "_id",
    subject: { name: "patient" },
    startTime: { name: "startTime" },
    endTime: { name: "endTime" },
    description: { name: "service" },
  };

  const { toast } = useToast();
  const handlRequestResponse = useCallback(
    (title: string, message: string) => toast({ title: title, description: message }),
    [toast]
  );

  useEffect(() => {
    // setIsLoading(true);
    const fetchSchedule = async () => {
      try {
        const data = await localSchedule();
        setSchedule(data);
      } catch (error: any) {
        handlRequestResponse("Erro", error.message);
      } finally {
        // setIsLoading(false);
      }
    };
    fetchSchedule();
  }, [handlRequestResponse]);

  const headerTemplate = ({ date }: { date: Date }) => {
    const weekTranslation: Record<string, string> = {
      Sun: "Dom",
      Mon: "Seg",
      Tue: "Ter",
      Wed: "Qua",
      Thu: "Qui",
      Fri: "Sex",
      Sat: "Sáb",
    };

    const getDateHeaderText = (value: Date): string => instance.formatDate(value, { skeleton: "Ed" });

    return (
      <div
        className="pl-4 text-sm font-extralight text-slate-600 grayscale-0
         gap-2 items-center flex">
        <div
          className={cn("", parseInt(getDateHeaderText(date).slice(0, 2)) === new Date().getDate() && "text-skyBlue")}>
          {weekTranslation[instance.formatDate(date, { skeleton: "E" })]}
        </div>
        <div
          className={cn(
            "font-semibold",
            parseInt(getDateHeaderText(date).slice(0, 2)) === new Date().getDate() &&
              "bg-skyBlue text-slate-50 h-7 w-7 rounded-full flex items-center justify-center"
          )}>
          {getDateHeaderText(date).slice(0, 2)}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      <ScheduleComponent
        height="74vh"
        dateHeaderTemplate={headerTemplate}
        selectedDate={new Date()}
        eventSettings={{ dataSource: schedule, fields: fieldsToProcess }}
        workHours={{ start: "7:00", end: "20:00" }}
        workDays={[1, 2, 3, 4, 5, 6]}>
        <ViewsDirective>
          <ViewDirective option="Day" />
          <ViewDirective option="WorkWeek" />
          <ViewDirective option="Month" />
          <ViewDirective option="Agenda" />
        </ViewsDirective>
        <Inject services={[Day, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>
    </div>
  );
};

export default FinancialForm;
