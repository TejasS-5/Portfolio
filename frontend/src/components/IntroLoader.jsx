import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_STEPS = [
  "$ npm run dev",
  "compiling modules...",
  "starting server...",
  "ready ✓",
];

const SESSION_KEY = "portfolio-intro-seen";

export default function IntroLoader({ onDone }) {
  const [step, setStep] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [skip, setSkip] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem(SESSION_KEY);
    if (reduced || seen) {
      setSkip(true);
      onDone?.();
      return;
    }
    sessionStorage.setItem(SESSION_KEY, "1");
  }, [onDone]);

  useEffect(() => {
    if (skip) return;
    if (step >= BOOT_STEPS.length) {
      const t = setTimeout(() => setExiting(true), 300);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStep((s) => s + 1), 320);
    return () => clearTimeout(t);
  }, [step, skip]);

  if (skip) return null;

  return (
    <AnimatePresence onExitComplete={onDone}>
      {!exiting && (
        <motion.div
          className="fixed inset-0 z-[200] bg-ink flex items-center justify-center"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="font-mono text-sm sm:text-base text-paper w-72 sm:w-96">
            {BOOT_STEPS.slice(0, step).map((line, i) => (
              <motion.div
                key={line}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: i === step - 1 ? 1 : 0.4, y: 0 }}
                className={i === BOOT_STEPS.length - 1 ? "text-signal" : "text-paper/80"}
              >
                {line}
              </motion.div>
            ))}
            <div className="mt-4 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-cobalt"
                initial={{ width: "0%" }}
                animate={{ width: `${(step / BOOT_STEPS.length) * 100}%` }}
                transition={{ duration: 0.25 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
