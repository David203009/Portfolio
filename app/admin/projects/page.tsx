"use client";

import { useEffect, useState } from "react";

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
}

const emptyProject = { title: "", description: "", tags: "", githubUrl: "", liveUrl: "" };

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState(emptyProject);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchProjects = async () => {
    const res = await fetch("/api/admin/projects");
    const data = await res.json();
    setProjects(data);
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
    };

    try {
      if (editingId) {
        await fetch(`/api/admin/projects/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch("/api/admin/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      setForm(emptyProject);
      setEditingId(null);
      setShowForm(false);
      await fetchProjects();
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (project: Project) => {
    setForm({
      title: project.title,
      description: project.description,
      tags: project.tags.join(", "),
      githubUrl: project.githubUrl,
      liveUrl: project.liveUrl,
    });
    setEditingId(project.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
    await fetchProjects();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-primary">Projects</h1>
        <button
          onClick={() => { setShowForm(!showForm); setEditingId(null); setForm(emptyProject); }}
          className="px-4 py-2 bg-accent text-bg text-sm font-semibold rounded-xl hover:bg-accent-hover transition-colors"
        >
          {showForm ? "Cancel" : "Add Project"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-2xl p-6 space-y-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-muted mb-2">Title</label>
              <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-3 bg-bg border border-border rounded-xl text-primary text-sm focus:outline-none focus:border-accent" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted mb-2">Tags (comma separated)</label>
              <input type="text" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} className="w-full px-4 py-3 bg-bg border border-border rounded-xl text-primary text-sm focus:outline-none focus:border-accent" placeholder="React, Node.js, TypeScript" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-muted mb-2">Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full px-4 py-3 bg-bg border border-border rounded-xl text-primary text-sm focus:outline-none focus:border-accent resize-none" required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-muted mb-2">GitHub URL</label>
              <input type="text" value={form.githubUrl} onChange={(e) => setForm({ ...form, githubUrl: e.target.value })} className="w-full px-4 py-3 bg-bg border border-border rounded-xl text-primary text-sm focus:outline-none focus:border-accent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted mb-2">Live URL</label>
              <input type="text" value={form.liveUrl} onChange={(e) => setForm({ ...form, liveUrl: e.target.value })} className="w-full px-4 py-3 bg-bg border border-border rounded-xl text-primary text-sm focus:outline-none focus:border-accent" />
            </div>
          </div>
          <button type="submit" disabled={saving} className="px-6 py-3 bg-accent text-bg font-semibold rounded-xl hover:bg-accent-hover disabled:opacity-50 transition-colors">
            {saving ? "Saving..." : editingId ? "Update Project" : "Create Project"}
          </button>
        </form>
      )}

      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="bg-surface border border-border rounded-2xl p-5 flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-primary">{project.title}</h3>
              <p className="text-muted text-sm mt-1">{project.description}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 text-xs text-accent/80 bg-accent/5 border border-accent/10 rounded-full">{tag}</span>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(project)} className="px-3 py-2 text-sm text-accent hover:bg-accent/10 rounded-lg transition-colors">Edit</button>
              <button onClick={() => handleDelete(project.id)} className="px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}