import { motion } from "framer-motion";

export default function Skills({ skills, loading }) {
  return (
    <section id="skills" className="border-t border-line">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-24">
        <p className="font-mono text-xs text-cobalt mb-3">Skills</p>
        <h2 className="font-display text-3xl font-semibold mb-10">
          What I work with
        </h2>

        <div className="rounded-lg border border-line bg-ink text-paper font-mono text-sm overflow-hidden shadow-card">
          <div className="px-5 py-3 border-b border-white/10 text-paper/50 text-xs">
            Skills
          </div>
          <div className="p-6 space-y-5">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-5 w-2/3 bg-white/10 rounded animate-pulse"
                  />
                ))
              : skills.map((group, gi) => (
                  <motion.div
                    key={group.group}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.35, delay: gi * 0.06 }}>
                    <span className="text-signal">
                      {group.group.toLowerCase()}:
                    </span>
                    <div className="pl-4 mt-1 flex flex-wrap gap-x-2 gap-y-1">
                      {group.items.map((item) => (
                        <span key={item} className="text-paper/85">
                          - {item}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
          </div>
        </div>
      </div>
    </section>
  );
}
