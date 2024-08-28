'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { ArrowUpDown } from 'lucide-react';
import { useMemo, useState } from 'react';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

type Program = {
  name: string;
  value: number;
  percentage: number;
};

const columns: ColumnDef<Program>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <button className="flex items-center gap-2" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Bokslutsprogram
          <ArrowUpDown className="h-4 w-4 max-md:hidden" />
        </button>
      );
    },
  },
  {
    accessorKey: 'value',
    header: ({ column }) => {
      return (
        <button className="flex items-center gap-2" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Antal
          <ArrowUpDown className="h-4 w-4 max-md:hidden" />
        </button>
      );
    },
  },
  {
    accessorKey: 'percentage',
    header: ({ column }) => {
      return (
        <button className="flex items-center gap-2" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Andel
          <ArrowUpDown className="h-4 w-4 max-md:hidden" />
        </button>
      );
    },
    cell: ({ row }) => {
      return <span className="whitespace-nowrap">{Number(row.original.percentage.toFixed(1)).toLocaleString('sv-SE')} %</span>;
    },
  },
];

export function Bokslutsprogram({
  softwareData,
}: {
  softwareData: {
    name: string;
    value: any;
  }[];
}) {
  const tableData = useMemo(() => {
    const total = softwareData.reduce((sum, item) => sum + item.value, 0);
    return softwareData.map((item) => ({
      ...item,
      percentage: (item.value / total) * 100,
    }));
  }, [softwareData]);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [sorting, setSorting] = useState<SortingState>([{ id: 'value', desc: true }]);

  const table = useReactTable({
    data: tableData,
    columns,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 7,
      },
    },
  });

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle className="mb-2">Bokslutsprogram</CardTitle>
          <CardDescription>Avser digitalt inlämnade hittills i år.</CardDescription>
        </div>

        <div className="flex items-center px-6 py-5 sm:py-6">
          <Input
            placeholder="Filtrera program…"
            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
            className="max-w-sm"
          />
        </div>
      </CardHeader>

      <CardContent className="px-4 md:px-2">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="grid grid-cols-5">
                {headerGroup.headers.map((header, index) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={cn('flex items-center', {
                        'col-span-3': index === 0,
                        'col-span-1': index !== 0,
                      })}
                    >
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
                <TableRow key={row.id} className="grid grid-cols-5" data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell, index) => (
                    <TableCell
                      key={cell.id}
                      className={cn({
                        'col-span-3': index === 0,
                        'col-span-1': index !== 0,
                      })}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Inga resultat.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="mr-4 flex items-center justify-end space-x-2 py-4">
          <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            Föregående
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Nästa
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
