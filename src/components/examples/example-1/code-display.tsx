"use client";

import { InstallationSteps } from "../../ui/installation-steps";
import { columnCode, formCode, pageCode, tableCode } from "./code";

export default function ExampleOneCodeBlocks() {
  const steps = [
    {
      title: "Copy and paste the following code into your project.",
      description: "This code defines a form component to create or update data.",
      code: formCode,
      language: "typescript",
      filename: "form.tsx",
    },
    {
      title: "Copy and paste the following code into `column.tsx`.",
      description: "This code defines the column component to configure table columns.",
      code: columnCode,
      language: "typescript",
      filename: "column.tsx",
    },
    {
      title: "Copy and paste the following code into `data-table.tsx`.",
      description: "This code creates the data-table component to display table data.",
      code: tableCode,
      language: "typescript",
      filename: "data-table.tsx",
    },
    {
      title: "Copy and paste the following code into `page.tsx`.",
      description: "This code implements the page component to render the form and table components together.",
      code: pageCode,
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
