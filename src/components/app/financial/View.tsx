"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PUT, request } from "@/helpers/fetch.config";
import { extractData, financialStatus } from "@/helpers/formatter.helper";
import { requestFinancial } from "@/helpers/requestById.helper";
import { financialStatusSchema, FinancialStatus } from "@/schemas/financial.schema";
import type { FullFinancial } from "@/types";

import IconRight from "../../../../public/Right.Icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { refreshFinancial } from "@/helpers/dataManager.helper";
import { Button } from "@/components/ui/button";

const View = ({ id }: { id: string }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [financial, setFinancial] = useState<FullFinancial | null>(null);
  const [open, setOpen] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    setIsLoading(true);
    const fetchFinancial = async () => {
      try {
        const data = await requestFinancial(id);
        setFinancial(data);
      } catch (error: any) {
        toast({ title: "Erro", description: error.message });
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchFinancial();
  }, [id, toast]);

  const form = useForm<FinancialStatus>({
    resolver: zodResolver(financialStatusSchema),
    defaultValues: {
      status: "pending",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: FinancialStatus) => {
    setIsLoading(true);
    const body: FinancialStatus = {
      status: values.status,
    };

    try {
      const res = await request(`financial/${id}/status`, PUT(body));
      if (res.success === false) throw new Error(res.message);
      toast({ title: "Sucesso", description: res.message });

      form.reset();
      setOpen(false);
      await refreshFinancial();
      window.location.reload();
    } catch (error: any) {
      toast({ title: "Erro ao salvar status de pagamento", description: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="px-2 py-1.5 text-sm">Visualizar detalhes</DialogTrigger>
      <DialogContent>
        <DialogHeader className="space-y-0">
          <div className="mb-4 gap-4 items-center justify-between flex">
            <DialogTitle className="text-skyBlue md:text-2xl tracking-wide">Registro Financeiro</DialogTitle>

            <Form {...form}>
              <div className=" items-end flex">
                {isEditing && (
                  <Button
                    type="submit"
                    variant={"defaultSolid"}
                    onClick={form.handleSubmit(onSubmit)}
                    className="px-4 py-2 text-sm font-normal text-slate-700 dark:text-slate-200">
                    Salvar
                  </Button>
                )}
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="px-6">
                      <FormLabel>Status de pagamento</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value: FinancialStatus["status"]) => {
                            setIsEditing(true);
                            form.setValue("status", value);
                          }}
                          defaultValue={field.value}>
                          <SelectTrigger className="bg-white dark:bg-slate-950/50">
                            <SelectValue className="text-xs">{financialStatus[field.value]}</SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem className="text-xs" disabled={isLoading} value={"paid"}>
                              Pago
                            </SelectItem>
                            <SelectItem className="text-xs" disabled={isLoading} value={"pending"}>
                              Pendente
                            </SelectItem>
                            <SelectItem className="text-xs" disabled={isLoading} value={"partial"}>
                              Parcial
                            </SelectItem>
                            <SelectItem className="text-xs" disabled={isLoading} value={"canceled"}>
                              Cancelado
                            </SelectItem>
                            <SelectItem className="text-xs" disabled={isLoading} value={"refund"}>
                              Reembolsado
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </Form>
          </div>

          <div className="px-6 text-sm tracking-tight space-y-6">
            <p className="font-semibold text-muted-foreground">Atendimento</p>
            <div className="space-x-6 items-center flex">
              <div className="items-center space-x-4 flex">
                <Avatar className="group relative justify-center items-center flex border">
                  <AvatarImage src={financial?.Doctor?.image || ""} alt="img paciente" className="rounded-full" />
                  <AvatarFallback>{financial?.Doctor?.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium leading-none">{financial?.Doctor?.name}</div>
                  <div className="text-muted-foreground">Dentista</div>
                </div>
              </div>
              <div className="h-10 p-1 rounded-lg border items-center flex">
                <IconRight />
              </div>
              <div className="items-center space-x-4 flex">
                <Avatar className="group relative justify-center items-center flex">
                  <AvatarImage src={financial?.Patient?.image || ""} alt="img paciente" className="rounded-full" />
                  <AvatarFallback>{financial?.Patient?.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium leading-none">{financial?.Patient?.name}</div>
                  <div className="text-muted-foreground">Paciente</div>
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>
        <div className="p-6 md:gap-6 gap-2 flex-wrap flex">
          <div className="w-fit p-6 rounded-xl border">
            <Table>
              <TableHeader>
                <TableRow className="font-semibold leading-none tracking-tight">
                  <TableCell>Procedimento</TableCell>
                  <TableCell>Preço</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {financial?.procedures &&
                  financial?.procedures.map((procedure) => (
                    <TableRow key={procedure.procedure}>
                      <TableCell>{procedure.procedure}</TableCell>
                      <TableCell>
                        <span className="gap-1 items-end flex">
                          <span className="text-xs leading-none">R$</span>
                          <p className="leading-none">{procedure.price}</p>
                        </span>
                      </TableCell>
                      <TableCell>{financialStatus[procedure.status]}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
          <div className="p-6 max-w-48 w-full">
            <div className="leading-none text-sm tracking-tight space-y-4">
              <div className="space-y-2">
                <p className="font-semibold">Total</p>
                <span className="items-end gap-1 flex">
                  <span className="text-xs leading-none">R$</span>
                  <p>{financial?.price}</p>
                </span>
              </div>
              <Separator />
              <div className="space-y-2">
                <p className="font-semibold">Status</p>
                <p>{financialStatus[financial?.status || ""]}</p>
              </div>
              <Separator />
              <div className="space-y-2">
                <p className="font-semibold">Criado em</p>
                <p>{extractData(financial?.createdAt, "")}</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default View;
