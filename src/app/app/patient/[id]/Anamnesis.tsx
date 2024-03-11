import { useState } from "react";
import { useParams } from "next/navigation";
import { GET, request } from "@/helpers/fetch.config";
import { cn } from "@/helpers/cn.util";

import { buttonVariants } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Anamnesis = () => {
  const activePatient = localStorage.getItem("activePatient");
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const handlRequestResponse = (title: string, message: string) =>
    toast({ title: title, description: message });

  const fetchPatients = async () => {
    setIsLoading(true);
    try {
      const res = await request("patient/partial", GET());
      if (res.message) throw new Error(res.message);

      localStorage.setItem("patients", JSON.stringify(res));

      handlRequestResponse("Sucesso", "Lista de pacientes atualizada.");
    } catch (error: any) {
      handlRequestResponse("Erro", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="text-primaryBlue md:text-xl">Anamnese</CardTitle>
      </CardHeader>

      <CardContent className="flex items-center justify-center flex-col"></CardContent>

      <CardFooter></CardFooter>
    </>
  );
};

export default Anamnesis;
