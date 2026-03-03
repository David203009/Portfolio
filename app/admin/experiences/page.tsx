"use client";

import { useEffect, useState } from "react";

interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
}

const emptyExp = { title: "", company: "", period: "", description: "", technologies: "" };

export default function ExperiencesAdmin() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [form, setForm] = useState(emptyExp);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    const res = await fetch("/api/admin/experiences");
    const data = await res.json();
    setExperiences(data);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      ...form,
      technologies: form.technologies.split(",").map((t) => t.trim()).filter(Boolean),
    };

    try {
      if (editingId) {
        await fetch(`/api/admin/experiences/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch("/api/admin/experiences", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      setForm(emptyExp);
      setEditingId(null);
      setShowForm(false);
      await fetchData();
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (exp: Experience) => {
    setForm({
      title: exp.title,
      company: exp.company,
      period: exp.period,
      description: exp.description,
      technologies: exp.technologies.join(", "),
    });
    setEditingId(exp.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this experience?")) return;
    await fetch(`/api/admin/experiences/${id}`, { method: "DELETE" });
    await fetchData();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-primary">Experience</h1>
        <button
          onClick={() => { setShowForm(!showForm); setEditingId(null); setForm(emptyExp); }}
          className="px-4 py-2 bg-accent text-bg text-sm font-semibold rounded-xl hover:bg-accent-hover transition-colors"
        >
          {showForm ? "Cancel" : "Add Experience"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-2xl p-6 space-y-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-muted mb-2">Job Title</label>
              <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-3 bg-bg border border-border rounded-xl text-primary text-sm focus:outline-none focus:border-accent" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted mb-2">Company</label>
              <input type="text" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="w-full px-4 py-3 bg-bg border border-border rounded-xl text-primary text-sm focus:outline-none focus:border-accent" required />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-muted mb-2">Period</label>
              <input type="text" value={form.period} onChange={(e) => setForm({ ...form, period: e.target.value })} className="w-full px-4 py-3 bg-bg border border-border rounded-xl text-primary text-sm focus:outline-none focus:border-accent" placeholder="2023 - Present" />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted mb-2">Technologies (comma separated)</label>
              <input type="text" value={form.technologies} onChange={(e) => setForm({ ...form, technologies: e.target.value })} className="w-full px-4 py-3 bg-bg border border-border rounded-xl text-primary text-sm focus:outline-none focus:border-accent" placeholder="React, Node.js" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-muted mb-2">Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full px-4 py-3 bg-bg border border-border rounded-xl text-primary text-sm focus:outline-none focus:border-accent resize-none" />
          </div>
          <button type="submit" disabled={saving} className="px-6 py-3 bg-accent text-bg font-semibold rounded-xl hover:bg-accent-hover disabled:opacity-50 transition-colors">
            {saving ? "Saving..." : editingId ? "Update Experience" : "Create Experience"}
          </button>
        </form>
      )}

      <div className="space-y-4">
        {experiences.map((exp) => (
          <div key={exp.id} className="bg-surface border border-border rounded-2xl p-5 flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-primary">{exp.title}</h3>
              <p className="text-accent text-sm">{exp.company}</p>
              <p className="text-muted text-xs mt-1">{exp.period}</p>
              <p className="text-muted text-sm mt-2">{exp.description}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {exp.technologies.map((tech) => (
                  <span key={tech} className="px-2 py-1 text-xs text-accent/80 bg-accent/5 border border-accent/10 rounded-full">{tech}</span>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(exp)} className="px-3 py-2 text-sm text-accent hover:bg-accent/10 rounded-lg transition-colors">Edit</button>
              <button onClick={() => handleDelete(exp.id)} className="px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
