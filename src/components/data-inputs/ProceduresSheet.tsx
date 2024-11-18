"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/helpers/cn.util";
import { procedureSchema, NewProcedure } from "@/schemas/financial.schema";
import { sheetProcedure } from "@/helpers/dataManager.helper";
import { stringPriceClean } from "@/helpers/formatter.helper";
import type { ProcedureSheet, ProcedureData } from "@/types";

import IconSelectedSquare from "../../../public/SelectedSquare.Icon";
import IconEmptySquare from "../../../public/EmptySquare.Icon";
import IconDental from "../../../public/Dental.Icon";
import IconEdit from "../../../public/EditSquare.Icon";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const ProceduresSheet = ({ handleProcedure, toast }: ProceduresSheetProps) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [procedures, setProcedures] = useState([] as ProcedureSheet[]);
  const [procedure, setProcedure] = useState({} as ProcedureData);
  const [btnValue, setBtnValue] = useState({} as NewProcedure);

  const form = useForm<NewProcedure>({
    resolver: zodResolver(procedureSchema),
    defaultValues: {
      procedure: "",
      status: "pending",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: NewProcedure) => {
    try {
      const body = {
        procedure: procedure.procedure,
        price: stringPriceClean(values.price),
        status: values.status,
      };

      setBtnValue(body);
      handleProcedure(body);
      setOpen(false);
    } catch (e: any) {
      toast("Erro", e.message);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchProcedure = async () => {
      try {
        const data = await sheetProcedure();
        setProcedures(data);
      } catch (error: any) {
        toast("Erro", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProcedure();
  }, [toast]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant={btnValue?.procedure ? "basic" : "ghost"}
          className={cn("min-w-60 w-full h-full gap-4 justify-between items-center flex")}
          aria-expanded={open}
          role="combobox">
          {!btnValue?.procedure && <IconDental className="h-5 w-5 shrink-0" />}
          <span className="gap-2 items-start flex-col flex">
            <span className="">{btnValue?.procedure ? btnValue.procedure : "Selecione um procedimento"}</span>
            <div className="space-x-2">
              {btnValue?.price && <Badge variant={"positive"}>R$ {btnValue.price}</Badge>}
              {btnValue?.status && <Badge>{btnValue.status}</Badge>}
            </div>
          </span>
          {btnValue?.procedure && <IconEdit className="h-5 w-5 shrink-0" />}
        </Button>
      </SheetTrigger>
      <SheetContent className="justify-between flex-col flex">
        <div className="md:space-y-4 space-y-2">
          <SheetHeader>
            <SheetTitle className="text-center text-xl">Procedimentos</SheetTitle>
            <SheetDescription className="text-center">
              Selecione entre os procedimentos cadastrados para adicionar ao orçamento
            </SheetDescription>
          </SheetHeader>

          <Form {...form}>
            {procedure.costPrice && (
              <div className="space-y-2">
                <div className="md:pt-4 pt-2 md:space-y-3 space-y-1 rounded-md border">
                  <div className="w-full md:gap-6 gap-2 flex-wrap justify-center flex">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem className="md:w-1/2 md:max-w-none max-w-32 md:text-sm text-xs">
                          <FormLabel className="md:text-sm text-xs">Preço</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              className="bg-white dark:bg-slate-950/50"
                              placeholder={procedure.savedPrice ? String(procedure.savedPrice) : "Digite aqui..."}
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
                      name="status"
                      render={({ field }) => (
                        <FormItem className="md:w-1/3 md:max-w-none max-w-48 md:text-sm text-xs">
                          <FormLabel className="md:text-sm text-xs">Pagamento</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger className="bg-white dark:bg-slate-950/50">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending" disabled={isLoading}>
                                  Pendente
                                </SelectItem>
                                <SelectItem value="paid" disabled={isLoading}>
                                  Pago
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow className="text-xs">
                        <TableHead className="p-1 text-center">Preço de custo</TableHead>
                        <TableHead className="p-1 text-center">Preço sugerido</TableHead>
                        <TableHead className="p-1 text-center">Preço salvo</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="text-xs">
                        <TableCell className="md:p-3 text-center">R$ {procedure.costPrice}</TableCell>
                        <TableCell className="md:p-3 text-center">R$ {procedure.suggestedPrice}</TableCell>
                        <TableCell className="md:p-3 text-center">R$ {procedure.savedPrice}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                <Button variant={"ghost"} className="w-full" onClick={form.handleSubmit(onSubmit)} disabled={isLoading}>
                  Adicionar
                </Button>
              </div>
            )}
          </Form>

          <Accordion type="single" collapsible className="p-2 px-4 rounded-md border">
            {procedures.map((group) => (
              <AccordionItem key={group.groupName} value={group.groupName}>
                <AccordionTrigger>{group.groupName.toUpperCase()}</AccordionTrigger>
                <AccordionContent className="space-y-1">
                  {group.procedures.map((proc: ProcedureData) => (
                    <div
                      key={proc.procedure}
                      className="p-1 px-4 w-full items-center justify-between flex hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer"
                      onClick={() => setProcedure(proc)}>
                      <span>{proc.procedure}</span>
                      {proc.procedure === procedure.procedure ? (
                        <IconSelectedSquare className={"h-5 w-5"} />
                      ) : (
                        <IconEmptySquare className={"h-5 w-5"} />
                      )}
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <SheetFooter>
          <Button
            variant="defaultSolid"
            className="w-full"
            onClick={() => {
              setOpen(false);
            }}>
            Fechar
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

type ProceduresSheetProps = {
  handleProcedure: (procedure: NewProcedure) => void;
  toast: (title: string, message: string) => void;
};

export default ProceduresSheet;
