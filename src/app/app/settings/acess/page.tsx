"use client";

import { useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";

import AcessForm from "./Form";
import { Separator } from "@/components/ui/separator";

const Acess = () => {
  const { toast } = useToast();
  const handlRequestResponse = useCallback(
    (title: string, message: string) => toast({ title: title, description: message }),
    [toast]
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Configuração de Acesso</h3>
        <p className="text-sm text-muted-foreground">Ajuste suas configurações de acesso.</p>
      </div>
      <Separator />
      <AcessForm toast={handlRequestResponse} />
    </div>
  );
};

export default Acess;
