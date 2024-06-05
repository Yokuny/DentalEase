"use client";

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
import { cn } from "@/helpers/cn.util";

import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import DatePickerDemo from "@/components/ui/date-picker";

const Schedule = () => {
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

  const data = [
    {
      Id: 1,
      Subject: "Meeting",
      StartTime: new Date(2023, 1, 15, 10, 0),
      EndTime: new Date(2023, 1, 15, 12, 30),
    },
  ];

  return (
    <>
      <CardHeader className="p-3 px-6 flex flex-row justify-between">
        <div className="md:gap-4 gap-1 flex md:flex-row md:items-center flex-col">
          <CardTitle className="text-primaryBlue">Agenda</CardTitle>
          <CardDescription>Horarios agendados</CardDescription>
        </div>
        <div>
          <DatePickerDemo />
        </div>
      </CardHeader>

      <CardContent className="flex items-center justify-center flex-col">
        <div className="w-full">
          <ScheduleComponent
            height="74vh"
            selectedDate={new Date()}
            workHours={{ start: "7:00", end: "20:00" }}
            workDays={[1, 2, 3, 4, 5, 6]}
            dateHeaderTemplate={headerTemplate}
            timezone={LocalTimeZone}
            eventSettings={{
              dataSource: data,
            }}>
            <ViewsDirective>
              <ViewDirective option="Day" />
              <ViewDirective option="WorkWeek" />
              <ViewDirective option="Month" />
              <ViewDirective option="Agenda" />
            </ViewsDirective>
            <Inject services={[Day, WorkWeek, Month, Agenda]} />
          </ScheduleComponent>
        </div>
      </CardContent>
      <CardFooter className="h-2"></CardFooter>
    </>
  );
};

export default Schedule;
