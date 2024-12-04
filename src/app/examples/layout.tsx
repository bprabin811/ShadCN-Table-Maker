"use client";
import { Suspense, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CodeBlocks from "@/components/examples/code-display";
import { Loader2 } from "lucide-react";

// Loading component for Suspense fallback
const ExampleLoading = () => <Loader2 size={16} className="animate-spin" />;

export default function ExamplesLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Sidebar links configuration
  const examples = [{ label: "Example 1", href: "/examples" }];

  return (
    <div className="container mx-auto">
      <div className="flex min-h-screen">
        {/* Left sidebar */}
        <aside className="w-64 border-r py-4">
          <h2 className="mb-4 text-lg font-semibold">Examples</h2>
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
                  >
                    {example.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 pl-4 flex flex-col gap-4">
          <Suspense fallback={<ExampleLoading />}>
            <section>{children}</section>
          </Suspense>

          <section>
            <div>
              <h1 className="text-3xl font-semibold">Example 1</h1>
              <p className="mt-4">
                This is an example page to demonstrate the layout of the
                examples page.
              </p>
            </div>
            <Suspense fallback={<ExampleLoading />}>
              <CodeBlocks />
            </Suspense>
          </section>
        </main>
      </div>
    </div>
  );
}
