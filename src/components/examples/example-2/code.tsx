export const formCode=`"use client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MyFormData } from "./column";

const formSchema = z.object({
  id: z.string().optional(),
  name_4603829743: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" }),
  name_0878515932: z.coerce
    .number()
    .min(0, { message: "Age must be a positive number" }),
  name_0706064476: z.string().optional(),
  name_6646786819: z.string().email({ message: "Invalid email address" }),
});

interface MyFormProps {
  onSubmit: (data: MyFormData) => void;
  initialData?: MyFormData | null;
}

export function MyForm({ onSubmit, initialData }: MyFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name_4603829743: "",
      name_0878515932: 0,
      name_0706064476: "",
      name_6646786819: "",
    },
  });

  function handleSubmit(values: z.infer<typeof formSchema>) {
    try {
      onSubmit(values as MyFormData);
      form.reset();
      toast.success("User data submitted successfully!");
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-8 max-w-3xl mx-auto py-10"
      >
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="name_4603829743"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" type="text" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="name_0878515932"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="name_0706064476"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="m@example.com">
                        m@example.com
                      </SelectItem>
                      <SelectItem value="m@google.com">m@google.com</SelectItem>
                      <SelectItem value="m@support.com">
                        m@support.com
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    You can manage email addresses in your email settings.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="name_6646786819"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" type="email" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type="submit">{initialData ? "Update" : "Create"}</Button>
      </form>
    </Form>
  );
}
`;
export const columnCode=`"use client";

import { ColumnDef } from "@tanstack/react-table";

export interface MyFormData {
  id: string;
  name_4603829743: string;
  name_0878515932: number;
  name_0706064476: string;
  name_6646786819: string;
}

export const createColumns = (): ColumnDef<MyFormData>[] => {
  const columns: ColumnDef<MyFormData>[] = [
    {
      accessorKey: "name_4603829743",
      header: "Name",
    },
    {
      accessorKey: "name_0878515932",
      header: "Age",
    },
    {
      accessorKey: "name_0706064476",
      header: "Gender",
    },
    {
      accessorKey: "name_6646786819",
      header: "Email",
    },
  ];


  return columns;
};`;
export const tableCode=`"use client";

import { useState } from "react";
import {
  ColumnDef,
  flexRender,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowDownUp, ArrowDownWideNarrow, ArrowUpNarrowWide } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
  
  
  
  
}: DataTableProps<TData, TValue>) {
const [sorting, setSorting] = useState<SortingState>([]);
const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });


  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        
        <Input
          placeholder="Search by name..."
          value={(table.getColumn("name_4603829743")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name_4603829743")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex items-center gap-4">
          
          
        </div>
      </div>
      <div className="rounded-md border">
        
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                        :<div className="flex items-center">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getCanSort() && (
                        <Button
                          variant="ghost"
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {header.column.getIsSorted() ? (
                            header.column.getIsSorted() === "desc" ? (
                              <ArrowDownWideNarrow className="ml-2 h-4 w-4" />
                            ) : (
                              <ArrowUpNarrowWide className="ml-2 h-4 w-4" />
                            )
                          ) : (
                            <ArrowDownUp className="ml-2 h-4 w-4" />
                          )}
                        </Button>
                      )}
                    </div>}
                          
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
        
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}`;
export const pageCode=`"use client";
import {
  createColumns,
  MyFormData,
} from "@/components/examples/example-2/column";
import { DataTable } from "@/components/examples/example-2/data-table";
import { useState } from "react";

const initialData: MyFormData[] = [
  {
    id: "1",
    name_4603829743: "Jane Doe",
    name_0878515932: 30,
    name_0706064476: "female",
    name_6646786819: "jane@test.com",
  },
  {
    id: "2",
    name_4603829743: "John Doe",
    name_0878515932: 35,
    name_0706064476:"male",
    name_6646786819: "jon@test.com",
  }
];

export default function TableBuilder() {
  const [data, setData] = useState<MyFormData[]>(initialData);
const columns = createColumns();
return (

    <div className="container mx-auto py-10">
      
      <DataTable
        columns={columns}
        data={data}
      />
    </div>
  );
}`;