import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { financialSchema, NewFinancial } from "@/schemas/financial.schema";
import { request, POST } from "@/helpers/fetch.config";
import { refreshFinancial } from "@/helpers/dataManager.helper";
import type { ToastProps } from "@/types";

import IconReload from "../../../../public/Reload.Icon";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import ProcedureComponent from "./ProcedureComponent";
import PatientCombobox from "@/components/data-inputs/PatientCombobox";
import OdontogramCombobox from "@/components/data-inputs/OdontogramCombobox";
import DentistCombobox from "@/components/data-inputs/DentistCombobox";

const FinancialForm = ({ toast }: ToastProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<NewFinancial>({
    resolver: zodResolver(financialSchema),
    defaultValues: {
      Patient: "",
      Doctor: "",
      Odontogram: "",
      procedures: [
        {
          procedure: "",
          status: "pending",
        },
      ],
      status: "pending",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: NewFinancial) => {
    setIsLoading(true);
    const body: NewFinancial = {
      Patient: values.Patient,
      Doctor: values.Doctor,
      procedures: values.procedures,
      status: values.status,
    };
    if (values.Odontogram) body.Odontogram = values.Odontogram;

    try {
      const res = await request("financial/create", POST(body));
      if (res.success === false) throw new Error(res.message);

      localStorage.setItem("activeFinancial", JSON.stringify(body));
      toast("Sucesso", res.message);
      form.reset();

      await refreshFinancial();
      return router.push(`/app/schedule`);
    } catch (Error: any) {
      toast("Erro ao salvar registro financeiro", Error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        id="financial-form"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(form.getValues());
        }}
        className="space-y-5">
        <div className="w-full gap-4 flex-col sm:flex-row flex">
          <FormField
            control={form.control}
            name="Patient"
            render={({ field }) => (
              <FormItem className="max-w-sm w-full">
                <FormControl>
                  <PatientCombobox controller={{ ...field }} toast={toast} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Odontogram"
            render={({ field }) => (
              <FormItem className="max-w-sm w-full">
                <FormControl>
                  <OdontogramCombobox
                    controller={{ ...field }}
                    toast={toast}
                    patient={form.getValues().Patient}
                    disabled={form.getValues().Patient === ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="Doctor"
          render={({ field }) => (
            <FormItem className="max-w-sm w-full">
              <FormControl>
                <DentistCombobox controller={{ ...field }} toast={toast} />
              </FormControl>
            </FormItem>
          )}
        />
        {/* if ! odontogram */}
        <ProcedureComponent form={form} toast={toast} />

        <Button form="financial-form" type="submit" variant={"gradient"} className="mt-4 w-full" disabled={isLoading}>
          {isLoading && <IconReload className="mr-2 h-4 w-4 animate-spin" />}
          Cadastrar
        </Button>
      </form>
    </Form>
  );
};

export default FinancialForm;
