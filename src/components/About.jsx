import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";



export default function About() {
  return (
    
            <section
              id="about"
              className="border-t border-white/[0.08] bg-[#05070a] px-[6vw] py-16 md:px-[8vw] md:py-[90px]"
            >
              {/* Section Header */}
              <div className="mb-12 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.12em] text-[#7f8a99] md:mb-[60px] md:text-[11px]">
                <span>01-About</span>
                <span className="text-[#65f6d2]">Profile</span>
              </div>

              <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_1.4fr] md:gap-[8vw]">
                
                {/* Heading */}
                <div>
                  <motion.h1
                    className="my-0 max-w-[950px] text-[13vw] font-extrabold leading-[0.92] tracking-[-0.065em] text-[#f1f5f9] md:text-[clamp(48px,6.2vw,92px)]"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.9,
                      delay: 0.15,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    Building digital{" "}
                    <em className="not-italic text-[#8b96a6]">products</em> with
                    <br className="hidden sm:block" /> clarity{" "}
                    <span className="text-[#65f6d2]">&</span> precision.
                  </motion.h1>
                </div>

                {/* Content */}
                <div className="pt-1">
                  <h3 className="mb-5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#65f6d2]">
                    What I build
                  </h3>

                  <p className="max-w-[680px] text-[20px] leading-[1.45] tracking-[-0.025em] text-[#e2e8f0] md:text-[26px]">
                    I enjoy building web applications that are fast, clean, and genuinely
                    useful. I focus on creating intuitive UI/UX, responsive frontend
                    experiences, and reliable full-stack solutions that turn ideas into
                    real products.
                  </p>

                  <p className="mt-6 max-w-[680px] text-[14px] leading-[1.85] text-[#8b96a6] md:text-[15px]">
                    My toolkit includes React, JavaScript, Python, Django, REST APIs,
                    databases, and Git. I focus on writing maintainable code, building
                    accessible interfaces, and making practical technical decisions that
                    create reliable user experiences.
                  </p>

                  {/* Social Links */}
                  <div className="mt-8 flex flex-wrap gap-6">
                    <a
                      className="group flex items-center gap-2 border-b border-white/[0.12] pb-1.5 font-mono text-[11px] text-[#cbd5e1] transition-all duration-300 hover:border-[#65f6d2] hover:text-[#65f6d2]"
                      href=""
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Github
                        size={16}
                        className="transition-transform duration-300 group-hover:-translate-y-0.5"
                      />
                      GitHub
                    </a>

                    <a
                      className="group flex items-center gap-2 border-b border-white/[0.12] pb-1.5 font-mono text-[11px] text-[#cbd5e1] transition-all duration-300 hover:border-[#65f6d2] hover:text-[#65f6d2]"
                      href=""
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Linkedin
                        size={16}
                        className="transition-transform duration-300 group-hover:-translate-y-0.5"
                      />
                      LinkedIn
                    </a>

                    <a
                      className="group flex items-center gap-2 border-b border-white/[0.12] pb-1.5 font-mono text-[11px] text-[#cbd5e1] transition-all duration-300 hover:border-[#65f6d2] hover:text-[#65f6d2]"
                      href=""
                    >
                      <Mail
                        size={16}
                        className="transition-transform duration-300 group-hover:-translate-y-0.5"
                      />
                      Email
                    </a>
                  </div>

                  {/* Small Accent Line */}
                  <div className="mt-10 h-px w-20 bg-[#65f6d2]/60" />
                </div>
              </div>
            </section>


           
        // <section
        //   id="about"
        //   className="px-[6vw] py-4 md:px-[8vw] md:py-[20px]"
        // >
        //   <div
        //     className=" mb-10 flex justify-between text-[#77736b] md:mb-[55px]"
        //   >
        //     <span> About</span>
        //     <span>Profile</span>
        //   </div>

        //   <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_1.4fr] md:gap-[10vw]">
        //     {/* Heading */}
        //     <div>
        //       <motion.h1
        //         className="my-5 max-w-[1000px] text-[14vw] font-bold leading-[.9] tracking-[-0.075em] text-[#11110f] md:text-[clamp(48px,7vw,105px)]"
        //         initial={{ opacity: 0, y: 60 }}
        //         whileInView={{ opacity: 1, y: 0 }}
        //         viewport={{ once: true }}
        //         transition={{
        //           duration: 1,
        //           delay: 0.25,
        //           ease: [0.16, 1, 0.3, 1],
        //         }}
        //       >
        //         Building digital{" "}
        //         <em className="not-italic text-[#77736b]">products</em> with
        //         <br className="hidden sm:block" /> clarity{" "}
        //         <span className="text-[#78951f]">&</span> precision.
        //       </motion.h1>
        //     </div>

        //     {/* Content */}
        //     <div>
        //       <h3 className="mb-5 text-[13px] font-bold uppercase tracking-[.04em] text-[#292824]">
        //         What I build
        //       </h3>

        //       <p className="max-w-[680px] text-[24px] leading-[1.35] tracking-[-.035em] text-[#24231f] md:text-[28px]">
        //         I enjoy building web applications that are fast, clean, and genuinely
        //         useful. I focus on creating intuitive UI/UX, responsive frontend
        //         experiences, and reliable full-stack solutions that turn ideas into
        //         real products.
        //       </p>

        //       <p className="mt-5 max-w-[680px] leading-[1.8] text-[#666158]">
        //         My toolkit includes React, JavaScript, Python, Django, REST APIs,
        //         databases, and Git. I focus on writing maintainable code, building
        //         accessible interfaces, and making practical technical decisions that
        //         create reliable user experiences.
        //       </p>

        //       {/* Social Links */}
        //       <div className="mt-7 flex flex-wrap gap-5">
        //         <a
        //           className="flex items-center gap-2 border-b border-[#d9d5cc] pb-1.5 font-mono text-[11px] text-[#4f4b43] transition-colors hover:text-[#78951f]"
        //           href=""
        //           target="_blank"
        //           rel="noreferrer"
        //         >
        //           <Github size={17} />
        //           GitHub
        //         </a>

        //         <a
        //           className="flex items-center gap-2 border-b border-[#d9d5cc] pb-1.5 font-mono text-[11px] text-[#4f4b43] transition-colors hover:text-[#78951f]"
        //           href=""
        //           target="_blank"
        //           rel="noreferrer"
        //         >
        //           <Linkedin size={17} />
        //           LinkedIn
        //         </a>

        //         <a
        //           className="flex items-center gap-2 border-b border-[#d9d5cc] pb-1.5 font-mono text-[11px] text-[#4f4b43] transition-colors hover:text-[#78951f]"
        //           href=""
        //         >
        //           <Mail size={17} />
        //           Email
        //         </a>
        //       </div>
        //     </div>
        //   </div>
        // </section>


    // <section
    //   id="about"
    //   className="mx-auto w-[calc(100%-32px)] max-w-[1180px] scroll-mt-20 py-[65px] sm:w-[calc(100%-48px)] sm:py-[85px]"
    // >
    //   {/* Heading */}
    //   <div className="flex items-start gap-5">
    //     <span className="font-mono text-xs text-[#65f6d2]">01</span>

    //     <div>
    //       <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#65f6d2]">
    //         About me
    //       </p>

    //       <h2 className="max-w-[800px] text-[clamp(30px,4vw,52px)] font-extrabold leading-[1.05] tracking-[-0.04em] text-[#f1f5f9]">
    //         Clean code. Useful products. Continuous growth.
    //       </h2>
    //     </div>
    //   </div>

    //   {/* Content */}
    //   <div className="grid gap-8 pt-7 lg:grid-cols-[1.15fr_0.85fr] lg:gap-[60px]">
    //     <div className="max-w-[720px] text-[14px] text-[#8b96a6] sm:text-[15px]">
    //       <p className="mb-[18px] text-[18px] leading-[1.5] text-[#f1f5f9] sm:text-[21px]">
    //         Full Stack Developer with hands-on experience building web
    //         applications using Python, Django, Django REST Framework, React.js,
    //         and JavaScript.
    //       </p>

    //       <p className="mb-[18px]">
    //         I enjoy turning practical problems into simple, maintainable
    //         digital products. My approach combines a strong backend foundation
    //         with responsive frontend development and REST API design.
    //       </p>

    //       <p className="mb-[18px]">
    //         I'm looking for an entry-level Full Stack or Backend Developer
    //         opportunity where I can contribute, learn from a strong team, and
    //         keep improving as an engineer.
    //       </p>
    //     </div>

    //     {/* Stats */}
    //     <div className="grid grid-cols-2 gap-px border border-white/[0.09] bg-white/[0.09]">
    //       <div className="flex min-h-[135px] flex-col justify-between bg-[#07090d] p-[22px]">
    //         <strong className="text-[40px] tracking-[-0.05em]">4×</strong>
    //         <span className="text-[10px] uppercase tracking-[0.08em] text-[#8b96a6]">
    //           Class Representative
    //         </span>
    //       </div>

    //       <div className="flex min-h-[135px] flex-col justify-between bg-[#07090d] p-[22px]">
    //         <strong className="text-[40px] tracking-[-0.05em]">2+</strong>
    //         <span className="text-[10px] uppercase tracking-[0.08em] text-[#8b96a6]">
    //           Featured projects
    //         </span>
    //       </div>

    //       <div className="flex min-h-[135px] flex-col justify-between bg-[#07090d] p-[22px]">
    //         <strong className="text-[40px] tracking-[-0.05em]">2026</strong>
    //         <span className="text-[10px] uppercase tracking-[0.08em] text-[#8b96a6]">
    //           Diploma completion
    //         </span>
    //       </div>

    //       <div className="flex min-h-[135px] flex-col justify-between bg-[#07090d] p-[22px]">
    //         <strong className="text-[40px] tracking-[-0.05em]">∞</strong>
    //         <span className="text-[10px] uppercase tracking-[0.08em] text-[#8b96a6]">
    //           Learning mindset
    //         </span>
    //       </div>
    //     </div>
    //   </div>
    // </section>
  );
}