"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { request, POST } from "@/helpers/fetch.config";
import { ReloadIcon } from "@radix-ui/react-icons";
import { anamnesisSchema, patientSchema } from "@/schemas/patient.schema";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const Anamnesis = () => {
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
    console.log("rodando");
    setIsLoading(true);
    const body = {
      Patient: id,
      mainComplaint: values.mainComplaint,
      gumsBleedEasily: values.gumsBleedEasily,
      sensitiveTeeth: values.sensitiveTeeth,
      allergicToMedication: values.allergicToMedication,
      medicationAllergy: values.medicationAllergy,
      bitesPenOrPencil: values.bitesPenOrPencil,
      nailsBiting: values.nailsBiting,
      otherHarmfulHabits: values.otherHarmfulHabits,
      pregnant: values.pregnant,
      pregnancyMonth: values.pregnancyMonth,
      breastfeeding: values.breastfeeding,
      underMedicalTreatment: values.underMedicalTreatment,
      medicalTreatmentDetails: values.medicalTreatmentDetails,
      takingMedication: values.takingMedication,
      medicationDetails: values.medicationDetails,
      infectiousDisease: values.infectiousDisease,
      smoker: values.smoker,
      alcoholConsumer: values.alcoholConsumer,
      illnesses: {
        diabetes: values.illnesses.diabetes,
        tuberculosis: values.illnesses.tuberculosis,
        heartProblems: values.illnesses.heartProblems,
        arthritis: values.illnesses.arthritis,
        asthma: values.illnesses.asthma,
        highBloodPressure: values.illnesses.highBloodPressure,
        kidneyProblems: values.illnesses.kidneyProblems,
        liverProblems: values.illnesses.liverProblems,
        otherIllnesses: values.illnesses.otherIllnesses,
      },
      importantHealthInformation: values.importantHealthInformation,
    };

    try {
      const res = await request("patient/anamnesis", POST(body));

      console.log(res);
      console.log("res");

      // form.reset();
    } catch (Error: any) {
      console.log(Error);
    } finally {
      setIsLoading(false);
    }
  }

  const activePatientRender = () => {
    const storedActivePatient = localStorage.getItem("activePatient");
    if (!storedActivePatient) return;
    const activePatient = JSON.parse(storedActivePatient) as z.infer<typeof patientSchema>;

    return (
      <>
        <span className="flex flex-wrap gap-2 text-slate-500 dark:text-slate-400">
          <span className="border p-2 px-4 flex gap-1 rounded-md bg-muted/40 cursor-not-allowed">
            <span className="text-xs font-mono">Name:</span>
            <span className="text-xs font-medium">{activePatient.name}</span>
          </span>
          {activePatient.cpf && (
            <span className="border p-2 px-4 flex gap-1 rounded-md bg-muted/40 cursor-not-allowed">
              <span className="text-xs font-mono">CPF:</span>
              <span className="text-xs font-medium">{activePatient.cpf}</span>
            </span>
          )}
          {activePatient.rg && (
            <span className="border p-2 px-4 flex gap-1 rounded-md bg-muted/40 cursor-not-allowed">
              <span className="text-xs font-mono">RG:</span>
              <span className="text-xs font-medium">{activePatient.rg}</span>
            </span>
          )}
          <span className="border p-2 px-4 flex gap-1 rounded-md bg-muted/40 cursor-not-allowed">
            <span className="text-xs font-mono">Celular:</span>
            <span className="text-xs font-medium">{activePatient.phone}</span>
          </span>
          <span className="border p-2 px-4 flex gap-1 rounded-md bg-muted/40 cursor-not-allowed">
            <span className="text-xs font-mono">Email:</span>
            <span className="text-xs font-medium">{activePatient.email}</span>
          </span>
        </span>
      </>
    );
  };

  const subtitleSeparator = (subtitle: string) => (
    <div className="w-full mt-4">
      <h4 className="text-darkBlue dark:text-skyBlue text-xs font-semibold">{subtitle}</h4>
    </div>
  );

  return (
    <>
      <CardHeader>
        <div className="md:gap-2 mb-4 md:flex-row md:items-baseline flex flex-col">
          <CardTitle className="text-primaryBlue md:text-xl">Anamnese</CardTitle>
          <CardDescription className="">Dados pessoais e histórico clínico.</CardDescription>
        </div>
        {activePatientRender()}
      </CardHeader>

      <CardContent className="p-6 pb-0 items-center justify-center flex flex-col">
        <Form {...form}>
          <form className="gap-4 flex-col flex w-full" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="bg-slate-50 dark:bg-slate-900/70 p-4 gap-4 rounded-md w-full flex-wrap justify-start flex">
              {subtitleSeparator("Histórico Médico")}
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
                    <FormDescription className="md:block hidden"></FormDescription>
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
              {subtitleSeparator("Hábitos Prejudiciais")}
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
              {subtitleSeparator("Condições Especiais")}
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
              {subtitleSeparator("Doenças Crônicas")}
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

            <Button type="submit" variant={"gradient"} className="mt-4 w-full" disabled={isLoading}>
              {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
              Cadastrar
            </Button>
          </form>
        </Form>
      </CardContent>

      <CardFooter></CardFooter>
    </>
  );
};

export default Anamnesis;
