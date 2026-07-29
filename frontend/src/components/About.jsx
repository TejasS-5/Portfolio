import { motion } from "framer-motion";

const FACTS = [
  { label: "Based in", value: "Nagpur, India" },
  { label: "Focus", value: "Full-stack web, developer tools" },
  { label: "Stack", value: "React · Flask · SQLLITE" },
  { label: "Currently", value: "Open to new roles" },
];

export default function About({ profile }) {
  return (
    <section id="about" className="border-t border-line">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-24 grid md:grid-cols-[0.9fr_1.1fr] gap-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}>
          <p className="font-mono text-xs text-cobalt mb-3">About</p>
          <h2 className="font-display text-3xl font-semibold">
            A little about me
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-6">
          <p className="text-ink-soft leading-relaxed text-lg">
            I'm a Computer Science engineering student passionate about building
            modern, user-friendly web applications. I enjoy working with React,
            JavaScript, Python, and Flask to create clean, responsive, and
            practical solutions. I'm always eager to learn new technologies,
            improve my skills, and contribute to real-world projects that make a
            positive impact.
          </p>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-4 pt-2">
            {FACTS.map((f) => (
              <div key={f.label} className="border-t border-line pt-3">
                <dt className="font-mono text-xs text-ink-soft/70 uppercase tracking-wide">
                  {f.label}
                </dt>
                <dd className="mt-1 text-ink">{f.value}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
