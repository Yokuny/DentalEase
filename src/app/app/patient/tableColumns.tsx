import { CaretSortIcon, MixerHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type Patient = {
  id: string;
  name: string;
  phone: string;
  email: string;
  sex: "M" | "F";
  anamnese: boolean;
  intraoral: boolean;
};

const handleSorting = (column: any) => {
  column.toggleSorting(column.getIsSorted() === "asc");
};
const handleClipboardCopy = (value: string) => () => {
  navigator.clipboard.writeText(value);
};

export const columns: ColumnDef<Patient>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "phone",
    header: "Contato",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <div
          className="gap-1 flex items-center cursor-pointer hover:text-blue800 dark:hover:text-blue200"
          onClick={() => handleSorting(column)}>
          Email
          <CaretSortIcon className="h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "sex",
    header: ({ column }) => {
      return (
        <div
          className="gap-1 flex items-center cursor-pointer hover:text-blue800 dark:hover:text-blue200"
          onClick={() => handleSorting(column)}>
          Sexo
          <CaretSortIcon className="h-4 w-4" />
        </div>
      );
    },
  },
  {
    accessorKey: "register",
    header: "Cadastro",
    cell: ({ row }) => {
      const patient = row.original;
      let percentage = 20;
      if (patient.anamnese) percentage += 40;
      if (patient.intraoral) percentage += 40;

      return (
        <div className="flex items-center gap-1">
          <span>{percentage}%</span>
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const patient = row.original;

      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="solid500S" className="h-7 w-full p-0">
                <span className="sr-only">Abrir menu</span>
                <MixerHorizontalIcon className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuItem onClick={handleClipboardCopy(patient.phone)}>
                Copiar telefone
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleClipboardCopy(patient.email)}>Copiar email</DropdownMenuItem>
              <DropdownMenuItem onClick={handleClipboardCopy(patient.name)}>Copiar nome</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Criar agendamento</DropdownMenuItem>
              <DropdownMenuItem>Criar odontograma</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Editar paciente</DropdownMenuItem>
              <DropdownMenuItem>Visualizar</DropdownMenuItem>
              <DropdownMenuItem>Ver histórico</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
