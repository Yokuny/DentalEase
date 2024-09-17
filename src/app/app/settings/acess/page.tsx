"use client";

import { useCallback } from "react";

import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import AcessForm from "./Form";

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
        <p className="text-sm text-muted-foreground">Configure a senha de acesso ao sistema.</p>
      </div>
      <Separator />
      <AcessForm toast={handlRequestResponse} />
    </div>
  );
};

export default Acess;
