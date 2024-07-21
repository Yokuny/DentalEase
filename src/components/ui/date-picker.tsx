"use client";

import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import IconCalendar from "../../../public/Calender.Icon";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const DatePicker = () => {
  const [date, setDate] = useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={date ? "outline" : "primary"} className="md:min-w-[220px] md:w-full justify-start font-normal">
          <IconCalendar className="mr-4 h-4 w-4" />
          {date ? <p className="font-mono">{format(date, "P", { locale: ptBR })}</p> : <span>Escolha o dia</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
