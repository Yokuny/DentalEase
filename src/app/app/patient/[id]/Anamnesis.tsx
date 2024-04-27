"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { request, POST } from "@/helpers/fetch.config";
import { ReloadIcon } from "@radix-ui/react-icons";
import { anamnesisSchema } from "@/schemas/patient.schema";
import { stringToBoolean } from "@/helpers/validade.helper";
import type { ToastProps } from "@/types";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import ActivePatientRender from "@/components/app/patient/ActivePatientRender";
import SubtitleSeparator from "@/components/app/patient/SubtitleSeparator";

const Anamnesis = ({ toast }: ToastProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  const { id } = useParams();

  const form = useForm<z.infer<typeof anamnesisSchema>>({
    resolver: zodResolver(anamnesisSchema),
    defaultValues: {
      mainComplaint: "",
      gumsBleedEasily: "false",
      sensitiveTeeth: "false",
      allergicToMedication: "false",
      medicationAllergy: "",
      bitesPenOrPencil: "false",
      nailsBiting: "false",
      otherHarmfulHabits: "",
      pregnant: "false",
      pregnancyMonth: 0,
      breastfeeding: "false",
      underMedicalTreatment: "false",
      medicalTreatmentDetails: "",
      takingMedication: "false",
      medicationDetails: "",
      infectiousDisease: "",
      smoker: "false",
      alcoholConsumer: "false",
      illnesses: {
        diabetes: "false",
        tuberculosis: "false",
        heartProblems: "false",
        arthritis: "false",
        asthma: "false",
        highBloodPressure: "false",
        kidneyProblems: "false",
        liverProblems: "false",
        otherIllnesses: "",
      },
      importantHealthInformation: "",
    },
  });

  async function onSubmit(values: z.infer<typeof anamnesisSchema>) {
    setIsLoading(true);
    const body = {
      Patient: id,
      mainComplaint: values.mainComplaint,
      gumsBleedEasily: stringToBoolean(values.gumsBleedEasily),
      sensitiveTeeth: stringToBoolean(values.sensitiveTeeth),
      allergicToMedication: stringToBoolean(values.allergicToMedication),
      medicationAllergy: values.medicationAllergy,
      bitesPenOrPencil: stringToBoolean(values.bitesPenOrPencil),
      nailsBiting: stringToBoolean(values.nailsBiting),
      otherHarmfulHabits: values.otherHarmfulHabits,
      pregnant: stringToBoolean(values.pregnant),
      pregnancyMonth: values.pregnancyMonth,
      breastfeeding: stringToBoolean(values.breastfeeding),
      underMedicalTreatment: stringToBoolean(values.underMedicalTreatment),
      medicalTreatmentDetails: values.medicalTreatmentDetails,
      takingMedication: stringToBoolean(values.takingMedication),
      medicationDetails: values.medicationDetails,
      infectiousDisease: values.infectiousDisease,
      smoker: stringToBoolean(values.smoker),
      alcoholConsumer: stringToBoolean(values.alcoholConsumer),
      illnesses: {
        diabetes: stringToBoolean(values.illnesses.diabetes),
        tuberculosis: stringToBoolean(values.illnesses.tuberculosis),
        heartProblems: stringToBoolean(values.illnesses.heartProblems),
        arthritis: stringToBoolean(values.illnesses.arthritis),
        asthma: stringToBoolean(values.illnesses.asthma),
        highBloodPressure: stringToBoolean(values.illnesses.highBloodPressure),
        kidneyProblems: stringToBoolean(values.illnesses.kidneyProblems),
        liverProblems: stringToBoolean(values.illnesses.liverProblems),
        otherIllnesses: values.illnesses.otherIllnesses,
      },
      importantHealthInformation: values.importantHealthInformation,
    };

    try {
      const res = await request("patient/anamnesis", POST(body));
      toast("Sucesso", res.message);
      router.push(`/app/patient`);
    } catch (Error: any) {
      toast("Erro", Error.message);
    } finally {
      form.reset();
      setIsLoading(false);
    }
  }

  return (
    <>
      <CardHeader>
        <div className="md:gap-2 mb-4 md:flex-row md:items-baseline flex flex-col">
          <CardTitle className="text-primaryBlue md:text-xl tracking-tight">Anamnese</CardTitle>
          <CardDescription className="">Dados pessoais e histórico clínico.</CardDescription>
        </div>
        <ActivePatientRender />
      </CardHeader>

      <CardContent className="md:p-6 p-0 pb-0 items-center justify-center flex flex-col">
        <Form {...form}>
          <form
            id="anamnesis-form"
            className="gap-4 flex-col flex w-full"
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(form.getValues());
            }}>
            <div className="bg-slate-50 dark:bg-slate-900/70 p-4 gap-4 rounded-md w-full flex-wrap justify-start flex">
              <SubtitleSeparator subtitle="Histórico Médico" />
              <FormField
                control={form.control}
                name="mainComplaint"
                render={({ field }) => (
                  <FormItem className="md:w-1/4 md:max-w-none max-w-48 ">
                    <FormLabel>Queixa principal</FormLabel>
                    <FormControl className="md:text-sm text-xs">
                      <Input
                        className="bg-white dark:bg-slate-950/50"
                        placeholder="Descreva a queixa principal do paciente..."
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
                name="infectiousDisease"
                render={({ field }) => (
                  <FormItem className="md:w-1/5 md:max-w-none max-w-36">
                    <FormLabel>Doença infecciosa</FormLabel>
                    <FormControl className="md:text-sm text-xs">
                      <Input
                        className="bg-white dark:bg-slate-950/50"
                        placeholder="Digite a doença infecciosa..."
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
                name="importantHealthInformation"
                render={({ field }) => (
                  <FormItem className="md:w-1/4 md:max-w-none max-w-40">
                    <FormLabel>Informações importantes de saúde</FormLabel>
                    <FormControl className="md:text-sm text-xs">
                      <Input
                        className="bg-white dark:bg-slate-950/50"
                        placeholder="Digite informações importantes de saúde..."
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/70 p-4 gap-4 rounded-md w-full flex-wrap justify-start flex">
              <SubtitleSeparator subtitle="Hábitos Prejudiciais" />
              <FormField
                control={form.control}
                name="smoker"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fumante</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl className="md:text-sm text-xs">
                          <SelectTrigger className="bg-white dark:bg-slate-950/50">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem className="text-xs" disabled={isLoading} value={"true"}>
                            Sim
                          </SelectItem>
                          <SelectItem className="text-xs" disabled={isLoading} value={"false"}>
                            Não
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
                name="alcoholConsumer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Consumidor de álcool</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl className="md:text-sm text-xs">
                          <SelectTrigger className="bg-white dark:bg-slate-950/50">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem className="text-xs" disabled={isLoading} value={"true"}>
                            Sim
                          </SelectItem>
                          <SelectItem className="text-xs" disabled={isLoading} value={"false"}>
                            Não
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
                name="bitesPenOrPencil"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rói caneta ou lápis</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl className="md:text-sm text-xs">
                          <SelectTrigger className="bg-white dark:bg-slate-950/50">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem className="text-xs" disabled={isLoading} value={"true"}>
                            Sim
                          </SelectItem>
                          <SelectItem className="text-xs" disabled={isLoading} value={"false"}>
                            Não
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
                name="nailsBiting"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rói unhas</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl className="md:text-sm text-xs">
                          <SelectTrigger className="bg-white dark:bg-slate-950/50">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem className="text-xs" disabled={isLoading} value={"true"}>
                            Sim
                          </SelectItem>
                          <SelectItem className="text-xs" disabled={isLoading} value={"false"}>
                            Não
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
                name="otherHarmfulHabits"
                render={({ field }) => (
                  <FormItem className="md:w-1/4 md:max-w-none max-w-48">
                    <FormLabel>Outros hábitos prejudiciais</FormLabel>
                    <FormControl className="md:text-sm text-xs">
                      <Input
                        className="bg-white dark:bg-slate-950/50"
                        placeholder="Descreva outros hábitos prejudiciais..."
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/70 p-4 gap-4 rounded-md w-full flex-wrap justify-start flex">
              <SubtitleSeparator subtitle="Condições Especiais" />
              <FormField
                control={form.control}
                name="allergicToMedication"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alergia a medicamentos</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl className="md:text-sm text-xs">
                          <SelectTrigger className="bg-white dark:bg-slate-950/50">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem className="text-xs" disabled={isLoading} value={"true"}>
                            Sim
                          </SelectItem>
                          <SelectItem className="text-xs" disabled={isLoading} value={"false"}>
                            Não
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.watch("allergicToMedication") === "true" && (
                <FormField
                  control={form.control}
                  name="medicationAllergy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alergia a medicamentos</FormLabel>
                      <FormControl className="md:text-sm text-xs">
                        <Input
                          className="bg-white dark:bg-slate-950/50"
                          placeholder="Descreva a alergia a medicamentos..."
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="gumsBleedEasily"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gengiva sangra</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl className="md:text-sm text-xs">
                          <SelectTrigger className="bg-white dark:bg-slate-950/50">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem className="text-xs" disabled={isLoading} value={"true"}>
                            Sim
                          </SelectItem>
                          <SelectItem className="text-xs" disabled={isLoading} value={"false"}>
                            Não
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
                name="sensitiveTeeth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dentes sensíveis</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl className="md:text-sm text-xs">
                          <SelectTrigger className="bg-white dark:bg-slate-950/50">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem className="text-xs" disabled={isLoading} value={"true"}>
                            Sim
                          </SelectItem>
                          <SelectItem className="text-xs" disabled={isLoading} value={"false"}>
                            Não
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
                name="pregnant"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Grávida</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl className="md:text-sm text-xs">
                          <SelectTrigger className="bg-white dark:bg-slate-950/50">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem className="text-xs" disabled={isLoading} value={"true"}>
                            Sim
                          </SelectItem>
                          <SelectItem className="text-xs" disabled={isLoading} value={"false"}>
                            Não
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.watch("pregnant") === "true" && (
                <FormField
                  control={form.control}
                  name="pregnancyMonth"
                  render={({ field }) => (
                    <FormItem className="md:w-32 md:max-w-none max-w-32">
                      <FormLabel>Mês de gestação</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-white dark:bg-slate-950/50"
                          type="number"
                          min={0}
                          max={10}
                          placeholder="Digite o mês de gestação..."
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="breastfeeding"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amamentando</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl className="md:text-sm text-xs">
                          <SelectTrigger className="bg-white dark:bg-slate-950/50">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem className="text-xs" disabled={isLoading} value={"true"}>
                            Sim
                          </SelectItem>
                          <SelectItem className="text-xs" disabled={isLoading} value={"false"}>
                            Não
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
                name="underMedicalTreatment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Em tratamento médico</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl className="md:text-sm text-xs">
                          <SelectTrigger className="bg-white dark:bg-slate-950/50">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem className="text-xs" disabled={isLoading} value={"true"}>
                            Sim
                          </SelectItem>
                          <SelectItem className="text-xs" disabled={isLoading} value={"false"}>
                            Não
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.watch("underMedicalTreatment") === "true" && (
                <FormField
                  control={form.control}
                  name="medicalTreatmentDetails"
                  render={({ field }) => (
                    <FormItem className="md:w-1/4 md:max-w-none max-w-48">
                      <FormLabel>Detalhes do tratamento médico</FormLabel>
                      <FormControl className="md:text-sm text-xs">
                        <Input
                          className="bg-white dark:bg-slate-950/50"
                          placeholder="Descreva os detalhes do tratamento médico..."
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="takingMedication"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tomando medicamentos</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl className="md:text-sm text-xs">
                          <SelectTrigger className="bg-white dark:bg-slate-950/50">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem className="text-xs" disabled={isLoading} value={"true"}>
                            Sim
                          </SelectItem>
                          <SelectItem className="text-xs" disabled={isLoading} value={"false"}>
                            Não
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.watch("takingMedication") === "true" && (
                <FormField
                  control={form.control}
                  name="medicationDetails"
                  render={({ field }) => (
                    <FormItem className="md:w-1/4 md:max-w-none max-w-48">
                      <FormLabel>Detalhes dos medicamentos</FormLabel>
                      <FormControl className="md:text-sm text-xs">
                        <Input
                          className="bg-white dark:bg-slate-950/50"
                          placeholder="Descreva os detalhes dos medicamentos..."
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/70 p-4 gap-4 rounded-md w-full flex-wrap justify-start flex">
              <SubtitleSeparator subtitle="Doenças Crônicas" />
              <FormField
                control={form.control}
                name="illnesses.diabetes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Diabetes</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl className="md:text-sm text-xs">
                          <SelectTrigger className="bg-white dark:bg-slate-950/50">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem className="text-xs" disabled={isLoading} value={"true"}>
                            Sim
                          </SelectItem>
                          <SelectItem className="text-xs" disabled={isLoading} value={"false"}>
                            Não
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
                name="illnesses.tuberculosis"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tuberculose</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl className="md:text-sm text-xs">
                          <SelectTrigger className="bg-white dark:bg-slate-950/50">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem className="text-xs" disabled={isLoading} value={"true"}>
                            Sim
                          </SelectItem>
                          <SelectItem className="text-xs" disabled={isLoading} value={"false"}>
                            Não
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
                name="illnesses.heartProblems"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Problemas cardíacos</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl className="md:text-sm text-xs">
                          <SelectTrigger className="bg-white dark:bg-slate-950/50">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem className="text-xs" disabled={isLoading} value={"true"}>
                            Sim
                          </SelectItem>
                          <SelectItem className="text-xs" disabled={isLoading} value={"false"}>
                            Não
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
                name="illnesses.arthritis"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Artrite</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl className="md:text-sm text-xs">
                          <SelectTrigger className="bg-white dark:bg-slate-950/50">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem className="text-xs" disabled={isLoading} value={"true"}>
                            Sim
                          </SelectItem>
                          <SelectItem className="text-xs" disabled={isLoading} value={"false"}>
                            Não
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
                name="illnesses.asthma"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Asma</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl className="md:text-sm text-xs">
                          <SelectTrigger className="bg-white dark:bg-slate-950/50">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem className="text-xs" disabled={isLoading} value={"true"}>
                            Sim
                          </SelectItem>
                          <SelectItem className="text-xs" disabled={isLoading} value={"false"}>
                            Não
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
                name="illnesses.highBloodPressure"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pressão alta</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl className="md:text-sm text-xs">
                          <SelectTrigger className="bg-white dark:bg-slate-950/50">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem className="text-xs" disabled={isLoading} value={"true"}>
                            Sim
                          </SelectItem>
                          <SelectItem className="text-xs" disabled={isLoading} value={"false"}>
                            Não
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
                name="illnesses.kidneyProblems"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Problemas renais</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl className="md:text-sm text-xs">
                          <SelectTrigger className="bg-white dark:bg-slate-950/50">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem className="text-xs" disabled={isLoading} value={"true"}>
                            Sim
                          </SelectItem>
                          <SelectItem className="text-xs" disabled={isLoading} value={"false"}>
                            Não
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
                name="illnesses.liverProblems"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Problemas hepáticos</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl className="md:text-sm text-xs">
                          <SelectTrigger className="bg-white dark:bg-slate-950/50">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem className="text-xs" disabled={isLoading} value={"true"}>
                            Sim
                          </SelectItem>
                          <SelectItem className="text-xs" disabled={isLoading} value={"false"}>
                            Não
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
                name="illnesses.otherIllnesses"
                render={({ field }) => (
                  <FormItem className="md:w-1/4 md:max-w-none max-w-48">
                    <FormLabel>Outras doenças</FormLabel>
                    <FormControl className="md:text-sm text-xs">
                      <Input
                        className="bg-white dark:bg-slate-950/50"
                        placeholder="Descreva outras doenças..."
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
              <Button
                form="anamnesis-form"
                type="submit"
                variant={"gradient"}
                className="mt-4 w-3/4"
                disabled={isLoading}>
                {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                Cadastrar
              </Button>
              <Button
                type="button"
                variant={"outlineBlue"}
                className="mt-4 w-1/4 text-darkBlue"
                onClick={() => router.back()}
                disabled={isLoading}>
                Voltar
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>

      <CardFooter></CardFooter>
    </>
  );
};

export default Anamnesis;
