"use client";

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

//type
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
  };