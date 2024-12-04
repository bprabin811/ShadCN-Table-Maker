import { TableConfig } from "@/components/builder/column";

export const generatePageCode = (config: TableConfig): string => {
    const imports = [
      `"use client";`,
      ``,
      `import { useState${config.sorting ? ', useMemo' : ''} } from "react";`,
      `import { createColumns } from "@/components/builder/column";`,
      `import { DataTable } from "@/components/builder/data-table";`,
      `import { MyFormData } from "./types";`,
    ];

    if (config.create || config.edit) {
      imports.push(`import { UserForm } from "@/components/builder/form";`);
      imports.push(`import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";`);
    }

    const initialData = `
const initialData: MyFormData[] = [
   {
    id: "1",
    name_4603829743: "Jane Doe",
    name_0878515932: 30,
    name_0706064476: "female",
    name_6646786819: "jane@test.com",
  },
];`;

    const componentStart = `
export function TableBuilder() {
  const [data, setData] = useState<MyFormData[]>(initialData);`;

    const stateVariables = [];
    if (config.create || config.edit) {
      stateVariables.push(`  const [editingUser, setEditingUser] = useState<MyFormData | null>(null);`);
      stateVariables.push(`  const [isDialogOpen, setIsDialogOpen] = useState(false);`);
    }

    const columnsDeclaration =  `const columns = createColumns();`;

    const functions = [];
    if (config.create) {
      functions.push(`
  const handleCreate = (newRecord: Omit<MyFormData, "id">) => {
    const record = { ...newUser, id: String(data.length + 1) };
    setData([...data, record]);
    setIsDialogOpen(false);
  };`);
    }

    if (config.edit) {
      functions.push(`
  const handleUpdate = (updatedUser: MyFormData) => {
    setData(data.map((record) => (record.id === updatedUser.id ? updatedUser : record)));
    setIsDialogOpen(false);
    setEditingUser(null);
  };`);
    }

    if (config.delete) {
      functions.push(`
  const handleDelete = (id: string) => {
    setData(data.filter((record) => record.id !== id));
  };`);
    }

    if (config.bulkDelete) {
      functions.push(`
  const handleBulkDelete = (users: MyFormData[]) => {
    const userIds = new Set(users.map((record) => record.id));
    setData(data.filter((record) => !userIds.has(record.id)));
  };`);
    }

    if (config.edit) {
      functions.push(`
  const handleEdit = (record: MyFormData) => {
    setEditingUser(record);
    setIsDialogOpen(true);
  };`);
    }

    if (config.create) {
      functions.push(`
  const openCreateDialog = () => {
    setEditingUser(null);
    setIsDialogOpen(true);
  };`);
    }

    const dialogJSX = config.create || config.edit
      ? `
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingUser ? "Edit" : "Create New"}</DialogTitle>
            <DialogDescription>
              Please fill out the form below to {editingUser ? "update the data" : "create a new data"}.
            </DialogDescription>
          </DialogHeader>
          <div>
            <UserForm
              onSubmit={editingUser ? handleUpdate : handleCreate}
              initialData={editingUser}
            />
          </div>
        </DialogContent>
      </Dialog>`
      : '';

    const dataTableProps = [
      'columns={columns}',
      'data={data}',
    ];

    if (config.create) dataTableProps.push('onAdd={openCreateDialog}');
    if (config.edit) dataTableProps.push('onEdit={handleEdit}');
    if (config.delete) dataTableProps.push('onDelete={handleDelete}');
    if (config.bulkDelete) dataTableProps.push('onBulkDelete={handleBulkDelete}');

    const componentEnd = `
    <div className="container mx-auto py-10">
      ${dialogJSX}
      <DataTable
        ${dataTableProps.join('\n        ')}
      />
    </div>
  );
}`;

    return [
      ...imports,
      initialData,
      componentStart,
      ...stateVariables,
      columnsDeclaration,
      ...functions,
      'return (',
      componentEnd,
    ].join('\n');
  };


  export const generateColumnCode = (config: TableConfig): string => {
    const imports = [
      `"use client";`,
      ``,
      `import { ColumnDef } from "@tanstack/react-table";`,
    ];
  
    if (config.edit || config.delete) {
      imports.push(
        `import { Button } from "@/components/ui/button";`,
        `import { MoreHorizontal } from 'lucide-react';`,
        `import {`,
        `  DropdownMenu,`,
        `  DropdownMenuContent,`,
        `  DropdownMenuItem,`,
        `  DropdownMenuLabel,`,
        `  DropdownMenuTrigger,`,
        `} from "@/components/ui/dropdown-menu";`
      );
    }
  
    imports.push(`import { MyFormData } from "./types";`);
  
    const columnActions = config.edit || config.delete
      ? `
  interface ColumnActions {
    ${config.edit ? `onEdit?: (data: MyFormData) => void;` : ''}
    ${config.delete ? `onDelete?: (id: string) => void;` : ''}
  }`
      : '';
  
    const createColumnsStart = `
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
    ];`;
  
    const actionsColumn = config.edit || config.delete
      ? `
    columns.push({
      id: "actions",
      cell: ({ row, table }) => {
        const record = row.original;
        const { ${config.edit ? 'onEdit' : ''}${config.edit && config.delete ? ', ' : ''}${config.delete ? 'onDelete' : ''} } = table.options.meta as ColumnActions;
  
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
              ${config.edit ? `
              <DropdownMenuItem onClick={() => onEdit(record)}>
                Edit
              </DropdownMenuItem>` : ''}
              ${config.delete ? `
              <DropdownMenuItem onClick={() => onDelete(record.id)}>
                Delete
              </DropdownMenuItem>` : ''}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    });`
      : '';
  
    const createColumnsEnd = `
    return columns;
  };`;
  
    return [
      ...imports,
      columnActions,
      createColumnsStart,
      actionsColumn,
      createColumnsEnd,
    ].join('\n');
  };
  

export const generateDataTableCode = (config: TableConfig): string => {
  const imports = [
    `"use client";`,
    ``,
    `import { useState } from "react";`,
    `import {`,
    `  ColumnDef,`,
    `  flexRender,`,
    `  getCoreRowModel,`,
    `  useReactTable,`,
    `} from "@tanstack/react-table";`,
    `import {`,
    `  Table,`,
    `  TableBody,`,
    `  TableCell,`,
    `  TableHead,`,
    `  TableHeader,`,
    `  TableRow,`,
    `} from "@/components/ui/table";`,
    `import { Button } from "@/components/ui/button";`,
  ];

  if (config.search) {
    imports.push(`import { Input } from "@/components/ui/input";`);
  }

  if (config.bulkDelete) {
    imports.push(`import { Checkbox } from "@/components/ui/checkbox";`);
  }

  const additionalImports = [];
  if (config.sorting) {
    additionalImports.push(`  SortingState,`);
    additionalImports.push(`  getSortedRowModel,`);
  }
  if (config.search) {
    additionalImports.push(`  ColumnFiltersState,`);
    additionalImports.push(`  getFilteredRowModel,`);
  }
  if (config.pagination) {
    additionalImports.push(`  getPaginationRowModel,`);
  }
  if (additionalImports.length > 0) {
    imports[3] = imports[3].replace(
      '}',
      `  ${additionalImports.join('\n  ')}\n}`
    );
  }

  const interfaceProps = [
    `columns: ColumnDef<TData, TValue>[];`,
    `data: TData[];`,
  ];
  if (config.create) interfaceProps.push(`onAdd: () => void;`);
  if (config.edit) interfaceProps.push(`onEdit: (data: TData) => void;`);
  if (config.delete) interfaceProps.push(`onDelete: (id: string) => void;`);
  if (config.bulkDelete) interfaceProps.push(`onBulkDelete: (data: TData[]) => void;`);

  const dataTableInterface = `
interface DataTableProps<TData, TValue> {
  ${interfaceProps.join('\n  ')}
}`;

  const dataTableStart = `
export function DataTable<TData, TValue>({
  columns,
  data,
  ${config.create ? 'onAdd,' : ''}
  ${config.edit ? 'onEdit,' : ''}
  ${config.delete ? 'onDelete,' : ''}
  ${config.bulkDelete ? 'onBulkDelete,' : ''}
}: DataTableProps<TData, TValue>) {`;

  const stateDeclarations = [];
  if (config.sorting) {
    stateDeclarations.push(`const [sorting, setSorting] = useState<SortingState>([]);`);
  }
  if (config.search) {
    stateDeclarations.push(`const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);`);
  }
  if (config.bulkDelete) {
    stateDeclarations.push(`const [rowSelection, setRowSelection] = useState({});`);
  }

  const tableConfig = [
    `    data,`,
    `    columns,`,
    `    getCoreRowModel: getCoreRowModel(),`,
  ];
  if (config.pagination) {
    tableConfig.push(`    getPaginationRowModel: getPaginationRowModel(),`);
  }
  if (config.sorting) {
    tableConfig.push(`    onSortingChange: setSorting,`);
    tableConfig.push(`    getSortedRowModel: getSortedRowModel(),`);
  }
  if (config.search) {
    tableConfig.push(`    onColumnFiltersChange: setColumnFilters,`);
    tableConfig.push(`    getFilteredRowModel: getFilteredRowModel(),`);
  }
  if (config.bulkDelete) {
    tableConfig.push(`    onRowSelectionChange: setRowSelection,`);
  }

  const tableState = [];
  if (config.sorting) tableState.push(`sorting,`);
  if (config.search) tableState.push(`columnFilters,`);
  if (config.bulkDelete) tableState.push(`rowSelection,`);

  if (tableState.length > 0) {
    tableConfig.push(`    state: {
      ${tableState.join('\n      ')}
    },`);
  }

  if (config.edit || config.delete) {
    tableConfig.push(`    meta: {
      ${config.edit ? 'onEdit,' : ''}
      ${config.delete ? 'onDelete,' : ''}
    },`);
  }

  const tableDeclaration = `
  const table = useReactTable({
${tableConfig.join('\n')}
  });`;

  const bulkDeleteFunction = config.bulkDelete
    ? `
  const handleBulkDelete = () => {
    const selectedItems = table
      .getFilteredSelectedRowModel()
      .rows.map((row) => row.original as TData);
    onBulkDelete(selectedItems);
  };`
    : '';

  const searchInput = config.search
    ? `
        <Input
          placeholder="Filter..."
          // value={(table.getColumn("name_4603829743")?.getFilterValue() as string) ?? ""}
          // onChange={(event) =>
          //   table.getColumn("name_4603829743")?.setFilterValue(event.target.value)
          // }
          className="max-w-sm"
        />`
    : '';

  const bulkDeleteButton = config.bulkDelete
    ? `
          {Object.keys(rowSelection).length > 0 && (
            <Button onClick={handleBulkDelete} variant="destructive">
              Delete Selected ({Object.keys(rowSelection).length})
            </Button>
          )}`
    : '';

  const addButton = config.create
    ? `
          <Button onClick={onAdd}>Add Item</Button>`
    : '';

  const tableHeader = `
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                ${config.bulkDelete ? `
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={table.getIsAllPageRowsSelected()}
                    onCheckedChange={(value) =>
                      table.toggleAllPageRowsSelected(!!value)
                    }
                    aria-label="Select all"
                  />
                </TableHead>` : ''}
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
          </TableHeader>`;

  const tableBody = `
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  ${config.bulkDelete ? `
                  <TableCell className="w-[50px]">
                    <Checkbox
                      checked={row.getIsSelected()}
                      onCheckedChange={(value) => row.toggleSelected(!!value)}
                      aria-label="Select row"
                    />
                  </TableCell>` : ''}
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
        </Table>`;

  const pagination = config.pagination
    ? `
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
      </div>`
    : '';

  const componentReturn = `
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        ${searchInput}
        <div className="flex items-center gap-4">
          ${bulkDeleteButton}
          ${addButton}
        </div>
      </div>
      <div className="rounded-md border">
        ${tableHeader}
        ${tableBody}
      </div>
      ${pagination}
    </div>
  );
}`;

  return [
    ...imports,
    dataTableInterface,
    dataTableStart,
    ...stateDeclarations,
    tableDeclaration,
    bulkDeleteFunction,
    componentReturn,
  ].join('\n');
};

