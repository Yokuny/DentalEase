import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";

import TimePicker from "./TimePicker";

const DayAndHour = ({ controller }: { controller: any }) => {
  const [date, setDate] = useState<Date>();

  const handleDate = (date: Date) => {
    controller.onChange(date);
  };

  return (
    <div className="items-center flex">
      <div className="max-w-96 w-full p-4 rounded-md">
        <div className="items-center justify-center flex flex-col">
          <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
        </div>
      </div>
      <div className="max-w-60 w-full p-4 rounded-md">
        <TimePicker day={date} handleDate={handleDate} />
      </div>
    </div>
  );
};

export default DayAndHour;
