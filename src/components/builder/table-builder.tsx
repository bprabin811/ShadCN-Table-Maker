"use client";

import { useState, useMemo } from "react";
import { createColumns, User, TableConfig } from "@/components/builder/column";
import { DataTable } from "@/components/builder/data-table";
import { UserForm } from "@/components/builder/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const initialData: User[] = [
  {
    id: "2",
    name_4603829743: "Jane Doe",
    name_0878515932: 30,
    name_0706064476: "female",
    name_6646786819: "jane@test.com",
  },
  {
    id: "3",
    name_4603829743: "Alice Smith",
    name_0878515932: 28,
    name_0706064476: "female",
    name_6646786819: "alice@test.com",
  },
  {
    id: "4",
    name_4603829743: "Bob Johnson",
    name_0878515932: 35,
    name_0706064476: "male",
    name_6646786819: "bob@test.com",
  },
  {
    id: "5",
    name_4603829743: "Charlie Brown",
    name_0878515932: 22,
    name_0706064476: "male",
    name_6646786819: "charlie@test.com",
  },
  {
    id: "6",
    name_4603829743: "Diana Prince",
    name_0878515932: 29,
    name_0706064476: "female",
    name_6646786819: "diana@test.com",
  },
];


interface TableBuilderProps {
  config: TableConfig;
}

export function TableBuilder({ config }: TableBuilderProps) {
  const [data, setData] = useState<User[]>(initialData);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const columns = useMemo(() => createColumns(config), [config]);

  const handleCreate = (newUser: Omit<User, "id">) => {
    const user = { ...newUser, id: String(data.length + 1) };
    setData([...data, user]);
    setIsDialogOpen(false);
  };

  const handleUpdate = (updatedUser: User) => {
    setData(
      data.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setIsDialogOpen(false);
    setEditingUser(null);
  };

  const handleDelete = (id: string) => {
    setData(data.filter((user) => user.id !== id));
  };

  const handlemultiDelete = (users: User[]) => {
    const userIds = new Set(users.map((user) => user.id));
    setData(data.filter((user) => !userIds.has(user.id)));
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingUser(null);
    setIsDialogOpen(true);
  };

  return (
    <div className="container mx-auto py-10">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingUser ? "Edit" : "Create New"}
            </DialogTitle>
            <DialogDescription>
              Please fill out the form below to{" "}
              {editingUser ? "update the data" : "create a new data"}.
            </DialogDescription>
          </DialogHeader>
          <div>
            <UserForm
              onSubmit={editingUser ? handleUpdate : handleCreate}
              initialData={editingUser}
            />
          </div>
        </DialogContent>
      </Dialog>

      <DataTable
        columns={columns}
        data={data}
        config={config}
        onAdd={openCreateDialog}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onmultiDelete={handlemultiDelete}
      />
    </div>
  );
}
