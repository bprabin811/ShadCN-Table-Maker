"use client";
import Link from "next/link";

import { useState } from "react";
import { TableBuilder } from "@/components/builder/table-builder";
import { Check } from "lucide-react";
import CodeDetails from "@/components/builder/code-details";
import { FileTree } from "@/components/file-tree";
import {
  generateColumnCode,
  generateDataTableCode,
  generatePageCode,
} from "@/lib/code-generator";

export default function Playground() {
  const [config, setConfig] = useState({
    pagination: true,
    sorting: false,
    create: false,
    edit: false,
    delete: false,
    bulkDelete: false,
    search: true,
  });

  const toggleOption = (option: keyof typeof config) => {
    setConfig((prev) => ({ ...prev, [option]: !prev[option] }));
  };

  const pageCode = generatePageCode(config);
  const columnCode = generateColumnCode(config);
  const tableCode = generateDataTableCode(config);

  return (
    <div className="container mx-auto py-8">
      <div>
        <p className="text-muted-foreground text-sm">
          Use the form code from the{" "}
          <Link
            href={"https://shadcn-form-build.vercel.app/playground"}
            className="font-bold underline underline-offset-2"
          >
            shadcn-form-builder
          </Link>{" "}
          to create a dynamic table component with full <strong>CRUD</strong>{" "}
          (Create, Read, Update, Delete) functionality. This tool is designed to
          streamline table generation and data management for your applications.
        </p>
      </div>
      <section>
        <div className="w-full py-4 flex gap-4">
          <div className="w-36">
            <div className="flex flex-col gap-4">
              {Object.entries(config).map(([key, value]) => (
                <div
                  key={key}
                  onClick={() => toggleOption(key as keyof typeof config)}
                  className={`
                    relative cursor-pointer px-3 py-1 rounded-full transition-all duration-300
                    flex items-center gap-2 w-fit
                    ${
                      value
                        ? "bg-primary text-white dark:text-black"
                        : "bg-secondary hover:bg-gray-300/20"
                    }
                  `}
                >
                  <span className="capitalize text-sm">{key}</span>
                  {value && <Check size={16} strokeWidth={3} />}
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <TableBuilder config={config} />
          </div>
        </div>
        <FileTree />
        <CodeDetails
          tableCode={tableCode}
          columnCode={columnCode}
          pageCode={pageCode}
        />
      </section>
    </div>
  );
}
