import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter.js";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore.js";
import minMax from "dayjs/plugin/minMax.js";
import { Route } from "next";
import Link from "next/link";
import { useCallback } from "react";
import { cn } from "@/helpers/cn.util";

import { ScrollArea } from "@/components/ui/scroll-area";

declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(minMax);

const timeSlots = [
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
] as const;

const colStartClasses = {
  0: "col-start-[1]",
  1: "col-start-[2]",
  2: "col-start-[3]",
  3: "col-start-[4]",
  4: "col-start-[5]",
  5: "col-start-[6]",
  6: "col-start-[7]",
} as const;

const colSpanClasses = {
  0: "col-end-[span_0]",
  1: "col-end-[span_1]",
  2: "col-end-[span_2]",
  3: "col-end-[span_3]",
  4: "col-end-[span_4]",
  5: "col-end-[span_5]",
  6: "col-end-[span_6]",
  7: "col-end-[span_7]",
  8: "col-end-[span_8]",
  9: "col-end-[span_9]",
  10: "col-end-[span_10]",
  11: "col-end-[span_11]",
  12: "col-end-[span_12]",
  13: "col-end-[span_13]",
  14: "col-end-[span_14]",
  15: "col-end-[span_15]",
  16: "col-end-[span_16]",
  17: "col-end-[span_17]",
} as const;

const rowStartClasses = {
  0: "row-start-[1]",
  1: "row-start-[2]",
  2: "row-start-[3]",
  3: "row-start-[4]",
  4: "row-start-[5]",
  5: "row-start-[6]",
  6: "row-start-[7]",
  7: "row-start-[8]",
  8: "row-start-[9]",
  9: "row-start-[10]",
  10: "row-start-[11]",
  11: "row-start-[12]",
  12: "row-start-[13]",
  13: "row-start-[14]",
  14: "row-start-[15]",
  15: "row-start-[16]",
  16: "row-start-[17]",
  17: "row-start-[18]",
  18: "row-start-[19]",
  19: "row-start-[20]",
  20: "row-start-[21]",
  21: "row-start-[22]",
  22: "row-start-[23]",
  23: "row-start-[24]",
  24: "row-start-[25]",
  25: "row-start-[26]",
  26: "row-start-[27]",
} as const;

const rowSpanClasses = {
  2: "row-end-[span_2]",
  3: "row-end-[span_3]",
  4: "row-end-[span_4]",
  5: "row-end-[span_5]",
  6: "row-end-[span_6]",
  7: "row-end-[span_7]",
  8: "row-end-[span_8]",
  9: "row-end-[span_9]",
  10: "row-end-[span_10]",
  11: "row-end-[span_11]",
  12: "row-end-[span_12]",
  13: "row-end-[span_13]",
  14: "row-end-[span_14]",
  15: "row-end-[span_15]",
  16: "row-end-[span_16]",
  17: "row-end-[span_17]",
  18: "row-end-[span_18]",
  19: "row-end-[span_19]",
  20: "row-end-[span_20]",
  21: "row-end-[span_21]",
  22: "row-end-[span_22]",
  23: "row-end-[span_23]",
  24: "row-end-[span_24]",
  25: "row-end-[span_25]",
  26: "row-end-[span_26]",
} as const;

const weekDays = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"] as const;

type Props<RouteInferred extends string> = {
  dates: `${number}${number}${number}${number}-${number}${number}-${number}${number}`[];
  events: {
    id: number;
    start: Date;
    end: Date;
    title: string;
    href: Route<RouteInferred>;
    isSecondary?: boolean;
  }[];
};

const Scheduler = <Route extends string>(props: Props<Route>) => {
  const timeSlotColCount = 1;

  const events = props.events.map((event) => {
    const end = dayjs(event.end);
    return {
      ...event,
      start: dayjs(event.start),
      end: end,
      isMultiDay: end.diff(event.start, "hour") >= 24,
    };
  });

  const getEventClassNames = useCallback(
    (event: (typeof events)[number]) => {
      const previousMultiDayEvents = events.filter(
        ({ isMultiDay }, index) => isMultiDay && index < events.indexOf(event)
      );
      const previousNonMultiDayEvents = events.filter(
        ({ isMultiDay }, index) => !isMultiDay && index < events.indexOf(event)
      );
      const isOverlappingNonMultiDay =
        !event.isMultiDay &&
        previousNonMultiDayEvents.reduce((isEventOverlappingPreviousEvents, otherAppointment) => {
          return (
            isEventOverlappingPreviousEvents ||
            (event.start.isBefore(dayjs(otherAppointment.end)) && event.end.isAfter(dayjs(otherAppointment.start)))
          );
        }, false);

      // Disallow negative index (if date outside of range, the
      // event should start at the first date in props.dates)
      const dateIndex = Math.max(
        0,
        props.dates.findIndex((date) => date.startsWith(event.start.format("YYYY-MM-DD")))
      );

      return cn(
        "p-4 rounded text-xs break-words no-underline max-h-full hover:z-10 hover:h-min hover:min-h-full transition-[background-color] flex flex-col",
        colStartClasses[(timeSlotColCount + dateIndex) as keyof typeof colStartClasses],
        event.isMultiDay &&
          colSpanClasses[
            Math.min(
              props.dates.length - dateIndex,
              event.end.diff(dayjs.max(event.start, dayjs(props.dates[0])), "days")
            ) as keyof typeof colSpanClasses
          ],
        rowStartClasses[
          (event.isMultiDay
            ? previousMultiDayEvents.reduce((rowStart, multiDayEvent) => {
                // Move the event down a row if it overlaps with a previous event
                if (event.start.isBefore(dayjs(multiDayEvent.end)) && event.end.isAfter(dayjs(multiDayEvent.start))) {
                  rowStart++;
                }
                return rowStart;
              }, 1)
            : timeSlots.indexOf(
                dayjs(event.start).format("HH:mm") as (typeof timeSlots)[number]
              )) as keyof typeof rowStartClasses
        ],
        !event.isMultiDay &&
          rowSpanClasses[(event.end.diff(event.start, "minute") / 30) as keyof typeof rowSpanClasses],
        !event.isSecondary
          ? "bg-sky-400 hover:bg-sky-500 dark:bg-sky-600 dark:hover:bg-sky-500 text-slate-800 hover:text-slate-100 dark:text-slate-100 border border-sky-300 dark:border-sky-400"
          : "bg-lime-200 hover:bg-lime-400 dark:bg-lime-600 dark:hover:bg-lime-500 text-slate-800 dark:text-slate-100 border border-lime-300 dark:border-lime-400",
        isOverlappingNonMultiDay && "w-[75%] ml-[23%] border text-right z-20 hover:z-30"
      );
    },
    [props.dates, events, timeSlotColCount]
  );

  return (
    <div className="min-w-[650px] pr-4">
      <div className={`pl-[60px] auto-rows-[32px] grid-cols-[repeat(${weekDays.length},_1fr)] grid`}>
        {props.dates.map((date, index) => {
          return (
            <div
              key={`date-${date}`}
              className={cn(
                "col-span-1 p-4 text-center text-sm border border-slate-50 dark:border-slate-900 justify-center items-center flex",
                colStartClasses[(timeSlotColCount + index - 1) as keyof typeof colStartClasses]
              )}>
              <span className="gap-2 grayscale-0 flex">
                <span className="text-slate-800/75 dark:text-slate-300/75">{weekDays[index]}</span>
                <span
                  className={cn(
                    "font-bold text-slate-700 dark:text-slate-300",
                    dayjs().isSame(dayjs(date), "day") && "text-sky-500 dark:text-sky-400"
                  )}>
                  {date.slice(-2)}
                </span>
              </span>
            </div>
          );
        })}
        {/* {events
          .filter(({ isMultiDay }) => isMultiDay)
          .map((event) => {
            return (
              <Link key={`event-${event.id}`} href={event.href} className={cn(getEventClassNames(event), "mt-6 h-2 p-4 flex justify-center")}>
                {event.title}
              </Link>
            );
          })} */}
      </div>

      <ScrollArea>
        <div
          className={`grid h-[60vh] mt-1 grid-cols-[repeat(${weekDays.length},_1fr)] grid-rows-[repeat(${timeSlots.length},32px)] gap-1`}>
          {
            timeSlots.map((time, index) => {
              return (
                <div
                  key={`time-slot-${time}`}
                  className={cn(
                    rowStartClasses[index as keyof typeof rowStartClasses],
                    "text-slate-800/75 dark:text-slate-300/75 text-xs text-end pr-3 grayscale-0 leading-[30px]"
                  )}>
                  {time.endsWith("30") ? <>&nbsp;</> : time}
                </div>
              );
            }
          )}


          {
            events
              .filter((event) => {
                const hours = event.end.diff(event.start, "hour");
                return hours < 24;
              })
              .map((event) => {
                return (
                  <Link key={`time-slot-event-${event.id}`} href={event.href} className={getEventClassNames(event)}>
                    <div className="min-h-0 text-sm truncate font-medium">{event.title}</div>
                    {event.end.diff(event.start, "minute") / 30 > 1 && (
                      <div className="pt-1 text-xs font-medium font-sans">
                        {dayjs(event.start).format("HH:mm")} - {dayjs(event.end).format("HH:mm")}
                      </div>
                    )}
                  </Link>
                );
              }
            )
          }
        </div>
      </ScrollArea>
    </div>
  );
};

export default Scheduler;
