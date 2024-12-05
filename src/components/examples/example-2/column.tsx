"use client";

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
};