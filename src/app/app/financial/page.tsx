"use client";

import React, { Suspense, useCallback, useEffect, useState } from "react";
import { columns } from "./List";
import { localFinancial } from "@/helpers/dataManager.helper";
import type { PartialFinancial } from "@/types";

import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import List from "../../../components/list/FinancialList";
import Register from "./Register";

const Interfaces = () => {
  const [financials, setFinancials] = useState<PartialFinancial[]>([]);

  const { toast } = useToast();
  const handlRequestResponse = useCallback(
    (title: string, message: string) => toast({ title: title, description: message }),
    [toast]
  );

  useEffect(() => {
    const fetchFinancials = async () => {
      try {
        const data = await localFinancial();
        setFinancials(data);
      } catch (error: any) {
        handlRequestResponse("Erro", error.message);
      } finally {
      }
    };
    fetchFinancials();
  }, [handlRequestResponse]);

  return (
    <>
      <CardHeader className="flex flex-row justify-between items-baseline">
        <div className="md:gap-2 md:flex-row md:items-baseline flex flex-col">
          <CardTitle className="text-primaryBlue md:text-xl">Financeiro</CardTitle>
          <CardDescription>Lista registros financeiros. Pagos, cancelados ou em aberto.</CardDescription>
        </div>
        <div className="gap-2 flex-row flex">
          <Suspense fallback={<div>Carregando...</div>}>
            <Register toast={handlRequestResponse} />
          </Suspense>
        </div>
      </CardHeader>

      <CardContent className="flex items-center justify-center flex-col">
        <List columns={columns} data={financials} />
      </CardContent>
    </>
  );
};

export default Interfaces;
