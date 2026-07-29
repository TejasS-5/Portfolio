import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Magnetic from "./Magnetic";

const BOOT_LINES = [
  "$ whoami",
  "Tejas V Sontakke — full-stack developer",
  "$ status --check",
  "available for new opportunities ✓",
];

export default function Hero({ profile }) {
  const [typed, setTyped] = useState("");
  const [lineIdx, setLineIdx] = useState(0);
  const [done, setDone] = useState(false);
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  // background shapes drift at different rates than the content as you
  // scroll past the hero, giving a sense of depth
  const shapeSlowY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reduceMotion ? 0 : 120],
  );
  const shapeFastY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reduceMotion ? 0 : 240],
  );
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reduceMotion ? 0 : 60],
  );
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    if (reduceMotion) {
      setDone(true);
      return;
    }
    if (lineIdx >= BOOT_LINES.length) {
      setDone(true);
      return;
    }
    const full = BOOT_LINES[lineIdx];
    if (typed.length < full.length) {
      const t = setTimeout(() => setTyped(full.slice(0, typed.length + 1)), 22);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setLineIdx((i) => i + 1);
      setTyped("");
    }, 380);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typed, lineIdx]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center pt-14 overflow-hidden">
      {/* parallax background shapes — purely atmospheric, drift as you scroll */}
      <motion.div
        aria-hidden="true"
        style={{ y: shapeSlowY }}
        className="pointer-events-none absolute -top-24 right-[8%] w-72 h-72 rounded-full bg-cobalt/10 blur-3xl"
      />
      <motion.div
        aria-hidden="true"
        style={{ y: shapeFastY }}
        className="pointer-events-none absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-signal/20 blur-3xl"
      />
      <motion.div
        aria-hidden="true"
        style={{ y: shapeSlowY }}
        className="pointer-events-none absolute bottom-0 left-[6%] w-56 h-56 rounded-full bg-cobalt/5 blur-2xl"
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="max-w-5xl mx-auto px-4 sm:px-8 w-full grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center py-20 relative">
        <div>
          <p className="font-mono text-xs text-cobalt mb-4 tracking-wide">
            // {profile?.availability || "open to work"}
          </p>
          <h1 className="font-display text-5xl sm:text-6xl font-semibold leading-[1.05] tracking-tight">
            {profile?.name || "Tejas V Sontakke"}
          </h1>
          <p className="font-display text-2xl sm:text-3xl text-ink-soft mt-3">
            {profile?.title || "Full-Stack Software Developer"}
          </p>
          <p className="mt-6 text-lg text-ink-soft max-w-md leading-relaxed">
            {profile?.tagline ||
              "I build fast, accessible web apps — from the database to the pixel."}
          </p>
          <div className="mt-8 flex gap-4">
            <Magnetic strength={14}>
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 bg-ink text-paper font-mono text-sm px-5 py-3 rounded-md hover:bg-cobalt transition-colors">
                View projects <ArrowDown size={16} />
              </a>
            </Magnetic>
            <Magnetic strength={14}>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 border border-line font-mono text-sm px-5 py-3 rounded-md hover:border-ink transition-colors">
                Get in touch
              </a>
            </Magnetic>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="rounded-lg border border-line bg-ink text-paper shadow-card overflow-hidden relative z-10">
          <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/10">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
            <span className="ml-3 font-mono text-xs text-paper/50">
              boot.sh
            </span>
          </div>
          <div className="p-6 font-mono text-sm min-h-[180px] leading-7">
            {BOOT_LINES.slice(0, done ? BOOT_LINES.length : lineIdx).map(
              (l, i) => (
                <div
                  key={i}
                  className={i % 2 === 0 ? "text-signal" : "text-paper/80"}>
                  {l}
                </div>
              ),
            )}
            {!done && (
              <div
                className={lineIdx % 2 === 0 ? "text-signal" : "text-paper/80"}>
                {typed}
                <span className="code-caret animate-blink">&nbsp;</span>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
