"use client";
import { Suspense, ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ExampleOneCodeBlocks from "@/components/examples/example-1/code-display";
import { Loader2, Menu } from 'lucide-react';
import ExampleTwoCodeBlocks from "@/components/examples/example-2/code-display";
import { Button } from "@/components/ui/button";

// Loading component for Suspense fallback
const ExampleLoading = () => <Loader2 size={16} className="animate-spin" />;

export default function ExamplesLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Sidebar links configuration
  const examples = [
    {
      label: "Example 1",
      href: "/examples",
      code: <ExampleOneCodeBlocks />,
      description:
        "This is an example page to demonstrate the layout of the examples page.",
    },
    {
      label: "Example 2",
      href: "/examples/example-2",
      code: <ExampleTwoCodeBlocks />,
      description:
        "This is an example page to demonstrate the layout of the examples page.",
    },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex min-h-screen flex-col lg:flex-row">
        {/* Mobile sidebar toggle */}
        <div className="lg:hidden mt-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label="Toggle sidebar"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>

        {/* Left sidebar */}
        <aside
          className={`w-full lg:w-64 lg:border-r py-4 lg:py-8 ${
            isSidebarOpen ? 'block' : 'hidden lg:block'
          }`}
        >
          <h2 className="mb-4 text-lg font-semibold px-4">Examples</h2>
          <nav>
            <ul className="space-y-2 border-l pr-4 pl-2">
              {examples.map((example) => (
                <li key={example.href}>
                  <Link
                    href={example.href}
                    className={`block rounded-md px-3 py-2 text-sm ${
                      pathname === example.href
                        ? "bg-secondary font-medium"
                        : "hover:bg-secondary"
                    }`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    {example.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 md:pl-4 py-4 flex flex-col gap-4">
          <Suspense fallback={<ExampleLoading />}>
            <section>{children}</section>
          </Suspense>
          {examples.map((example) => (
            <section key={example.href}>
              {pathname === example.href && (
                <>
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-semibold">
                      {example.label}
                    </h1>
                    <p className="mt-4 text-sm sm:text-base">
                      {example.description}
                    </p>
                  </div>
                  <Suspense fallback={<ExampleLoading />}>
                    {example.code}
                  </Suspense>
                </>
              )}
            </section>
          ))}
        </main>
      </div>
    </div>
  );
}

