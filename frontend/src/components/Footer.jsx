export default function Footer({ profile }) {
  return (
    <footer className="border-t border-line">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-xs text-ink-soft">
        <span>
          &copy; {new Date().getFullYear()}{" "}
          {profile?.name || "Tejas V Sontakke"}
        </span>
        <span>Built with React &amp; Flask</span>
      </div>
    </footer>
  );
}
