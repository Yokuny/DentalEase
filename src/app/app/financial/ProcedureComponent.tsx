import { useState } from "react";
import { useFieldArray } from "react-hook-form";
import { cn } from "@/helpers/cn.util";
import { NewProcedure } from "@/schemas/financial.schema";

import { Button, buttonVariants } from "@/components/ui/button";
import IconDelete from "../../../../public/Delete.Icon";
import IconAdd from "../../../../public/Add.Icon";
import ProceduresSheet from "@/components/data-inputs/ProceduresSheet";

const ProcedureComponent = ({ form, toast }: ProcedureComponentProps) => {
  const [procedures, setProcedures] = useState<NewProcedure[]>([
    {
      procedure: "",
      price: 0,
      status: "pending",
    },
  ]);

  const { fields, append, remove, prepend } = useFieldArray({
    control: form.control,
    name: "procedures",
  });

  const addProcedure = () => {
    const procedureValue = form.getValues("procedures");
    const lastProcedure = procedureValue[procedureValue.length - 1];
    if (!lastProcedure.price || !lastProcedure.procedure) {
      toast("Erro", "Não foi preenchido as informações do procedimento");
      return;
    }
    append({ procedure: "", status: "pending" });
    setProcedures((prev) => [...prev, { procedure: "", price: 0, status: "pending" }]);
  };

  const removeProcedure = (i: number) => {
    remove(i);
    setProcedures((prev) => {
      const newProcedures = [...prev];
      newProcedures.splice(i, 1);
      return newProcedures;
    });
  };

  const handleProcedure = (procedure: NewProcedure) => {
    const body = { procedure: procedure.procedure, price: Number(procedure.price), status: procedure.status };
    form.setValue(`procedures[${procedures.length - 1}]`, body);
    setProcedures((prev) => {
      const newProcedures = [...prev];
      newProcedures[prev.length - 1] = procedure;
      return newProcedures;
    });
  };

  return (
    <div className={cn("w-full md:p-4 p-2 bg-slate-50 dark:bg-slate-900/70 rounded-md relative")}>
      {fields.map((el, i) => (
        <div key={el.id} className="w-full flex">
          {i >= 1 && i == fields.length - 1 && (
            <div className="gap-2 flex-col flex">
              <div className={cn(buttonVariants({ variant: "success", size: "icon-md" }))}>
                <span className=" justify-center items-center flex">{procedures.length}</span>
              </div>
              <Button type="button" size={"icon-md"} variant="destructive" onClick={() => removeProcedure(i)}>
                <IconDelete className="h-5 w-5" />
              </Button>
            </div>
          )}

          {fields.length == i + 1 && (
            <div
              className={cn(
                procedures[i].price > 0 ? "justify-between" : "justify-center",
                "items-center w-full flex"
              )}>
              <div className="w-full justify-center flex h-full">
                <div className="items-center h-full flex-col flex md:space-y-2 space-y-1">
                  <ProceduresSheet handleProcedure={handleProcedure} toast={toast} />
                </div>
              </div>

              {procedures[i].price > 0 && (
                <div className="h-full md:max-w-40 max-w-10 w-full">
                  <div
                    className={cn(buttonVariants({ variant: "basic", size: "icon-lg" }), "h-full w-full ml-auto")}
                    onClick={addProcedure}>
                    <IconAdd className="md:h-10 md:w-10" />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

type ProcedureComponentProps = {
  form: any;
  toast: (title: string, message: string) => void;
};

export default ProcedureComponent;
