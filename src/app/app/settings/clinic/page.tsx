"use client";

import { useState, useEffect, useCallback } from "react";
import { localClinic } from "@/helpers/dataManager.helper";
import type { PartialClinic } from "@/types";

import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import ClinicForm from "./Form";

const Clinic = () => {
  const [clinic, setClinic] = useState<PartialClinic | null>(null);

  const { toast } = useToast();
  const handlRequestResponse = useCallback(
    (title: string, message: string) => toast({ title: title, description: message }),
    [toast]
  );

  useEffect(() => {
    const requestClinic = async () => {
      const clinicData = await localClinic();
      setClinic(clinicData);
    };
    requestClinic();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Informações da Clínica</h3>
        <p className="text-sm text-muted-foreground">Obtenha ou edite as informações da clínica</p>
      </div>
      <Separator />
      <ClinicForm clinic={clinic} toast={handlRequestResponse} />
    </div>
  );
};

export default Clinic;
