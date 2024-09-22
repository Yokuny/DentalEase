"use client";

import { useCallback } from "react";

import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import AcessForm from "./Form";

const Service = () => {
  const { toast } = useToast();
  const handlRequestResponse = useCallback(
    (title: string, message: string) => toast({ title: title, description: message }),
    [toast]
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Serviços diponiveis</h3>
        <p className="text-sm text-muted-foreground">Configure os serviços disponiveis para os pacientes.</p>
      </div>
      <Separator />
      <AcessForm toast={handlRequestResponse} />
    </div>
  );
};

export default Service;
