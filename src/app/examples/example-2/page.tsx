"use client";
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
}