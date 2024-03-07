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
const handleCopy = (value: string) => () => {
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
          className="gap-1 flex items-center cursor-pointer hover:text-darkBlue dark:hover:text-skyBlue"
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
          className="gap-1 flex items-center cursor-pointer hover:text-darkBlue dark:hover:text-skyBlue"
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
              <Button variant="primary" className="h-7 w-full p-0">
                <span className="sr-only">Abrir menu</span>
                <MixerHorizontalIcon className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              {!patient.anamnese && <DropdownMenuItem>Cadastrar anamnese</DropdownMenuItem>}
              {!patient.intraoral && <DropdownMenuItem>Cadastrar intraoral</DropdownMenuItem>}
              {(!patient.anamnese || !patient.intraoral) && <DropdownMenuSeparator />}
              <DropdownMenuItem>Criar odontograma</DropdownMenuItem>
              <DropdownMenuItem>Criar agendamento</DropdownMenuItem>
              <DropdownMenuItem>Visualizar registro</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleCopy(patient.phone)}>Copiar telefone</DropdownMenuItem>
              <DropdownMenuItem onClick={handleCopy(patient.email)}>Copiar email</DropdownMenuItem>
              <DropdownMenuItem onClick={handleCopy(patient.name)}>Copiar nome</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
