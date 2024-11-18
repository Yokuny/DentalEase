"use client";

import React, { Suspense, useCallback } from "react";

import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import Register from "./RegisterBtn";
import Calendar from "./Calenders";

const Schedule = () => {
  const { toast } = useToast();
  const handlRequestResponse = useCallback(
    (title: string, message: string) => toast({ title: title, description: message }),
    [toast]
  );

  return (
    <>
      <CardHeader className="p-3 px-6 flex flex-row justify-between">
        <div className="md:gap-4 gap-1 flex md:flex-row md:items-center flex-col">
          <CardTitle className="text-primaryBlue">Agenda</CardTitle>
          <CardDescription>Horarios agendados</CardDescription>
        </div>
        <div className="gap-2 flex-row flex">
          {/* <Button
            variant="primary"
            className="group flex items-center gap-2 text-slate-700 dark:text-slate-300"
            onClick={fetchPatients}>
            {isLoading ? <IconReload className="animate-spin" /> : <IconReload className="group-hover:animate-spin" />}
            <p className="md:block hidden">Atualizar</p>
          </Button> */}
          <Suspense fallback={<div>Carregando...</div>}>
            <Register toast={handlRequestResponse} />
          </Suspense>
        </div>
      </CardHeader>

      <CardContent className="flex items-center justify-center flex-col">
        <Calendar />
      </CardContent>
      <CardFooter className="h-2"></CardFooter>
    </>
  );
};

export default Schedule;
