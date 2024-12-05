"use client";

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

  const handlemultiDelete = (users: MyFormData[]) => {
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
        onmultiDelete={handlemultiDelete}
      />
    </div>
  );
}
