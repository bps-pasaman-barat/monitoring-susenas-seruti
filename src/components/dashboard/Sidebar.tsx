"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const MENU_ITEMS = [
  { label: "Dashboard", href: "/dashboard-admin" },
  { label: "Kecamatan", href: "/kecamatan" },
  { label: "Nagari", href: "/nagari" },
  { label: "Users", href: "/users" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 shrink-0 border-r bg-sidebar p-4">
      <div className="mb-6 px-2">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold"
        >
          Home
        </Link>
      </div>

      <nav className="flex flex-col gap-1">
        {MENU_ITEMS.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block px-3 py-2 rounded hover:bg-accent hover:text-accent-foreground transition-colors",
                isActive
                  ? "bg-blue-500 text-white font-medium hover:bg-blue-600 hover:text-white"
                  : "text-muted-foreground",
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
