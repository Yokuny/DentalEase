import Link from "next/link";
import { CaretSortIcon, MixerHorizontalIcon, CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import type { Odontogram } from "@/types";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const handleSorting = (column: any) => column.toggleSorting(column.getIsSorted() === "asc");
const handleCopy = (value: string) => () => navigator.clipboard.writeText(value);

export const columns: ColumnDef<Odontogram>[] = [
  {
    accessorKey: "finished",
    header: ({ column }) => {
      return (
        <div
          className="gap-1 flex items-center cursor-pointer hover:text-darkBlue dark:hover:text-skyBlue"
          onClick={() => handleSorting(column)}>
          Finalizado
          <CaretSortIcon className="h-4 md:w-4 w-3" />
        </div>
      );
    },
    cell: ({ row }) => {
      const { finished } = row.original;
      return (
        <div className="">
          {finished ? (
            <CheckIcon className="h-4 w-4 text-green-500" />
          ) : (
            <Cross2Icon className="h-4 w-4 text-sky-500" />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "patient",
    header: ({ column }) => {
      return (
        <div
          className="gap-1 flex items-center cursor-pointer hover:text-darkBlue dark:hover:text-skyBlue"
          onClick={() => handleSorting(column)}>
          Paciente
          <CaretSortIcon className="h-4 md:w-4 w-3" />
        </div>
      );
    },
  },
  {
    accessorKey: "workToBeDone",
    header: "Serviço",
  },
  {
    accessorKey: "doctor",
    header: ({ column }) => {
      return (
        <div
          className="gap-1 flex items-center cursor-pointer hover:text-darkBlue dark:hover:text-skyBlue"
          onClick={() => handleSorting(column)}>
          Doutor
          <CaretSortIcon className="h-4 md:w-4 w-3" />
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const odontogram = row.original;

      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="primary" className="h-7 w-12 md:w-14 p-0">
                <span className="sr-only">Abrir menu</span>
                <MixerHorizontalIcon className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuItem>
                <Link href={`/app/odontogram/${odontogram._id}?interface=update`}>Visualizar odontograma</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleCopy(odontogram.patient)}>Copiar nome do paciente</DropdownMenuItem>
              <DropdownMenuItem onClick={handleCopy(odontogram.patient_id)}>Copiar ID do paciente</DropdownMenuItem>
              <DropdownMenuItem onClick={handleCopy(odontogram.doctor)}>Copiar nome do doutor</DropdownMenuItem>
              <DropdownMenuItem onClick={handleCopy(odontogram.doctor_id)}>Copiar ID do doutor</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
