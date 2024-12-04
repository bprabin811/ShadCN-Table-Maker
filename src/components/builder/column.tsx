"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export interface User {
  id: string;
  name_4603829743: string;
  name_0878515932: number;
  name_0706064476: string;
  name_6646786819: string;
}

export interface TableConfig {
  pagination: boolean
  sorting: boolean
  create: boolean
  edit: boolean
  delete: boolean
  bulkDelete: boolean
  search: boolean
}

interface ColumnActions {
  onEdit?: (user: User) => void
  onDelete?: (id: string) => void
}

export const createColumns = (config: TableConfig): ColumnDef<User>[] => {
  const columns: ColumnDef<User>[] = [
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
  ]

  if (config.edit || config.delete) {
    columns.push({
      id: "actions",
      cell: ({ row, table }) => {
        const user = row.original
        const { onEdit, onDelete } = table.options.meta as ColumnActions

        if (!onEdit && !onDelete) {
          return null
        }

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
              {config.edit && onEdit && (
                <DropdownMenuItem onClick={() => onEdit(user)}>Edit</DropdownMenuItem>
              )}
              {config.delete && onDelete && (
                <DropdownMenuItem onClick={() => onDelete(user.id)}>Delete</DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    })
  }

  return columns
}
