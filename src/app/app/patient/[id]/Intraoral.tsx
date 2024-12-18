"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { request, POST } from "@/helpers/fetch.config";
import { intraoralSchema } from "@/schemas/patient.schema";
import { refreshPatient } from "@/helpers/dataManager.helper";
import type { ToastProps } from "@/types";

import IconReload from "../../../../../public/Reload.Icon";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import ActivePatientRender from "@/components/app/patient/ActivePatientRender";
import SubtitleSeparator from "@/components/app/patient/SubtitleSeparator";

const Intraoral = ({ toast }: ToastProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  const searchParams = useSearchParams();
  const intraoralParam = searchParams.get("interface");

  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    intraoralParam === "intraoral" ? setOpen(true) : setOpen(false);
  }, [intraoralParam]);

  const form = useForm<z.infer<typeof intraoralSchema>>({
    resolver: zodResolver(intraoralSchema),
    defaultValues: {
      hygiene: "normal",
      halitosis: "ausente",
      tartar: "ausente",
      gums: "normal",
      mucosa: "normal",
      tongue: "",
      palate: "",
      oralFloor: "",
      lips: "",
      otherObservations: "",
    },
    mode: "onChange",
  });

  async function onSubmit(values: z.infer<typeof intraoralSchema>) {
    setIsLoading(true);
    const body = {
      Patient: id,
      hygiene: values.hygiene,
      halitosis: values.halitosis,
      tartar: values.tartar,
      gums: values.gums,
      mucosa: values.mucosa,
      tongue: values.tongue,
      palate: values.palate,
      oralFloor: values.oralFloor,
      lips: values.lips,
      otherObservations: values.otherObservations,
    };

    try {
      const res = await request("patient/intraoral", POST(body));
      toast("Sucesso", res.message);

      form.reset();
      await refreshPatient();
      router.push(`/app/patient`);
    } catch (Error: any) {
      toast("Erro", Error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(false);
        router.push(`/app/patient`);
      }}>
      <DialogContent className="md:p-6 p-0 pb-0 justify-center flex flex-col">
        <DialogHeader>
          <div className="md:gap-2 mb-4 md:flex-row md:items-baseline flex flex-col">
            <DialogTitle className="text-primaryBlue md:text-xl">Intraoral</DialogTitle>
          </div>
          <ActivePatientRender />
        </DialogHeader>
        <Form {...form}>
          <form
            id="intraoral-form"
            className="gap-4 flex-col flex w-full"
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(form.getValues());
            }}>
            <div className="bg-slate-50 dark:bg-slate-900/70 p-4 gap-4 rounded-md w-full flex-wrap justify-start flex">
              <SubtitleSeparator subtitle="Avaliação da saúde bucal" />
              <FormField
                control={form.control}
                name="hygiene"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Higiene</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="bg-white dark:bg-slate-950/50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem className="text-xs" disabled={isLoading} value={"normal"}>
                            Normal
                          </SelectItem>
                          <SelectItem className="text-xs" disabled={isLoading} value={"regular"}>
                            Regular
                          </SelectItem>
                          <SelectItem className="text-xs" disabled={isLoading} value={"deficiente"}>
                            Deficiente
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="halitosis"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Halito</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="bg-white dark:bg-slate-950/50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem className="text-xs" disabled={isLoading} value={"ausente"}>
                            Ausente
                          </SelectItem>
                          <SelectItem className="text-xs" disabled={isLoading} value={"moderada"}>
                            Moderado
                          </SelectItem>
                          <SelectItem className="text-xs" disabled={isLoading} value={"forte"}>
                            Forte
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tartar"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tartaro</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="bg-white dark:bg-slate-950/50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem className="text-xs" disabled={isLoading} value={"ausente"}>
                            Ausente
                          </SelectItem>
                          <SelectItem className="text-xs" disabled={isLoading} value={"pouco"}>
                            Pouco
                          </SelectItem>
                          <SelectItem className="text-xs" disabled={isLoading} value={"muito"}>
                            Muito
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gums"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gengiva</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="bg-white dark:bg-slate-950/50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem className="text-xs" disabled={isLoading} value={"normal"}>
                            Normal
                          </SelectItem>
                          <SelectItem className="text-xs" disabled={isLoading} value={"gengivite"}>
                            Gengivite
                          </SelectItem>
                          <SelectItem className="text-xs" disabled={isLoading} value={"periodontite"}>
                            Periodontite
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mucosa"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mucosa</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="bg-white dark:bg-slate-950/50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem className="text-xs" disabled={isLoading} value={"normal"}>
                            Normal
                          </SelectItem>
                          <SelectItem className="text-xs" disabled={isLoading} value={"alterada"}>
                            Alterada
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/70 p-4 gap-4 rounded-md w-full flex-wrap justify-start flex">
              <SubtitleSeparator subtitle="Exame das partes da boca" />
              <FormField
                control={form.control}
                name="tongue"
                render={({ field }) => (
                  <FormItem className="md:w-52 w-full">
                    <FormLabel>Língua</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white dark:bg-slate-950/50"
                        type="text"
                        placeholder="Como está a língua?"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="palate"
                render={({ field }) => (
                  <FormItem className="md:w-52 w-full">
                    <FormLabel>Céu da boca</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white dark:bg-slate-950/50"
                        type="text"
                        placeholder="Como está o céu da boca?"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="oralFloor"
                render={({ field }) => (
                  <FormItem className="md:w-52 w-full">
                    <FormLabel>Assoalho bucal</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white dark:bg-slate-950/50"
                        type="text"
                        placeholder="Descreva o assoalho bucal."
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lips"
                render={({ field }) => (
                  <FormItem className="md:w-52 w-full">
                    <FormLabel>Lábios</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white dark:bg-slate-950/50"
                        type="text"
                        placeholder="Como estão os lábios?"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="otherObservations"
                render={({ field }) => (
                  <FormItem className="md:w-64 w-full">
                    <FormLabel>Outras Observações</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white dark:bg-slate-950/50"
                        type="text"
                        placeholder="Outros sintomas? Preocupações?"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full md:p-0 px-4 flex md:gap-4 gap-2">
              <Button type="submit" variant={"gradient"} className="mt-4 w-3/4" disabled={isLoading}>
                {isLoading && <IconReload className="mr-2 h-4 w-4 animate-spin" />}
                Cadastrar
              </Button>
              <Button
                form="intraoral-form"
                type="button"
                variant={"outline"}
                className="mt-4 w-1/4 text-darkBlue"
                onClick={() => router.back()}
                disabled={isLoading}>
                Voltar
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default Intraoral;
