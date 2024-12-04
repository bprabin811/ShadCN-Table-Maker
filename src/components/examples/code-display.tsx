"use client";

import { InstallationSteps } from "../ui/installation-steps";

export default function CodeBlocks() {
  const steps = [
    {
      title: "Copy and paste following code into your project.",
      description: "The code will use for creat or update data.",
      code: `"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
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
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { MyFormData } from "./column";

const formSchema = z.object({
  id: z.string().optional(),
  name_5388139825: z.string().min(1, { message: "Required Field" }),
  name_2347571906: z.string().min(1, { message: "Required Field" }),
  name_5771992232: z.coerce
    .date({
      required_error: "Date is required",
    })
    .refine((val) => !isNaN(val.getTime()), {
      message: "Invalid date format",
    }),
  name_8170706335: z.string().min(1, { message: "Required Field" }),
  name_5330099702: z.string().min(1, { message: "Required Field" }),
  name_5835519496: z.coerce.number().min(0, { message: "Must be a positive number" }),
  name_8009632391: z.string().optional(),
});

interface MyFormProps {
  onSubmit: (data: MyFormData) => void;
  initialData?: MyFormData | null;
}

export default function MyForm({ onSubmit, initialData }: MyFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name_5388139825: "",
      name_2347571906: "",
      name_5771992232: new Date(),
      name_8170706335: "",
      name_5330099702: "",
      name_5835519496: 0,
      name_8009632391: "",
    }
  });

  function handleSubmit(values: z.infer<typeof formSchema>) {
    try {
    onSubmit(values as MyFormData)
    form.reset()
    toast.success("User data submitted successfully!")
    } catch (error) {
    console.error("Form submission error", error)
    toast.error("Failed to submit the form. Please try again.")
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
              name="name_5388139825"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student ID</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" type="text" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display student ID.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="name_2347571906"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
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
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="name_5771992232"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Your date of birth is used to calculate your age.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="name_8170706335"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" type="email" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="name_5330099702"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" type="text" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display address.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="name_5835519496"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enrollment Year</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" type="number" {...field} />
                  </FormControl>
                  <FormDescription>This is your enrolled year.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="name_8009632391"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Major</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" type="text" {...field} />
                  </FormControl>
                  <FormDescription>This is your major subject.</FormDescription>
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
`,
      language: "typescript",
      filename: "form.tsx",
    },
    //column.tsx code
    {
      title: "Copy and paste following code into column.tsx file.",
      description: "The code will use for create columns.",
      code: `"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


export interface MyFormData {
    id: string;
    name_5388139825: string;
    name_2347571906: string;
    name_5771992232: Date;
    name_8170706335: string;
    name_5330099702: string;
    name_5835519496: number;
    name_8009632391: string;
  }
  

  interface ColumnActions {
    onEdit?: (data: MyFormData) => void;
    onDelete?: (id: string) => void;
  }

  export const createColumns = (): ColumnDef<MyFormData>[] => {
    const columns: ColumnDef<MyFormData>[] = [
      {
      accessorKey: "name_5388139825",
      header: "Student ID",
      },
      {
        accessorKey: "name_2347571906",
        header: "Full Name",
      },
      {
        accessorKey: "name_5771992232",
        header: "Date of Birth",
      },
      {
        accessorKey: "name_8170706335",
        header: "Email",
      },
      {
        accessorKey: "name_5330099702",
        header: "Address",
      },
      {
        accessorKey: "name_5835519496",
        header: "Enrollment Year",
      },
      {
        accessorKey: "name_8009632391",
        header: "Major",
      }
    ];

    columns.push({
      id: "actions",
      cell: ({ row, table }) => {
        const record = row.original;
        const { onEdit, onDelete } = table.options.meta as ColumnActions;
  
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              
              {onEdit && <DropdownMenuItem onClick={() => onEdit(record)}>
                Edit
              </DropdownMenuItem>}
              
              {onDelete && <DropdownMenuItem onClick={() => onDelete(record.id)}>
                Delete
              </DropdownMenuItem>}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    });

    return columns;
  };`,
      language: "typescript",
      filename: "column.tsx",
    },
    //table-data.tsx code
    {
      title: "Copy and paste following code into table-data.tsx file.",
      description: "The code will use for display table data.",
      code: `"use client";

import { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
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
import { Checkbox } from "@/components/ui/checkbox";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onAdd: () => void;
  onEdit: (data: TData) => void;
  onDelete: (id: string) => void;
  onBulkDelete: (data: TData[]) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onAdd,
  onEdit,
  onDelete,
  onBulkDelete,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      columnFilters,
      rowSelection,
    },
    meta: {
      onEdit,
      onDelete,
    },
  });

  const handleBulkDelete = () => {
    const selectedItems = table
      .getFilteredSelectedRowModel()
      .rows.map((row) => row.original as TData);
    onBulkDelete(selectedItems);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Filter..."
          value={
            (table.getColumn("name_2347571906")?.getFilterValue() as string) ??
            ""
          }
          onChange={(event) =>
            table
              .getColumn("name_2347571906")
              ?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex items-center gap-4">
          {Object.keys(rowSelection).length > 0 && (
            <Button onClick={handleBulkDelete} variant="destructive">
              Delete Selected ({Object.keys(rowSelection).length})
            </Button>
          )}

          <Button onClick={onAdd}>Add Item</Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={table.getIsAllPageRowsSelected()}
                    onCheckedChange={(value) =>
                      table.toggleAllPageRowsSelected(!!value)
                    }
                    aria-label="Select all"
                  />
                </TableHead>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
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
                  <TableCell className="w-[50px]">
                    <Checkbox
                      checked={row.getIsSelected()}
                      onCheckedChange={(value) => row.toggleSelected(!!value)}
                      aria-label="Select row"
                    />
                  </TableCell>
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
}
`,
      language: "typescript",
      filename: "data-table.tsx",
    },
    //page.tsx code
    {
      title: "Copy and paste following code into page.tsx file.",
      description: "The code will use for render form and table components.",
      code: `"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  createColumns,
  MyFormData,
} from "@/components/examples/example-1/column";
import MyForm from "@/components/examples/example-1/form";
import { DataTable } from "@/components/examples/example-1/data-table";

const initialData: MyFormData[] = [
  {
    id: "1",
    name_5388139825: "1234567890",
    name_2347571906: "John Doe",
    name_5771992232: new Date("1999-01-01"),
    name_8170706335: "john.doe@example.com",
    name_5330099702: "123 Main St, Springfield, IL",
    name_5835519496: 2022,
    name_8009632391: "Computer Science",
  },
  {
    id: "2",
    name_5388139825: "9876543210",
    name_2347571906: "Jane Smith",
    name_5771992232: new Date("2000-02-02"),
    name_8170706335: "jane.smith@example.com",
    name_5330099702: "456 Elm St, Springfield, IL",
    name_5835519496: 2021,
    name_8009632391: "Biology",
  },
  {
    id: "3",
    name_5388139825: "1122334455",
    name_2347571906: "Alice Johnson",
    name_5771992232: new Date("2001-03-03"),
    name_8170706335: "alice.johnson@example.com",
    name_5330099702: "789 Oak St, Springfield, IL",
    name_5835519496: 2023,
    name_8009632391: "Mathematics",
  },
];
export default function TableBuilder() {
  const [data, setData] = useState<MyFormData[]>(initialData);
  const [editingUser, setEditingUser] = useState<MyFormData | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const columns = createColumns();

  const handleCreate = (newRecord: Omit<MyFormData, "id">) => {
    const record = { ...newRecord, id: String(data.length + 1) };
    setData([...data, record]);
    setIsDialogOpen(false);
  };

  const handleUpdate = (updatedUser: MyFormData) => {
    setData(
      data.map((record) =>
        record.id === updatedUser.id ? updatedUser : record
      )
    );
    setIsDialogOpen(false);
    setEditingUser(null);
  };

  const handleDelete = (id: string) => {
    setData(data.filter((record) => record.id !== id));
  };

  const handleBulkDelete = (users: MyFormData[]) => {
    const userIds = new Set(users.map((record) => record.id));
    setData(data.filter((record) => !userIds.has(record.id)));
  };

  const handleEdit = (record: MyFormData) => {
    setEditingUser(record);
    setIsDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingUser(null);
    setIsDialogOpen(true);
  };
  return (
    <div className="w-full py-10">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingUser ? "Edit" : "Create New"}</DialogTitle>
            <DialogDescription>
              Please fill out the form below to{" "}
              {editingUser ? "update the data" : "create a new data"}.
            </DialogDescription>
          </DialogHeader>
          <div>
            <MyForm
              onSubmit={editingUser ? handleUpdate : handleCreate}
              initialData={editingUser}
            />
          </div>
        </DialogContent>
      </Dialog>
      <DataTable
        columns={columns}
        data={data}
        onAdd={openCreateDialog}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onBulkDelete={handleBulkDelete}
      />
    </div>
  );
}
`,
      language: "typescript",
      filename: "page.tsx",
    },
  ];
  return (
    <div className="container px-0 py-4">
      <InstallationSteps steps={steps} />
    </div>
  );
}
