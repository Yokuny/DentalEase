"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { scheduleSchema } from "@/schemas/schedule.schema";
import { request, POST } from "@/helpers/fetch.config";
import router from "next/router";
import type { ToastProps } from "@/types";

import IconReload from "../../../../public/Reload.Icon";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

import ServiceCombobox from "@/components/data-inputs/ServiceCombobox";
import ScheduleCard from "./ScheduleCard";
import DayAndHour from "./DayAndHour";

type Service = {
  _id: string;
  patient: string;
  doctor: string;
  price: number;
  workToBeDone: string;
  status: "Cancelado" | "Pago" | "Pendente";
};

const ServiceForm = ({ toast }: ToastProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [service, setService] = useState<Service>();
  const [startDate, setStartDate] = useState<Date>();

  const form = useForm<z.infer<typeof scheduleSchema>>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      Service: "",
      startTime: "",
    },
  });

  useEffect(() => {
    form.watch((value) => {
      if (!value.Service) return;

      const services = localStorage.getItem("services");
      if (!services) return;
      const parsedServices = JSON.parse(services);

      const selectedService = parsedServices.find((service: Service) => service._id === value.Service);
      if (!selectedService) return;

      setService(selectedService);
    });
  }, [form.watch, form]);

  useEffect(() => {
    form.watch((value) => {
      if (!value.startTime) return;
      setStartDate(new Date(value.startTime));
    });
  }, [form.watch, form]);

  async function onSubmit(values: z.infer<typeof scheduleSchema>) {
    setIsLoading(true);
    const body = {
      Service: values.Service,
      startTime: values.startTime,
      endTime: values.endTime,
    };

    console.log(body);
    try {
      const res = await request("schedule/create", POST(body));
      if (res.success === false) throw new Error(res.message);
      toast("Sucesso", "Agendamento realizado");
      form.reset();
      return router.push(`/schedule?interface=view`);
    } catch (Error: any) {
      toast("Erro ao registrar agendamento", Error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        id="service-form"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(form.getValues());
        }}
        className="gap-4 flex-wrap justify-between flex">
        <div className="p-4 bg-slate-50 dark:bg-slate-900/70 rounded-md w-full">
          <div className="p-4 px-8 bg-white dark:bg-slate-950 rounded-md w-full flex-wrap justify-between items-center flex">
            <div className="max-w-96 w-full gap-4 flex-col flex">
              <FormField
                control={form.control}
                name="Service"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <ServiceCombobox controller={{ ...field }} toast={toast} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <ScheduleCard service={service as Service} startDate={startDate as Date} />
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
        <Button form="service-form" type="submit" variant={"gradient"} className="mt-4 w-full" disabled={isLoading}>
          {isLoading && <IconReload className="mr-2 h-4 w-4 animate-spin" />}
          Cadastrar
        </Button>
      </form>
    </Form>
  );
};

export default ServiceForm;
