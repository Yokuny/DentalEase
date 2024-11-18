"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { scheduleSchema, NewSchedule } from "@/schemas/schedule.schema";
import { request, POST } from "@/helpers/fetch.config";
import { refreshSchedule } from "@/helpers/dataManager.helper";
import type { ToastProps } from "@/types";

import IconReload from "../../../../public/Reload.Icon";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import FinancialCombobox from "@/components/data-inputs/FinancialCombobox";
import ScheduleCard from "../../../components/app/schedule/ScheduleCard";
import DayAndHour from "../../../components/app/schedule/DayAndHour";

type Financial = {
  _id: string;
  patient: string;
  doctor: string;
  price: number;
  procedures: string;
  status: "Cancelado" | "Pago" | "Pendente";
};

const FinancialForm = ({ toast }: ToastProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [financial, setFinancial] = useState<Financial>();
  const [startDate, setStartDate] = useState<Date>();

  const form = useForm<NewSchedule>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      Financial: "",
      startTime: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    form.watch((value) => {
      if (!value.Financial) return;

      const financials = localStorage.getItem("financials");
      if (!financials) return;
      const parsedFinancials = JSON.parse(financials);

      const selectedFinancial = parsedFinancials.find((financial: Financial) => financial._id === value.Financial);
      if (!selectedFinancial) return;

      setFinancial(selectedFinancial);
    });
  }, [form.watch, form]);

  useEffect(() => {
    form.watch((value) => {
      if (!value.startTime) return;
      setStartDate(new Date(value.startTime));
    });
  }, [form.watch, form]);

  const onSubmit = async (values: NewSchedule) => {
    setIsLoading(true);
    const body = {
      Financial: values.Financial,
      startTime: values.startTime,
      endTime: values.endTime,
    };

    try {
      const res = await request("schedule/create", POST(body));
      if (res.success === false) throw new Error(res.message);
      toast("Sucesso", res.message);
      form.reset();

      await refreshSchedule();
      return router.push(`/app/schedule?interface=view`);
    } catch (Error: any) {
      toast("Erro ao registrar agendamento", Error.message);
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
        <div className="p-4 bg-slate-50 dark:bg-slate-900/70 rounded-md w-full">
          <div className="p-4 px-8 bg-white dark:bg-slate-950 rounded-md w-full flex-wrap justify-between items-center flex">
            <div className="max-w-96 w-full gap-4 flex-col flex">
              <FormField
                control={form.control}
                name="Financial"
                render={({ field }) => (
                  <FormItem className="max-w-sm w-full">
                    <FormControl>
                      <FinancialCombobox controller={{ ...field }} toast={toast} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <ScheduleCard financial={financial as Financial} startDate={startDate as Date} />
            </div>
            <div>
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <DayAndHour controller={{ ...field }} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        <Button form="financial-form" type="submit" variant={"gradient"} className="mt-4 w-full" disabled={isLoading}>
          {isLoading && <IconReload className="mr-2 h-4 w-4 animate-spin" />}
          Cadastrar
        </Button>
      </form>
    </Form>
  );
};

export default FinancialForm;
