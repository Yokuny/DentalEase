"use client";

import { useState } from "react";

import { Calendar } from "@/components/ui/calendar";

const WeekDayPicker = ({ controller }: any) => {
  const [date, setDate] = useState<Date>();

  return (
    <div className="items-center justify-center flex flex-col">
      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
    </div>
  );
};

export default WeekDayPicker;
