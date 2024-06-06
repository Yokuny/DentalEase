"use client";

import { cn } from "@/helpers/cn.util";
import {
  ScheduleComponent,
  Day,
  WorkWeek,
  Month,
  Agenda,
  Inject,
  Timezone,
  ViewsDirective,
  ViewDirective,
} from "@syncfusion/ej2-react-schedule";
import { Internationalization } from "@syncfusion/ej2-base";

const ServiceForm = () => {
  const LocalTimeZone = new Timezone().getLocalTimezoneName();
  let instance: Internationalization = new Internationalization();

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

  //   const data = [
  //     {
  //       Id: 1,
  //       Subject: "Meeting",
  //       StartTime: new Date(2023, 1, 15, 10, 0),
  //       EndTime: new Date(2023, 1, 15, 12, 30),
  //     },
  //   ];

  return (
    <div className="w-full">
      <ScheduleComponent
        height="74vh"
        dateHeaderTemplate={headerTemplate}
        selectedDate={new Date()}
        // eventSettings={{
        //   dataSource: data,
        // }}
        workHours={{ start: "7:00", end: "20:00" }}
        workDays={[1, 2, 3, 4, 5, 6]}
        timezone={LocalTimeZone}>
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

export default ServiceForm;
