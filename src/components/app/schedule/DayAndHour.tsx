import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";

import TimePicker from "./TimePicker";

type DayAndHourProps = {
  controller: any;
};

const DayAndHour = ({ controller }: DayAndHourProps) => {
  const [date, setDate] = useState<Date>();

  return (
    <div className="items-center flex">
      <div className="max-w-96 w-full p-4 rounded-md">
        <div className="items-center justify-center flex flex-col">
          <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
        </div>
      </div>
      <div className="max-w-60 w-full p-4 rounded-md">
        <TimePicker
          day={date}
          handleDate={(date: Date) => {
            controller.onChange(date);
          }}
        />
      </div>
    </div>
  );
};

export default DayAndHour;
