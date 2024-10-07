import { ColumnDef } from "@tanstack/react-table";
import { formatPhone } from "@/helpers/formatter.helper";
import type { ClinicProcedure } from "@/types";

import IconMixer from "../../../../../public/Mixer.Icon";
import IconSort from "../../../../../public/Sort.Icon";
import IconCheck from "../../../../../public/Check.Icon";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const handleSorting = (column: any) => {
  column.toggleSorting(column.getIsSorted() === "asc");
};

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

export const columns: ColumnDef<ClinicProcedure>[] = [
  {
    accessorKey: "procedure",
    header: ({ column }) => SortableComponent({ column, title: "Procedimento" }),
    cell: ({ row }) => <div>{row.original.procedure}</div>,
  },
  {
    accessorKey: "grouper",
    header: ({ column }) => SortableComponent({ column, title: "Agrupador" }),
    cell: ({ row }) => <div>{row.original.grouper}</div>,
  },
  {
    accessorKey: "cost_price",
    header: ({ column }) => SortableComponent({ column, title: "Custo" }),
    cell: ({ row }) => (
      <Badge className="gap-2 flex opacity-90" variant={"alert"}>
        <span>{row.original.cost_price}</span>
        <span>R$</span>
      </Badge>
    ),
  },
  {
    accessorKey: "suggested_price",
    header: ({ column }) => SortableComponent({ column, title: "Sugerido" }),
    cell: ({ row }) => (
      <Badge className="gap-2 flex opacity-90" variant={"positive"}>
        <span>{row.original.suggested_price}</span>
        <span>R$</span>
      </Badge>
    ),
  },
  {
    accessorKey: "saved_price",
    header: ({ column }) => SortableComponent({ column, title: "Salvo" }),
    cell: ({ row }) => (
      <Badge className="gap-2 flex opacity-90">
        <span>{row.original.saved_price}</span>
        <span>R$</span>
      </Badge>
    ),
  },
];
