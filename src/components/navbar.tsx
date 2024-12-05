import Link from "next/link";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { ThemeToggle } from "./theme-toggle";
import Logo from "./logo";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className="flex items-center space-x-2">
                  <Logo />{" "}
                  <span className="uppercase font-semibold hidden md:block">
                    Shadcn Table Maker
                  </span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex flex-1 items-center justify-end">
          <nav className="flex items-center space-x-2">
            <Link href={"/readme"}>
              <Button variant={"link"}>Readme</Button>
            </Link>
            <Link href={"/examples"}>
              <Button variant={"link"}>Examples</Button>
            </Link>
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://github.com/bprabin811/ShadCN-Table-Maker" target="_blank">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
