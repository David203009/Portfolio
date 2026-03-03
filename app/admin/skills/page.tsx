"use client";

import { useEffect, useState } from "react";

interface SkillCategory {
  id: string;
  title: string;
  skills: { name: string }[];
}

const emptyCategory = { title: "", skills: "" };

export default function SkillsAdmin() {
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [form, setForm] = useState(emptyCategory);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    const res = await fetch("/api/admin/skills");
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      title: form.title,
      skills: form.skills.split(",").map((s) => ({ name: s.trim() })).filter((s) => s.name),
    };

    try {
      if (editingId) {
        await fetch(`/api/admin/skills/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch("/api/admin/skills", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      setForm(emptyCategory);
      setEditingId(null);
      setShowForm(false);
      await fetchData();
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (category: SkillCategory) => {
    setForm({
      title: category.title,
      skills: category.skills.map((s) => s.name).join(", "),
    });
    setEditingId(category.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    await fetch(`/api/admin/skills/${id}`, { method: "DELETE" });
    await fetchData();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-primary">Skills</h1>
        <button
          onClick={() => { setShowForm(!showForm); setEditingId(null); setForm(emptyCategory); }}
          className="px-4 py-2 bg-accent text-bg text-sm font-semibold rounded-xl hover:bg-accent-hover transition-colors"
        >
          {showForm ? "Cancel" : "Add Category"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-2xl p-6 space-y-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-muted mb-2">Category Name</label>
            <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-3 bg-bg border border-border rounded-xl text-primary text-sm focus:outline-none focus:border-accent" placeholder="e.g. Frontend" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted mb-2">Skills (comma separated)</label>
            <input type="text" value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} className="w-full px-4 py-3 bg-bg border border-border rounded-xl text-primary text-sm focus:outline-none focus:border-accent" placeholder="React, Next.js, TypeScript" required />
          </div>
          <button type="submit" disabled={saving} className="px-6 py-3 bg-accent text-bg font-semibold rounded-xl hover:bg-accent-hover disabled:opacity-50 transition-colors">
            {saving ? "Saving..." : editingId ? "Update Category" : "Create Category"}
          </button>
        </form>
      )}

      <div className="space-y-4">
        {categories.map((category) => (
          <div key={category.id} className="bg-surface border border-border rounded-2xl p-5 flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-primary">{category.title}</h3>
              <div className="flex flex-wrap gap-2 mt-3">
                {category.skills.map((skill) => (
                  <span key={skill.name} className="px-2 py-1 text-xs text-accent/80 bg-accent/5 border border-accent/10 rounded-full">{skill.name}</span>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(category)} className="px-3 py-2 text-sm text-accent hover:bg-accent/10 rounded-lg transition-colors">Edit</button>
              <button onClick={() => handleDelete(category.id)} className="px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
