"use client";

import { useSearchParams } from "next/navigation";

import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import DatePickerDemo from "@/components/ui/date-picker";

const Schedule = () => {
  const searchParams = useSearchParams();
  const loginParam = searchParams.get("acess");

  return (
    <>
      <CardHeader className="p-3 px-6 flex flex-row justify-between bg-slate-300">
        <div className="md:gap-4 gap-1 flex md:flex-row md:items-center flex-col">
          <CardTitle className="text-blue400">Agenda</CardTitle>
          <CardDescription>Horarios agendados</CardDescription>
        </div>
        <div>
          <DatePickerDemo />
        </div>
      </CardHeader>

      <CardContent className="flex items-center justify-center flex-col bg-slate-500">
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </>
  );
};

export default Schedule;
