"use client";

// import { useSearchParams } from "next/navigation";

import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import DatePicker from "@/components/ui/date-picker";
import { POST } from "@/helpers/fetch.config";

const Schedule = () => {
  // const searchParams = useSearchParams();
  // const loginParam = searchParams.get("acess");

  return (
    <>
      <CardHeader className="p-3 px-6 flex flex-row justify-between ">
        <div className="md:gap-4 gap-1 flex md:flex-row md:items-center flex-col">
          <CardTitle className="text-primaryBlue">Agenda</CardTitle>
          <CardDescription>Horarios agendados</CardDescription>
        </div>
        <div>
          <DatePicker />
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
