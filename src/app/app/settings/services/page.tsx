"use client";

import { useCallback, useState, useEffect } from "react";
import { columns } from "./List";
import { request, GET } from "@/helpers/fetch.config";
import type { ClinicProcedure } from "@/types";
import { useToast } from "@/components/ui/use-toast";

import { Button } from "@/components/ui/button";
import List from "../../../../components/list/ProcedureList";
import IconDownload from "../../../../../public/Download.Icon";
import IconUpload from "../../../../../public/Upload.Icon";
import IconLink from "../../../../../public/Link.Icon";

const Service = () => {
  const [csv, setCSV] = useState([] as ClinicProcedure[]);

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
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const downloadModelCSV = () => {
    const csvString = [
      "procedimento,agrupador,preco_custo,preco_sugerido,preco_salvo",
      ...csv.map((p) => `${p.procedure},${p.grouper},${p.cost_price},${p.suggested_price},${p.saved_price}`),
    ].join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "model.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    request("/procedures", GET())
      .then((res) => {
        setCSV(parseCSV(res.data));
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const { toast } = useToast();
  const handlRequestResponse = useCallback(
    (title: string, message: string) => toast({ title: title, description: message }),
    [toast]
  );

  return (
    <div className="space-y-6">
      <div className="justify-between items-center flex">
        <div>
          <h3 className="text-lg font-medium">Serviços diponiveis</h3>
          <p className="text-sm text-muted-foreground">Configure os serviços prestados pela clínica.</p>
        </div>
        <div className="gap-2 flex">
          <Button onClick={downloadModelCSV} className="gap-2 flex" variant={"primary"}>
            <IconDownload className="h-4 w-4" />
            Modelo CSV
          </Button>
          <Button onClick={uploadNewCSV} className="gap-2 flex" variant={"primary"}>
            <IconUpload className="h-4 w-4" />
            Upload CSV
          </Button>
          <Button className="gap-2 flex" variant={"gradient"}>
            <IconLink className="h-4 w-4" />
            Dados atuais
          </Button>
        </div>
      </div>
      <List columns={columns} data={csv} toast={handlRequestResponse} />
    </div>
  );
};

export default Service;

const parseCSV = (csv: string): ClinicProcedure[] => {
  const [header, ...rows] = csv.split("\n");
  return rows.map((row) => {
    const [procedimento, agrupador, preco_custo, preco_sugerido, preco_salvo] = row
      .split(",")
      .map((val) => val.replace(/"/g, ""));
    return {
      procedure: procedimento,
      grouper: agrupador,
      cost_price: parseFloat(preco_custo),
      suggested_price: parseFloat(preco_sugerido),
      saved_price: parseFloat(preco_salvo),
    } as ClinicProcedure;
  });
};
