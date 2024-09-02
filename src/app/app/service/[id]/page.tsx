"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { requestService } from "@/helpers/requestById.helper";
import type { FullService } from "@/types";

import { useToast } from "@/components/ui/use-toast";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ServiceData = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [service, setService] = useState<FullService | null>(null);
  const { id } = useParams();

  const { toast } = useToast();
  const handlRequestResponse = (title: string, message: string) => toast({ title: title, description: message });

  useEffect(() => {
    setIsLoading(true);
    const fetchService = async () => {
      try {
        const data = await requestService(String(id));
        setService(data);
      } catch (error: any) {
        toast({ title: "Erro", description: error.message });
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchService();
  }, [id, toast]);

  return (
    <>
      <CardHeader>
        <div className="md:gap-2 mb-4 md:flex-row md:items-baseline flex flex-col">
          <CardTitle className="text-skyBlue md:text-2xl tracking-wide">
            <pre>{JSON.stringify(service, null, 2)}</pre>
          </CardTitle>
          {/* <CardDescription>Ficha completa do paciente.</CardDescription> */}
        </div>
      </CardHeader>
      <CardContent></CardContent>
    </>
  );
};

export default ServiceData;
