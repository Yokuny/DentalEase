"use client";

import { useCallback, useState, useEffect } from "react";
import { columns } from "./List";
import { request, PUT } from "@/helpers/fetch.config";
import { localProcedure, refreshProcedure } from "@/helpers/dataManager.helper";
import { parseCSV } from "@/helpers/formatter.helper";
import { useToast } from "@/components/ui/use-toast";
import type { ClinicProcedure } from "@/types";

import { Button } from "@/components/ui/button";
import List from "../../../../components/list/ProcedureList";
import IconDownload from "../../../../../public/Download.Icon";
import IconUpload from "../../../../../public/Upload.Icon";
import IconUploadCloud from "../../../../../public/Cloud.Icon";

const Service = () => {
  const [csv, setCSV] = useState([] as ClinicProcedure[]);
  const [newFile, setNewFile] = useState(false);
  const { toast } = useToast();
  const handlRequestResponse = useCallback(
    (title: string, message: string) => toast({ title: title, description: message }),
    [toast]
  );

  const uploadNewCSV = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".csv";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const csv = e.target?.result as string;
        const data = parseCSV(csv);
        setCSV(data);
        setNewFile(true);
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const downloadModelCSV = () => {
    const csvString = [
      "procedimento,agrupador,precoCusto,precoSugerido,precoSalvo",
      ...csv.map((p) => `${p.procedure},${p.grouper},${p.costPrice},${p.suggestedPrice},${p.savedPrice}`),
    ].join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "model.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const fetchProcedure = useCallback(async () => {
    try {
      const data = await localProcedure();
      setCSV(data);
    } catch (error: any) {
      handlRequestResponse("Aviso", error.message);
    }
  }, [handlRequestResponse]);

  useEffect(() => {
    fetchProcedure();
  }, [fetchProcedure]);

  const saveProcedure = async () => {
    const body = { procedures: convertCSVtoString(csv) };
    try {
      const res = await request("procedure", PUT(body));
      if (!res.success) throw new Error(res.message);
      setNewFile(false);
      await refreshProcedure();
      handlRequestResponse("Sucesso", res.message);
    } catch (e: any) {
      handlRequestResponse("Erro", e.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="justify-between items-center flex">
        <div>
          <h3 className="text-lg font-medium">Procedimentos clínicos</h3>
          <p className="text-sm text-muted-foreground">Configure os serviços prestados pela clínica.</p>
        </div>
        <div className="gap-2 flex">
          <Button onClick={downloadModelCSV} className="font-normal gap-2 flex" variant={"primary"}>
            <IconDownload className="h-4 w-4" />
            Modelo CSV
          </Button>
          <Button onClick={fetchProcedure} className="font-normal gap-2 flex" variant={"primary"}>
            <IconUploadCloud className="h-4 w-4" />
            Buscar dados
          </Button>
          <Button onClick={uploadNewCSV} className="gap-2 flex" variant={"gradient"}>
            <IconUpload className="h-4 w-4" />
            Upload CSV
          </Button>
        </div>
      </div>
      <List columns={columns} data={csv} updating={newFile} saveProcedure={saveProcedure} />
    </div>
  );
};

export default Service;

const convertCSVtoString = (data: ClinicProcedure[]): string => {
  return [
    "procedimento,agrupador,precoCusto,precoSugerido,precoSalvo",
    ...data.map((p) => `${p.procedure},${p.grouper},${p.costPrice},${p.suggestedPrice},${p.savedPrice}`),
  ].join("\n");
};
