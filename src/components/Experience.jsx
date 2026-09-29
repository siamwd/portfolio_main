import React from "react";
import { BriefcaseBusiness, ExternalLink, GraduationCap } from "lucide-react";

export default function Experience() {
  return (
    <section
      id="experience"
      className="mx-auto w-[calc(100%-32px)] max-w-[1450px] scroll-mt-20 py-[80px] sm:w-[calc(100%-48px)] sm:py-[105px]"
    >
      {/* Heading */}
      <div className="flex items-start gap-5">
        <span className="font-mono text-xs text-[#65f6d2]">02</span>

        <div>
          <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#65f6d2]">
            Experience
          </p>

          <h2 className="text-[clamp(30px,4vw,52px)] font-extrabold leading-[1.05] tracking-[-0.04em] text-[#f1f5f9]">
            Where I've been learning by building.
          </h2>
        </div>
      </div>

      {/* Timeline */}
      <div className="pt-7">
        {/* Experience */}
        <article className="grid grid-cols-[38px_1fr] gap-3 sm:grid-cols-[50px_1fr] sm:gap-[18px]">
          <div className="grid h-[34px] w-[34px] place-items-center border border-white/[0.09] text-[#65f6d2] sm:h-10 sm:w-10">
            <BriefcaseBusiness size={17} />
          </div>

          <div className="border-b border-white/[0.09] pb-[22px] sm:pb-7">
            <div className="flex flex-col justify-between gap-1 sm:flex-row sm:gap-7">
              <div>
                <span className="text-sm text-[#65f6d2]">
                  Full Stack Developer Intern
                </span>

                <h3 className="my-1.5 text-[18px] font-bold tracking-[-0.02em] text-[#f1f5f9] sm:text-[21px]">
                  Universe Soft Tech
                </h3>
              </div>

              <span className="whitespace-nowrap pt-1 text-xs text-[#67717f]">
                August 2026 - Present
              </span>
            </div>

            <p className="max-w-[760px] text-[14px] text-[#8b96a6]">
             Hands-on full-stack development experience using Python, Django, REST APIs, React, and modern web technologies in a professional environment.

            </p>

            <a
              href="https://universeitinstitute.com/"
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 text-xs font-extrabold text-[#65f6d2]"
            >
              Visit organization
              <ExternalLink size={14} />
            </a>
          </div>
        </article>

        {/* Education */}
        <article className="mt-7 grid grid-cols-[38px_1fr] gap-3 sm:mt-[35px] sm:grid-cols-[50px_1fr] sm:gap-[18px]">
          <div className="grid h-[34px] w-[34px] place-items-center border border-white/[0.09] text-[#65f6d2] sm:h-10 sm:w-10">
            <GraduationCap size={17} />
          </div>

          <div className="border-b border-white/[0.09] pb-[22px] sm:pb-7">
            <div className="flex flex-col justify-between gap-1 sm:flex-row sm:gap-7">
              <div>
                <span className="text-sm text-[#65f6d2]">
                  Diploma in Computer Science & Technology
                </span>

                <h3 className="my-1.5 text-[18px] font-bold tracking-[-0.02em] text-[#f1f5f9] sm:text-[21px]">
                  Feni Polytechnic Institute
                </h3>
              </div>

              <span className="whitespace-nowrap pt-1 text-xs text-[#67717f]">
                2022 — 2026
              </span>
            </div>

            <p className="max-w-[760px] text-[14px] text-[#8b96a6]">
              CGPA: 3.31 / 4.00 · Feni Sadar, Feni
            </p>

            <a
              href="https://feni.polytech.gov.bd/"
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 text-xs font-extrabold text-[#65f6d2]"
            >
              Institute website
              <ExternalLink size={14} />
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}