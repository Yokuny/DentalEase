import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import type { PartialOdontogram } from "@/types";

import IconMixer from "../../../../public/Mixer.Icon";
import IconSort from "../../../../public/Sort.Icon";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

const SortableComponent = ({ column, title }: { column: any; title: string }) => {
  return (
    <div
      className="gap-1 flex items-center cursor-pointer hover:text-darkBlue dark:hover:text-skyBlue"
      onClick={() => handleSorting(column)}>
      {title}
      <IconSort className="h-3 w-3" />
    </div>
  );
};

export const columns: ColumnDef<PartialOdontogram>[] = [
  {
    accessorKey: "finished",
    header: ({ column }) => SortableComponent({ column, title: "Finalizado" }),
    cell: ({ row }) => (
      <Badge variant={row.original.finished ? "neutral" : "positive"}>{row.original.finished ? "Sim" : "Não"}</Badge>
    ),
  },
  {
    accessorKey: "patient",
    header: ({ column }) => SortableComponent({ column, title: "Paciente" }),
  },
  {
    accessorKey: "procedures",
    header: "Serviço",
  },
  {
    accessorKey: "doctor",
    header: ({ column }) => SortableComponent({ column, title: "Doutor" }),
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
                <IconMixer className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuItem>
                <Link href={`/app/odontogram/${odontogram._id}?interface=update`}>Visualizar odontograma</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleCopy(odontogram.patient)}>Copiar nome do paciente</DropdownMenuItem>
              <DropdownMenuItem onClick={handleCopy(odontogram.doctor)}>Copiar nome do doutor</DropdownMenuItem>
              <DropdownMenuItem onClick={handleCopy(odontogram.patient_id)}>Copiar ID do paciente</DropdownMenuItem>
              <DropdownMenuItem onClick={handleCopy(odontogram.doctor_id)}>Copiar ID do doutor</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
