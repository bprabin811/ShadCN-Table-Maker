"use client";

import { InstallationSteps } from "../../ui/installation-steps";
import { useEffect, useState } from "react";

export default function ExampleTwoCodeBlocks() {
  const [codes, setCodes] = useState({
    formCode: "",
    columnCode: "",
    tableCode: "",
    pageCode: "",
  });

  useEffect(() => {
    const filePaths = {
      formCode: "src/components/examples/example-2/form.tsx",
      columnCode: "src/components/examples/example-2/column.tsx",
      tableCode: "src/components/examples/example-2/data-table.tsx",
      pageCode: "src/app/examples/example-2/page.tsx",
    };

    async function fetchAllCodes() {
      const codeEntries = await Promise.all(
        Object.entries(filePaths).map(async ([key, path]) => {
          try {
            const response = await fetch(`/api/read-file?path=${encodeURIComponent(path)}`);
            const data = await response.json();
            return [key, data.content || "Error loading file content"];
          } catch (error) {
            console.error(`Error fetching file content for ${path}:`, error);
            return [key, "Error loading file content"];
          }
        })
      );

      setCodes(Object.fromEntries(codeEntries));
    }

    fetchAllCodes();
  }, []);

  const steps = [
    {
      title: "Copy and paste following code into your project.",
      description: "The code will use for create or update data.",
      code: codes.formCode,
      language: "typescript",
      filename: "form.tsx",
    },
    {
      title: "Copy and paste following code into column.tsx file.",
      description: "The code will use for create columns.",
      code: codes.columnCode,
      language: "typescript",
      filename: "column.tsx",
    },
    {
      title: "Copy and paste following code into data-table.tsx file.",
      description: "The code will use for display table data.",
      code: codes.tableCode,
      language: "typescript",
      filename: "data-table.tsx",
    },
    {
      title: "Copy and paste following code into page.tsx file.",
      description: "The code will use for render form and table components.",
      code: codes.pageCode,
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
