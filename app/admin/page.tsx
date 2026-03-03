"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ projects: 0, experiences: 0, skills: 0 });

  useEffect(() => {
    async function fetchStats() {
      const [p, e, s] = await Promise.all([
        fetch("/api/admin/projects").then((r) => r.json()),
        fetch("/api/admin/experiences").then((r) => r.json()),
        fetch("/api/admin/skills").then((r) => r.json()),
      ]);
      setStats({ projects: p.length, experiences: e.length, skills: s.length });
    }
    fetchStats();
  }, []);

  const cards = [
    { label: "Projects", count: stats.projects, href: "/admin/projects", color: "accent" },
    { label: "Experiences", count: stats.experiences, href: "/admin/experiences", color: "emerald" },
    { label: "Skill Categories", count: stats.skills, href: "/admin/skills", color: "accent" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-surface border border-border rounded-2xl p-6 hover:border-accent/30 transition-all duration-300"
          >
            <p className="text-muted text-sm mb-2">{card.label}</p>
            <p className="text-4xl font-bold text-primary">{card.count}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 bg-surface border border-border rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-primary mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/hero" className="px-4 py-2 bg-accent/10 text-accent text-sm font-medium rounded-lg hover:bg-accent/20 transition-colors">
            Edit Hero Section
          </Link>
          <Link href="/admin/projects" className="px-4 py-2 bg-accent/10 text-accent text-sm font-medium rounded-lg hover:bg-accent/20 transition-colors">
            Manage Projects
          </Link>
          <Link href="/" className="px-4 py-2 bg-white/5 text-muted text-sm font-medium rounded-lg hover:text-primary transition-colors">
            View Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
