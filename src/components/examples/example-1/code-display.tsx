"use client";

import { InstallationSteps } from "../../ui/installation-steps";
import { columnCode, formCode, pageCode, tableCode } from "./code";

export default function ExampleOneCodeBlocks() {
  const steps = [
    {
      title: "Copy and paste following code into your project.",
      description: "The code will use for create or update data.",
      code: formCode,
      language: "typescript",
      filename: "form.tsx",
    },
    {
      title: "Copy and paste following code into column.tsx file.",
      description: "The code will use for create columns.",
      code: columnCode,
      language: "typescript",
      filename: "column.tsx",
    },
    {
      title: "Copy and paste following code into data-table.tsx file.",
      description: "The code will use for display table data.",
      code: tableCode,
      language: "typescript",
      filename: "data-table.tsx",
    },
    {
      title: "Copy and paste following code into page.tsx file.",
      description: "The code will use for render form and table components.",
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
