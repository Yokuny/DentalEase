"use client"

import * as React from "react"
import { DayPicker } from "react-day-picker";
import { ptBR } from "date-fns/locale";
import { cn } from "@/helpers/cn.util";

import IconRight from "../../../public/Right.Icon";
import IconLeft from "../../../public/Left.Icon";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={true}
      locale={ptBR}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "primary" }),
          "h-7 w-9 p-0 border-slate-400 dark:border-slate-500 text-black dark:text-white"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex justify-between px-2",
        head_cell: "font-normal text-[0.8rem] text-darkBlue dark:text-skyBlue",
        row: "w-full mt-2 flex",
        cell: cn(
          "rounded-md relative md:p-[3px] text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected].day-outside)]:bg-slate-200/50 [&:has([aria-selected].day-range-end)]:rounded-r-md dark:[&:has([aria-selected].day-outside)]:bg-slate-700/50",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "blank" }),
          "h-8 w-8 p-0 hover:bg-slate-50 dark:hover:bg-slate-700 font-normal text-slate-700 dark:text-slate-200"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "text-slate-50 focus:text-slate-50 bg-primaryBlue hover:bg-primaryBlue focus:bg-primaryBlue aria-selected:text-slate-50",
        day_today: "border-slate-500  dark:bg-slate-900 dark:border-slate-300 border",
        day_outside:
          "day-outside text-slate-400 opacity-50 dark:opacity-100 aria-selected:bg-slate-100/50 aria-selected:text-slate-900 aria-selected:opacity-50 dark:text-slate-500 dark:aria-selected:bg-slate-800/50 dark:aria-selected:text-slate-300",
        day_disabled: "text-slate-400 opacity-50 dark:text-slate-300",
        day_range_middle:
          "aria-selected:bg-slate-100 aria-selected:text-slate-900 dark:aria-selected:bg-slate-800 dark:aria-selected:text-slate-50",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => <IconLeft className="h-3 w-3" />,
        IconRight: () => <IconRight className="h-3 w-3" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendario";

export { Calendar }
