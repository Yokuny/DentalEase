import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import type { PartialFinancial } from "@/types";

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

export const columns: ColumnDef<PartialFinancial>[] = [
  {
    accessorKey: "status",
    header: ({ column }) => SortableComponent({ column, title: "Situação" }),
    cell: ({ row }) => {
      const { status } = row.original;

      return (
        <div className="flex items-center gap-2">
          <Badge variant={status === "Pendente" ? "neutral" : status === "Pago" ? "positive" : "negative"}>
            {status}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "patient",
    header: ({ column }) => SortableComponent({ column, title: "Paciente" }),
  },
  {
    accessorKey: "doctor",
    header: ({ column }) => SortableComponent({ column, title: "Doutor" }),
  },
  {
    accessorKey: "procedures",
    header: "Serviço",
  },
  // {
  //   accessorKey: "price",
  //   header: ({ column }) => SortableComponent({ column, title: "Valor" }),
  //   cell: ({ row }) => {
  //     const { price } = row.original;

  //     return (
  //       <div className="flex items-center gap-2">
  //         <span className="sr-only">Valor</span>
  //         <p className="text-xs">
  //           R$ <span className="text-sm">{price.toFixed(2)}</span>
  //         </p>
  //       </div>
  //     );
  //   },
  // },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const financial = row.original;

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
                <Link href={`/app/financial/${financial._id}`}>Visualizar detalhes</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {/* <DropdownMenuItem onClick={handleCopy(financial.price.toString())}>Copiar preço</DropdownMenuItem> */}
              <DropdownMenuItem onClick={handleCopy(financial.patient)}>Copiar nome do paciente</DropdownMenuItem>
              <DropdownMenuItem onClick={handleCopy(financial.doctor)}>Copiar nome do doutor</DropdownMenuItem>
              <DropdownMenuItem onClick={handleCopy(financial.patient_id)}>Copiar ID do paciente</DropdownMenuItem>
              <DropdownMenuItem onClick={handleCopy(financial.doctor_id)}>Copiar ID do doutor</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
