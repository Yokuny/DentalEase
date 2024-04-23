import Link from "next/link";
import { CaretSortIcon, MixerHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import type { Patient } from "@/types";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const handleSorting = (column: any) => {
  column.toggleSorting(column.getIsSorted() === "asc");
};
const handleCopy = (value: string) => () => {
  navigator.clipboard.writeText(value);
};

const setActivePatient = (values: Patient) => {
  const patient = {
    name: values.name,
    email: values.email,
    phone: values.phone,
  };
  localStorage.setItem("activePatient", JSON.stringify(patient));
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
          <CaretSortIcon className="h-4 md:w-4 w-3" />
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
          <CaretSortIcon className="h-4 md:w-4 w-3" />
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
              <Button variant="primary" className="h-7 w-12 md:w-14 p-0">
                <span className="sr-only">Abrir menu</span>
                <MixerHorizontalIcon className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              {!patient.anamnese && (
                <DropdownMenuItem>
                  <Link
                    href={`/app/patient/${patient._id}?interface=anamnese`}
                    onClick={() => setActivePatient(patient)}>
                    Cadastrar anamnese
                  </Link>
                </DropdownMenuItem>
              )}
              {!patient.intraoral && (
                <DropdownMenuItem>
                  <Link
                    href={`/app/patient/${patient._id}?interface=intraoral`}
                    onClick={() => setActivePatient(patient)}>
                    Cadastrar intraoral
                  </Link>
                </DropdownMenuItem>
              )}
              {(!patient.anamnese || !patient.intraoral) && <DropdownMenuSeparator />}
              <DropdownMenuItem>
                <Link href={`/app/odontogram/${patient._id}?interface=register`}>Criar odontograma</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={`/app/schedule/${patient._id}?interface=register`}>Criar agendamento</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={`/app/patient/${patient._id}?interface=update`}>Visualizar cadastro</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleCopy(patient.phone)}>Copiar telefone</DropdownMenuItem>
              <DropdownMenuItem onClick={handleCopy(patient.email)}>Copiar email</DropdownMenuItem>
              <DropdownMenuItem onClick={handleCopy(patient.name)}>Copiar nome</DropdownMenuItem>
              <DropdownMenuItem onClick={handleCopy(patient._id)}>Copiar ID</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
