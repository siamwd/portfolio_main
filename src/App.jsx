import React, { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
} from "lucide-react";

import Home from "./components/Home";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import SkillsWork from "./components/Skillgroup";
import  SkillGroups from "./components/Toolkit";
import Services from "./components/Service";

const profile = {
  email: "mdmahfujur295@gmail.com",
  github: "https://github.com/siamwd",
  linkedin: "https://www.linkedin.com/in/mahfujur-django-python",
};

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = [...document.querySelectorAll("section[id]")];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => b.intersectionRatio - a.intersectionRatio
          )[0];

        if (visible) {
          setActive(visible.target.id);
        }
      },
      {
        rootMargin: "-25% 0px -65% 0px",
        threshold: [0.05, 0.2, 0.5],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const navItems = [
    ["home", "Home"],
    ["about", "About"],
    ["experience", "Experience"],
    ["projects", "Projects"],
    ["skills", "Skills"],
    ["contact", "Contact"],
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-[#07090d] font-['Manrope'] text-[#f1f5f9]">
      {/* ================= NAVBAR ================= */}
      <header className="sticky top-0 z-50 mx-auto  flex h-[60px] w-[calc(100%-32px)] max-w-[1450px] items-center justify-between border-b border-white/[0.09] bg-[#07090d]/75 backdrop-blur-[18px] sm:h-[64px] sm:w-[calc(100%-48px)]">
        {/* Brand */}
        <a
          href="#home"
          onClick={closeMenu}
          className="inline-flex items-center gap-2.5 text-[26px] font-extrabold tracking-[0.08em] sm:text-[20px]"
        >

          <span>MAHFUJ</span>
        </a>

        {/* Navigation */}
        <nav
          className={`${
            menuOpen
              ? "translate-y-0"
              : "-translate-y-[130%] lg:translate-y-0"
          } fixed inset-x-0 top-[78px] flex flex-col items-stretch gap-0 border-b border-white/[0.09] bg-[#07090d]/95 px-6 py-[22px]] backdrop-blur-xl transition-transform duration-300 lg:static lg:flex lg:flex-row lg:items-center lg:gap-7 lg:border-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none`}
        >
          {navItems.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={closeMenu}
              className={`py-3 text-[15px] font-bold transition lg:py-0 ${
                active === id
                  ? "text-[#f1f5f9]"
                  : "text-[#8b96a6] hover:text-[#f1f5f9]"
              }`}
            >
              {label}
            </a>
          ))}

          <a
            href="#contact"
            onClick={closeMenu}
            className="mt-2 inline-flex items-center justify-center gap-1 bg-[#65f6d2] px-[18px] py-2 text-[15px] font-bold text-[#07090d] lg:mt-0 rounded-sm"
          >
            Let's talk
            <ArrowUpRight size={15} />
          </a>
        </nav>

        {/* Mobile Menu */}
        <button
          className="block border-0 bg-transparent text-[#f1f5f9] lg:hidden"
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      {/* ================= SECTIONS ================= */}
      <main>
        <Home />
        <About />
        <SkillsWork/>
        <SkillGroups/>
        <Services/>
        <Projects />
        <Experience />
   
        <Contact />
      </main>
      <Footer/>

      {/* ================= FOOTER ================= */}
      {/* <footer className="mx-auto grid w-[calc(100%-32px)] max-w-[1180px] gap-6 border-t border-white/[0.09] py-[25px] sm:w-[calc(100%-48px)] sm:grid-cols-1 sm:py-[30px] lg:grid-cols-[1fr_auto_auto] lg:items-end">
        <div>
          <span className="text-xs font-extrabold tracking-[0.12em]">
            MAHFUJUR RAHMAN
          </span>

          <p className="mt-1 text-[11px] text-[#687382]">
            Full Stack Development · Backend Development
          </p>
        </div>

        <div className="flex flex-wrap gap-[18px]">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-[11px] text-[#8b96a6] hover:text-[#65f6d2]"
          >
            <Github size={17} />
            GitHub
          </a>

          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-[11px] text-[#8b96a6] hover:text-[#65f6d2]"
          >
            <Linkedin size={17} />
            LinkedIn
          </a>

          <a
            href="https://mail.google.com/mail/u/0/#inbox"
            className="inline-flex items-center gap-1.5 text-[11px] text-[#8b96a6] hover:text-[#65f6d2]"
          >
            <Mail size={17} />
            Email
          </a>
        </div>

        <span className="text-[11px] text-[#687382] lg:text-right">
          © {new Date().getFullYear()} Mahfujur Rahman
        </span>
      </footer> */}
    </div>
  );
}

export default App;