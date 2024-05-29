"use client";

// import { useSearchParams } from "next/navigation";

import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import DatePickerDemo from "@/components/ui/date-picker";

const Schedule = () => {
  // const searchParams = useSearchParams();
  // const loginParam = searchParams.get("acess");

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
          <div className="w-full px-6 pb-4 flex items-center gap-3">a</div>
        </div>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </>
  );
};

export default Schedule;
