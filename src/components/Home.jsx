import React from "react";
import {
  ArrowUpRight,
  ChevronDown,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";

const profile = {
  name: "Md. Mahfujur Rahman",
  email: "mdmahfujur295@gmail.com",
  github: "https://github.com/siamwd",
  linkedin: "https://www.linkedin.com/in/mahfujur-django-python",
};

export default function Home() {
  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100vh-74px)] w-full items-center overflow-hidden bg-[#07090d] py-0 sm:py-0"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute right-[-260px] top-2 h-[550px] w-[550px] rounded-full bg-[radial-gradient(circle,rgba(101,246,210,0.1),transparent_68%)]" />

      <div className="relative z-10 mx-auto grid w-full max-w-[1450px] -translate-y-6 grid-cols-1 items-center gap-10 px-6 py-2 sm:px-8 lg:-translate-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(320px,410px)] lg:gap-14 lg:px-[4vw]">
        {/* LEFT */}
        <div className="relative z-20 w-full max-w-[760px]">
          {/* Badge */}
          <div className="flex min-h-[42px] w-fit items-center gap-2.5 rounded-full border border-[#65f6d2]/35 bg-[#65f6d2]/10 px-4 text-[9px] font-extrabold uppercase tracking-[0.7px] text-[#65f6d2] sm:min-h-[44px] sm:px-5 sm:text-[12px] sm:tracking-[1px]">
            <span className="h-[7px] w-[7px] shrink-0 rounded-full bg-[#65f6d2] shadow-[0_0_12px_#65f6d2]" />
            FULL-STACK DEVELOPER • BACKEND DEVELOPER • PYTHON
          </div>

          {/* Title */}
          <h1 className="mb-2 mt-2 text-[clamp(43px,13vw,62px)] font-black leading-[0.98] tracking-[-3px] text-[#f1f5f9] sm:text-[clamp(50px,5.2vw,82px)] sm:tracking-[-4px]">
            Hi, I'm
            <br />
            <span>Md. Mahfujur Rahman.</span>
          </h1>

          {/* Animated Build Text */}
          <div className="mb-0 min-h-[82px] text-[29px] font-extrabold leading-tight text-[#f1f5f9] sm:flex sm:min-h-[44px] sm:items-center sm:gap-3 sm:text-[clamp(26px,2.6vw,40px)]">
            <span className="block whitespace-nowrap">
              I build
            </span>

            <span className="relative block h-[42px] w-full translate-y-[6px] overflow-hidden text-[clamp(20px,7vw,29px)] text-[#65f6d2] sm:h-[50px] sm:w-[min(520px,55vw)] sm:text-[clamp(26px,2.6vw,40px)]">
              <span className="absolute left-0 top-0 w-full whitespace-nowrap animate-build-text opacity-0">
                Full-Stack Applications
              </span>

              <span className="absolute left-0 top-0 w-full whitespace-nowrap animate-build-text animation-delay-2200 opacity-0">
                Django REST APIs
              </span>

              <span className="absolute left-0 top-0 w-full whitespace-nowrap animate-build-text animation-delay-4400 opacity-0">
                Modern React UIs
              </span>

              <span className="absolute left-0 top-0 w-full whitespace-nowrap animate-build-text animation-delay-6600 opacity-0">
                Scalable Web Solutions
              </span>
            </span>
          </div>

          {/* Description */}
          <p className="max-w-[680px] text-[12px] leading-[1.4] text-[#8b96a6] sm:text-[14px]">
            Building modern web applications with clean UI, scalable architecture, REST APIs, and robust backend solutions using Python, Django & React.

          </p>

          {/* Buttons */}
          <div className="mt-0 flex flex-nowrap gap-2 sm:mt-2 sm:gap-2">
            <a
              href="#projects"
              className="inline-flex min-h-[42px] items-center justify-center gap-1 whitespace-nowrap rounded-lg border border-[#65f6d2] bg-[#53f0c9] px-[11px] text-[11px] font-extrabold text-[#04100d] shadow-[0_10px_35px_rgba(101,246,210,0.08)] transition hover:-translate-y-1 hover:shadow-[0_14px_42px_rgba(101,246,210,0.16)] sm:min-h-[46px] sm:px-[20px] hover:bg-emerald-300 sm:text-[13px]"
            >
              View Projects
              <ArrowUpRight size={16} />
            </a>

            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-lg border border-white/[0.09] bg-white/[0.015] px-[13px] text-[11px] font-extrabold text-[#f1f5f9] transition hover:-translate-y-1 hover:border-[#65f6d2]/50 hover:text-[#65f6d2] sm:min-h-[46px] sm:px-[20px] sm:text-[13px]"
            >
              <Github size={16} />
              GitHub
            </a>

            <a
              href={`mailto:${profile.email}`}
              className="inline-flex min-h-[42px] items-center justify-center gap-1 whitespace-nowrap rounded-lg border border-white/[0.09] bg-white/[0.015] px-[13px] text-[11px] font-extrabold text-[#f1f5f9] transition hover:-translate-y-1 hover:border-[#65f6d2]/50 hover:text-[#65f6d2] sm:min-h-[46px] sm:px-[20px] sm:text-[13px]"
            >
              <Mail size={16} />
              Contact Me
            </a>
          </div>

          {/* Bottom */}
          <div className="mt-5 flex flex-wrap items-center gap-3 sm:mt-6 sm:gap-[22px] ml-2">


            <div className="flex items-center gap-2">
              <span className="mr-1 text-[10px] tracking-[1.5px] text-[#8b96a6]">
                PROFILES
              </span>


              {/* <span className="h-2 w-2 rounded-full bg-[#65f6d2] shadow-[0_0_14px_#65f6d2]" />
              <span className="h-2 w-2 rounded-full bg-white/[0.16]" />
              <span className="h-2 w-2 rounded-full bg-white/[0.16]" />
              <span className="h-2 w-2 rounded-full bg-white/[0.16]" />
              <span className="h-2 w-2 rounded-full bg-white/[0.16]" /> */}

              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="ml-1.5 flex transition hover:-translate-y-1 hover:text-[#65f6d2]"
              >
                <Github size={20} />
              </a>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="ml-1.5 flex transition hover:-translate-y-1 hover:text-[#65f6d2]"
              >
                <Linkedin size={20} />
              </a>

              <a
                href="#contact"
                aria-label="Email"
                className="ml-1.5 flex transition hover:-translate-y-1 hover:text-[#65f6d2]"
              >
                <Mail size={20} />
              </a>

            </div>

          </div>

        </div>
        <div className="absolute bottom-[18px] left-[40vw] hidden items-center gap-2 font-mono text-[9px] tracking-[0.16em] text-[#596372] lg:flex mt-20">
          <span>SCROLL TO EXPLORE</span>
          <ChevronDown size={16} />
        </div>

        {/* RIGHT IMAGE */}

        {/* RIGHT IMAGE */}
        {/* RIGHT IMAGE */}
        <div className="relative mx-auto flex h-full w-full max-w-[320px] items-center justify-center sm:max-w-[360px] lg:max-w-[390px] lg:justify-self-end">
          <div className="relative h-[350px] w-full overflow-hidden rounded-[17px] border border-[#65f6d2]/35 bg-black/20 animate-image-float sm:h-[390px] sm:rounded-[20px] lg:h-[450px] lg:max-h-[calc(100vh-100px)]">

            <div className="pointer-events-none absolute left-1/2 top-[-100px] z-[2] h-[220px] w-[400px] -translate-x-1/2 rounded-full bg-[#65f6d2] opacity-[0.07] blur-[80px]" />

            <img
              src="/profile.jpg"
              alt={profile.name}
              className="relative z-[1] block h-full w-full object-cover object-center"
            />

            <div className="absolute bottom-3 left-3 z-[5] flex items-center gap-2.5 rounded-lg border border-white/[0.09] bg-[#07090d]/90 px-3.5 py-2.5 font-mono text-[8px] tracking-[1.1px] backdrop-blur-xl sm:bottom-[18px] sm:left-[18px] sm:text-[9px]">
              <span className="font-black text-[#65f6d2]">01</span>
              <strong>FULL-STACK DEVELOPER</strong>
            </div>

          </div>
        </div>
      </div>


      {/* Scroll */}

    </section>

  );
}
