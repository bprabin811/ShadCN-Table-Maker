"use client";
import Link from "next/link";

import { useState } from "react";
import { TableBuilder } from "@/components/builder/table-builder";
import { Check, ArrowDown } from "lucide-react";
import CodeDetails from "@/components/builder/code-details";
import { FileTree } from "@/components/file-tree";
import {
  generateColumnCode,
  generateDataTableCode,
  generatePageCode,
} from "@/lib/code-generator";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function Playground() {
  const [config, setConfig] = useState({
    pagination: true,
    sorting: false,
    create: false,
    edit: false,
    delete: false,
    multiDelete: false,
    search: true,
  });

  const toggleOption = (option: keyof typeof config) => {
    setConfig((prev) => ({ ...prev, [option]: !prev[option] }));
  };

  const pageCode = generatePageCode(config);
  const columnCode = generateColumnCode(config);
  const tableCode = generateDataTableCode(config);

  const handleMoveDown = () => {
    window.scrollBy({
      top: window.innerHeight * 0.9,
      behavior: 'smooth',
    });
  };


  return (
    <div className="container mx-auto py-8">
      <section className="h-[80vh] flex items-start justify-end flex-col">
        <h1 className="text-3xl md:text-5xl lg:text-7xl mb-8 font-bold">Build Dynamic <span className="text-rose-600">Tables</span> in Minutes!</h1>
        <div className="flex flex-col gap-4">
          <p className="text-muted-foreground text-sm">
            {"Simplify your workflow with our Next.js table-building tool powered by the "} <Link href={'https://ui.shadcn.com/'} target="_blank" className="font-semibold underline">ShadCN</Link> {" design library. Quickly scaffold essential features like search, pagination, sorting, create, edit, and delete. With seamless integration of "}<Link href={'https://www.shadcn-form.com/playground'} target="_blank" className="font-semibold underline">ShadCN Form Builder</Link>{" , you can customize forms effortlessly and have a fully functional table ready in no time."}
          </p>
          <p className="text-muted-foreground text-sm">{"Whether you're a beginner or an experienced developer, our tool accelerates development while keeping it flexible and intuitive. Get started today and transform the way you build tables!"}</p>
          <Button variant={'outline'} size={'icon'} className="rounded-full" onClick={handleMoveDown}><ArrowDown size={20} className="animate-bounce" /></Button>
        </div>
      </section>
      <section>
        <div className="w-full h-screen flex items-center justify-center gap-4 flex-col md:flex-row">
          <div className="w-full md:w-36">
            <div className="flex flex-row flex-wrap md:flex-col gap-4">
              {Object.entries(config).map(([key, value]) => (
                <div
                  key={key}
                  onClick={() => toggleOption(key as keyof typeof config)}
                  className={`
                    relative cursor-pointer px-3 py-1 rounded-full transition-all duration-300
                    flex items-center gap-2 w-fit
                    ${value
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
          <div className="w-full md:flex-1">
            <TableBuilder config={config} />
          </div>
        </div>
        <Separator className="mb-4" />
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
