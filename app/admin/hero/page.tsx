"use client";

import { useEffect, useState } from "react";

export default function HeroAdmin() {
  const [form, setForm] = useState({ name: "", status: "", bio: "" });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/admin/hero")
      .then((r) => r.json())
      .then((data) => setForm(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const res = await fetch("/api/admin/hero", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setMessage("Saved successfully!");
      } else {
        setMessage("Error saving changes.");
      }
    } catch {
      setMessage("Error saving changes.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-8">Edit Hero Section</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl bg-surface border border-border rounded-2xl p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-muted mb-2">Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3 bg-bg border border-border rounded-xl text-primary text-sm focus:outline-none focus:border-accent transition-colors"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-muted mb-2">Status</label>
          <input
            type="text"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="w-full px-4 py-3 bg-bg border border-border rounded-xl text-primary text-sm focus:outline-none focus:border-accent transition-colors"
            placeholder="e.g. Available for work"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-muted mb-2">Bio</label>
          <textarea
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 bg-bg border border-border rounded-xl text-primary text-sm focus:outline-none focus:border-accent transition-colors resize-none"
            required
          />
        </div>

        {message && (
          <p className={`text-sm ${message.includes("success") ? "text-emerald" : "text-red-400"}`}>
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-3 bg-accent text-bg font-semibold rounded-xl transition-all duration-300 hover:bg-accent-hover disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}