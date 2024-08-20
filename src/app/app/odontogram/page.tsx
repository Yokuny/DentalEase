"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { columns } from "./List";
import { localOdontogram, refreshOdontogram } from "@/helpers/dataManager.helper";
import type { PartialOdontogram } from "@/types";

// import IconReload from "../../../../public/Reload.Icon";
// import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import List from "../../../components/list/OdontogramList";
import Register from "./Register";

const Interfaces = () => {
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const [odontograms, setOdontograms] = useState<PartialOdontogram[]>([]);

  const { toast } = useToast();
  const handlRequestResponse = useCallback(
    (title: string, message: string) => toast({ title: title, description: message }),
    [toast]
  );

  useEffect(() => {
    // setIsLoading(true);
    const fetchOdontogram = async () => {
      try {
        const data = await localOdontogram();
        setOdontograms(data);
      } catch (error: any) {
        handlRequestResponse("Erro", error.message);
      } // finally {
      //   setIsLoading(false);
      // }
    };
    fetchOdontogram();
  }, [handlRequestResponse]);

  // const fetchOdontogram = async () => {
  //   setIsLoading(true);
  //   try {
  //     const data = await refreshOdontogram();
  //     handlRequestResponse("Sucesso", "Odontograma atualizado com sucesso");
  //     setOdontograms(data);
  //   } catch (error: any) {
  //     handlRequestResponse("Erro", error.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <>
      <CardHeader className="flex flex-row justify-between items-baseline">
        <div className="md:gap-2 md:flex-row md:items-baseline flex flex-col">
          <CardTitle className="text-primaryBlue md:text-xl">Odontograma</CardTitle>
          <CardDescription className="md:block hidden text-xs">Lista de odontogramas cadastrados</CardDescription>
        </div>
        <div className="gap-2 flex-row flex">
          {/* <Button
            variant="primary"
            className="flex items-center gap-2 text-slate-700 dark:text-slate-300"
            onClick={fetchOdontogram}>
            <IconReload />
          </Button> */}
          <Suspense fallback={<div>Loading...</div>}>
            <Register toast={handlRequestResponse} />
          </Suspense>
        </div>
      </CardHeader>

      <CardContent className="flex items-center justify-center flex-col">
        <List columns={columns} data={odontograms} />
      </CardContent>
    </>
  );
};

export default Interfaces;
