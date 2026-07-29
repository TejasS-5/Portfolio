import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Github, Linkedin, Twitter, CheckCircle2 } from "lucide-react";

const ICONS = { github: Github, linkedin: Linkedin, twitter: Twitter };

export default function Contact({ profile }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [state, setState] = useState("idle"); // idle | sending | sent

  const update = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setState("sending");
    setErrors({});
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrors(data.errors || {});
        setState("idle");
        return;
      }
      setState("sent");
    } catch {
      setErrors({
        message: "Couldn't reach the server. Is the Flask API running?",
      });
      setState("idle");
    }
  };

  return (
    <section id="contact" className="border-t border-line bg-surface">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-24 grid md:grid-cols-[0.9fr_1.1fr] gap-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}>
          <p className="font-mono text-xs text-cobalt mb-3">Contact</p>
          <h2 className="font-display text-3xl font-semibold">
            Let's work together
          </h2>
          <p className="mt-4 text-ink-soft leading-relaxed max-w-sm">
            Have a role, project, or just want to talk shop? Send a message and
            I'll reply as soon as I can.
          </p>
          <div className="mt-8 flex gap-3">
            {Object.entries(profile?.socials || {}).map(([key, url]) => {
              const Icon = ICONS[key];
              if (!Icon) return null;
              return (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={key}
                  className="p-2.5 rounded-md border border-line hover:border-cobalt hover:text-cobalt transition-colors">
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-lg border border-line bg-paper shadow-card overflow-hidden">
          <div className="px-5 py-3 border-b border-line font-mono text-xs text-ink-soft">
            contact.sh
          </div>
          {state === "sent" ? (
            <div className="p-8 flex flex-col items-center text-center gap-3">
              <CheckCircle2 className="text-cobalt" size={32} />
              <p className="font-mono text-sm">
                Message sent — thanks for reaching out.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="p-6 space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="font-mono text-xs text-ink-soft">
                  --name
                </label>
                <input
                  id="name"
                  value={form.name}
                  onChange={update("name")}
                  className="mt-1 w-full rounded-md border border-line px-3 py-2 bg-surface focus:border-cobalt outline-none"
                  placeholder="Jane Doe"
                />
                {errors.name && (
                  <p className="text-xs text-red-600 mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="font-mono text-xs text-ink-soft">
                  --email
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  className="mt-1 w-full rounded-md border border-line px-3 py-2 bg-surface focus:border-cobalt outline-none"
                  placeholder="jane@company.com"
                />
                {errors.email && (
                  <p className="text-xs text-red-600 mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="font-mono text-xs text-ink-soft">
                  --message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={form.message}
                  onChange={update("message")}
                  className="mt-1 w-full rounded-md border border-line px-3 py-2 bg-surface focus:border-cobalt outline-none resize-none"
                  placeholder="Tell me about the role or project..."
                />
                {errors.message && (
                  <p className="text-xs text-red-600 mt-1">{errors.message}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={state === "sending"}
                className="w-full inline-flex items-center justify-center gap-2 bg-ink text-paper font-mono text-sm px-5 py-3 rounded-md hover:bg-cobalt transition-colors disabled:opacity-60">
                {state === "sending" ? "Sending..." : "Send message"}{" "}
                <Send size={16} />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
