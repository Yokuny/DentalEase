"use client";

import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Config = () => {
  return (
    <>
      <CardHeader className="p-3 px-6 flex flex-row justify-between ">
        <div className="md:gap-4 gap-1 flex md:flex-row md:items-center flex-col">
          <CardTitle>Agenda</CardTitle>
          <CardDescription>Horarios agendados</CardDescription>
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

export default Config;
