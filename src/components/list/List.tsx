"use client";

import { useState } from "react";
import { ChevronDownIcon, CaretLeftIcon, CaretRightIcon, CalendarIcon } from "@radix-ui/react-icons";
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

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Table as TableBox,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { cn } from "@/helpers/cn.util";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const Table = <TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
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
      {/* // Table Header */}
      <div className="w-full px-6 pb-4 flex items-center gap-3">
        <Toggle className={cn(buttonVariants({ variant: "primary" }))}>
          <CalendarIcon />
        </Toggle>
        <Input
          placeholder="Buscar paciente..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
          className={cn(buttonVariants({ variant: "primary" }), "max-w-[240px] w-full text-xs")}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="primary" className="ml-auto text-xs">
              Colunas <ChevronDownIcon className="ml-2 h-4 w-4" />
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
      {/* // Table Body */}
      <div className="border border-x-0 w-full">
        <TableBox>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="p-2 bg-slate-50 dark:bg-slate-900 md:text-sm text-xs">
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
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
      {/* // Pagination */}
      <div className="space-x-2 md:px-6 px-4 py-4 flex justify-between items-center">
        <div className="text-sm text-muted-foreground flex gap-3">
          <span>
            {table.getRowModel().rows.length} de {data.length} resultados
          </span>
          <span className="md:block hidden">{table.getPageCount()} paginas.</span>
        </div>
        <div className="space-x-2 flex">
          <Button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            variant="primary"
            size="sm"
            className="flex items-center gap-1">
            <CaretLeftIcon className="h-3 w-3" />
            <p className="font-semibold">{table.getState().pagination.pageIndex + 1}</p>
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="flex items-center gap-1">
            <p className="font-semibold">{table.getState().pagination.pageIndex + 2}</p>
            <CaretRightIcon className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Table;
