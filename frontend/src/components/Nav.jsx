import { useEffect, useState } from "react";
import Magnetic from "./Magnetic";

const TABS = [
  { id: "about", label: "About Me" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const [active, setActive] = useState("about");

  useEffect(() => {
    const sections = TABS.map((t) => document.getElementById(t.id)).filter(
      Boolean,
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-paper/90 backdrop-blur border-b border-line">
      <nav className="max-w-5xl mx-auto flex items-center gap-1 px-4 sm:px-8 h-14 overflow-x-auto">
        <span className="font-mono text-xs text-ink-soft mr-4 whitespace-nowrap">
          Tejas portfolio
        </span>
        {TABS.map((t) => (
          <Magnetic key={t.id} strength={8}>
            <button
              onClick={() => scrollTo(t.id)}
              data-active={active === t.id}
              className={`tab-underline whitespace-nowrap font-mono text-sm px-3 py-2 rounded-t-md transition-colors ${
                active === t.id
                  ? "text-ink bg-surface border border-b-0 border-line"
                  : "text-ink-soft hover:text-ink"
              }`}>
              {t.label}
            </button>
          </Magnetic>
        ))}
      </nav>
    </header>
  );
}
