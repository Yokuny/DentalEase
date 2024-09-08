"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { requestFinancial } from "@/helpers/requestById.helper";
import type { FullFinancial } from "@/types";

import { useToast } from "@/components/ui/use-toast";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FinancialData = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [financial, setFinancial] = useState<FullFinancial | null>(null);
  const { id } = useParams();

  const { toast } = useToast();
  const handlRequestResponse = (title: string, message: string) => toast({ title: title, description: message });

  useEffect(() => {
    setIsLoading(true);
    const fetchFinancial = async () => {
      try {
        const data = await requestFinancial(String(id));
        setFinancial(data);
      } catch (error: any) {
        toast({ title: "Erro", description: error.message });
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchFinancial();
  }, [id, toast]);

  return (
    <>
      <CardHeader>
        <div className="md:gap-2 mb-4 md:flex-row md:items-baseline flex flex-col">
          <CardTitle className="text-skyBlue md:text-2xl tracking-wide">
            <pre>{JSON.stringify(financial, null, 2)}</pre>
          </CardTitle>
          {/* <CardDescription>Ficha completa do paciente.</CardDescription> */}
        </div>
      </CardHeader>
      <CardContent></CardContent>
    </>
  );
};

export default FinancialData;
