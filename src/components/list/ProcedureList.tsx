"use client";

import { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { cn } from "@/helpers/cn.util";

import IconDown from "../../../public/Down.Icon";
import IconRight from "../../../public/Right.Icon";
import IconLeft from "../../../public/Left.Icon";
import IconCloud from "../../../public/UploadCloud.Icon";
import IconColumn from "../../../public/Column.Icon";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { Table as TableBox, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const Table = <TData, TValue>({ columns, data, updating, saveProcedure }: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    initialState: {
      pagination: {
        pageSize: 20,
      },
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div className="w-full">
      {/* Table Header */}
      <div className="w-full px-6 pb-4 gap-3 flex">
        <Input
          placeholder="Buscar procedimento..."
          value={(table.getColumn("procedure")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("procedure")?.setFilterValue(event.target.value)}
          className={cn(
            buttonVariants({ variant: "primary" }),
            "max-w-[240px] w-full text-xs font-normal tracking-wide"
          )}
        />
        <div className="ml-auto gap-2 flex">
          {updating && table.getRowModel().rows.length != 0 && (
            <Button onClick={saveProcedure} className="gap-2 flex" variant={"secondary"}>
              <IconCloud className="h-4 w-4" />
              Atualizar
            </Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="primary" className="text-xs">
                <IconColumn className="h-4 w-4" />
                <IconDown className="ml-2 h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}>
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {/* Table Body */}
      <div className="border rounded-md w-full">
        <TableBox>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="p-2 bg-slate-50 dark:bg-slate-900 md:text-sm text-xs">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="md:text-sm text-xs">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Sem resultado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </TableBox>
      </div>
      {/* Pagination */}
      <div className="space-x-2 md:px-6 px-4 py-4 flex justify-between items-center">
        <div className="text-sm text-muted-foreground gap-2 items-center flex-col flex">
          <div className="flex items-center gap-3">
            <p>Frequência:</p>
            <Select onValueChange={(value) => table.setPageSize(parseInt(value))}>
              <SelectTrigger className="gap-2">
                <SelectValue placeholder="20" />
              </SelectTrigger>
              <SelectContent className="min-w-[1rem] font-medium">
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">{table.getRowModel().rows.length}</span>de
            <span className="font-semibold">{data.length}</span>resultados
            <span className="font-semibold ml-2">{table.getPageCount()}</span>pagina(s).
          </div>
        </div>
        <div className="space-x-2 flex">
          <Button
            variant="primary"
            size="sm"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
            className="flex items-center gap-1">
            <IconLeft className="h-3 w-3" />
            <p className="font-semibold">{table.getState().pagination.pageIndex + 1}</p>
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="flex items-center gap-1">
            <p className="font-semibold">{table.getState().pagination.pageIndex + 2}</p>
            <IconRight className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  updating: boolean;
  saveProcedure: () => void;
}

export default Table;
