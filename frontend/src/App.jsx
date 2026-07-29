import { useEffect, useState } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import IntroLoader from "./components/IntroLoader";
import useSmoothScroll from "./lib/useSmoothScroll";

export default function App() {
  useSmoothScroll();
  const [introDone, setIntroDone] = useState(false);
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadAll() {
      try {
        const [profileRes, projectsRes, skillsRes] = await Promise.all([
          fetch("/api/profile"),
          fetch("/api/projects"),
          fetch("/api/skills"),
        ]);
        const [profileData, projectsData, skillsData] = await Promise.all([
          profileRes.json(),
          projectsRes.json(),
          skillsRes.json(),
        ]);
        if (!cancelled) {
          setProfile(profileData);
          setProjects(projectsData);
          setSkills(skillsData);
        }
      } catch (err) {
        // Flask API not running — the page still renders with placeholders.
        console.warn(
          "Could not reach API, is the Flask backend running on :5000?",
          err,
        );
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadAll();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen">
      <IntroLoader onDone={() => setIntroDone(true)} />
      <div
        style={{
          opacity: introDone ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}>
        <CustomCursor />
        <ScrollProgress />
        <Nav />
        <main>
          <Hero profile={profile} />
          <About profile={profile} />
          <Projects projects={projects} loading={loading} />
          <Skills skills={skills} loading={loading} />
          <Contact profile={profile} />
        </main>
        <Footer profile={profile} />
      </div>
    </div>
  );
}
