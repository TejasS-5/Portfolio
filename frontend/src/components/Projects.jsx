import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Star, ExternalLink } from "lucide-react";

// A small 3D tilt: the card leans away from the cursor position, with a
// spring so it settles instead of snapping.
function TiltCard({ children, className, ...props }) {
  const ref = useRef(null);
  const rotateXRaw = useMotionValue(0);
  const rotateYRaw = useMotionValue(0);
  const rotateX = useSpring(rotateXRaw, { stiffness: 220, damping: 20 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 220, damping: 20 });

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateYRaw.set(px * 10);
    rotateXRaw.set(py * -10);
  };

  const handleLeave = () => {
    rotateXRaw.set(0);
    rotateYRaw.set(0);
  };

  return (
    <motion.a
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={className}
      {...props}
    >
      {children}
    </motion.a>
  );
}

const STATUS_STYLES = {
  active: "text-signal bg-ink",
  maintained: "text-cobalt bg-cobalt/10",
  archived: "text-ink-soft bg-line/50",
};

export default function Projects({ projects, loading }) {
  return (
    <section id="projects" className="border-t border-line bg-surface">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-24">
        <p className="font-mono text-xs text-cobalt mb-3">Projects</p>
        <h2 className="font-display text-3xl font-semibold mb-10">Things I've built</h2>

        {loading ? (
          <div className="grid sm:grid-cols-2 gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-40 rounded-lg border border-line animate-pulse bg-line/20" />
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-5">
            {projects.map((p, i) => (
              <TiltCard
                key={p.id}
                href={p.url}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                className="group rounded-lg border border-line p-6 bg-paper shadow-card hover:shadow-card-hover hover:border-cobalt/40 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-mono text-base font-medium group-hover:text-cobalt transition-colors">
                    {p.name}
                  </h3>
                  <ExternalLink
                    size={16}
                    className="text-ink-soft/50 group-hover:text-cobalt shrink-0 mt-0.5 transition-colors"
                  />
                </div>
                <p className="mt-3 text-sm text-ink-soft leading-relaxed">{p.description}</p>
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="font-mono text-[11px] px-2 py-1 rounded border border-line text-ink-soft"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-4 font-mono text-xs text-ink-soft">
                  <span className="inline-flex items-center gap-1">
                    <Star size={13} /> {p.stars}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full ${STATUS_STYLES[p.status] || ""}`}
                  >
                    {p.status}
                  </span>
                </div>
              </TiltCard>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
