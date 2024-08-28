import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { formatPhone } from "@/helpers/formatter.helper";
import type { PartialPatient } from "@/types";

import IconMixer from "../../../../public/Mixer.Icon";
import IconSort from "../../../../public/Sort.Icon";
import IconCheck from "../../../../public/Check.Icon";
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

const handleSorting = (column: any) => {
  column.toggleSorting(column.getIsSorted() === "asc");
};
const handleCopy = (value: string) => () => {
  navigator.clipboard.writeText(value);
};

const setActivePatient = (values: PartialPatient) => {
  const patient = {
    name: values.name,
    email: values.email,
    phone: values.phone,
  };
  localStorage.setItem("activePatient", JSON.stringify(patient));
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

export const columns: ColumnDef<PartialPatient>[] = [
  {
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => (
      <Link href={`/app/patient/${row.original._id}?interface=update`}>
        <p className="hover:text-darkBlue dark:hover:text-skyBlue hover:font-semibold  transition-all hover:tracking-[-0.022em]">
          {row.original.name}
        </p>
      </Link>
    ),
  },
  {
    accessorKey: "phone",
    header: "Contato",
    cell: ({ row }) => <div>{formatPhone(row.original.phone)}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => SortableComponent({ column, title: "Email" }),
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "sex",
    header: ({ column }) => SortableComponent({ column, title: "Sexo" }),
    cell: ({ row }) => (
      <Badge className="w-8" variant={row.original.sex === "M" ? "neutral" : "pink"}>
        {row.original.sex === "M" ? "M" : "F"}
      </Badge>
    ),
  },
  {
    accessorKey: "register",
    header: "Cadastro",
    cell: ({ row }) => {
      let percentage = 20;

      if (row.original.anamnese) percentage += 40;
      if (row.original.intraoral) percentage += 40;

      return (
        <Badge className="w-12" variant={percentage <= 40 ? "alert" : percentage <= 80 ? "neutral" : "positive"}>
          {percentage === 100 ? <IconCheck /> : `${percentage}%`}
        </Badge>
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
                <IconMixer className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              {!patient.anamnese && (
                <DropdownMenuItem>
                  <Link
                    href={`/app/patient/${patient._id}?interface=anamnesis`}
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
                <Link href={`/app/odontogram?interface=register`}>Criar odontograma</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={`/app/service?interface=register`}>Criar serviço</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={`/app/schedule?interface=register`}>Criar agendamento</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={`/app/patient/${patient._id}`}>Visualizar cadastro</Link>
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
