"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "D" },
  { href: "/admin/hero", label: "Hero", icon: "H" },
  { href: "/admin/projects", label: "Projects", icon: "P" },
  { href: "/admin/experiences", label: "Experience", icon: "E" },
  { href: "/admin/skills", label: "Skills", icon: "S" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-bg flex">
      {/* Sidebar */}
      <aside className="w-64 bg-surface border-r border-border flex flex-col">
        <div className="p-6 border-b border-border">
          <Link href="/" className="text-lg font-bold text-primary hover:text-accent transition-colors">
            Portfolio Admin
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                pathname === item.href
                  ? "bg-accent/10 text-accent border border-accent/20"
                  : "text-muted hover:text-primary hover:bg-white/5"
              }`}
            >
              <span className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent text-xs font-bold">
                {item.icon}
              </span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-3 text-sm font-medium text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
