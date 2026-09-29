
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";


// Reusable Footer Component
 
//   Works independently.
//   You only need to change the data inside the component props.
 
//  Usage:
 
  <Footer
    name="Md. Mahfujur Rahman"
    email="mdmahfujur295@gmail.com"
    available={true}
    socialLinks={[
      {
        label: "GitHub",
        handle: "@siamwd",
        href: "https://github.com/siamwd",
        icon: Github,
      },
    ]}
    navLinks={[
      { label: "Home", href: "#home" },
      { label: "About", href: "#about" },
    ]}
  />
 

const defaultSocialLinks = [
  {
    label: "GitHub",
    handle: "@siamwd",
    href: "https://github.com/siamwd",
    icon: Github,
  },
  {
    label: "LinkedIn",
    handle: "mahfujur-django-python",
    href: "https://www.linkedin.com/in/mahfujur-django-python",
    icon: Linkedin,
  },
];

const defaultNavLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Footer({
  name = "MD MAHFUJUR RAHMAN",
  email = "mdmahfujur295@gmail.com",

  available = true,
  availableText = "Open to opportunities",

  socialLinks = defaultSocialLinks,
  navLinks = defaultNavLinks,

  ctaTitle = "Let's build something",
  ctaText = "Open to full-stack development work.",

  ctaLabel = "Get in touch",
  ctaHref = "#contact",

  footerText = "Built with React, Vite & Tailwind CSS",
}) {
  const year = new Date().getFullYear();

  return (
    <footer
      id="footer"
      className="relative isolate overflow-hidden border-t border-white/[0.07]"
    >
      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] [background-size:40px_40px]" />

        <div
          className="absolute bottom-[-16rem] left-1/2 h-[34rem] w-[44rem]
                     -translate-x-1/2 rounded-full
                     bg-cyan-400/10 blur-[120px]"
        />
      </div>

      {/* Main Footer */}
      <div className="mx-auto w-full max-w-[1450px] px-5 pb-10 pt-20 sm:px-8 sm:pt-24 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">

          {/* Email + Navigation */}
          <div className="min-w-0">

            <p className="inline-flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.15em] text-white/40">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_2px_rgba(34,211,238,0.5)]"
              />
              Connect with me
            </p>

            {/* Email */}
            <a
              href={`mailto:${email}`}
              className="group mt-4 inline-flex max-w-full items-baseline gap-3
                         break-all text-2xl font-semibold tracking-tight
                         text-white transition-colors duration-300
                         hover:text-cyan-400
                         sm:text-3xl md:text-4xl"
            >
              <Mail
                className="h-5 w-5 shrink-0 translate-y-[-0.1em]
                           text-white/40 transition-colors duration-300
                           group-hover:text-cyan-400 sm:h-6 sm:w-6"
                aria-hidden="true"
              />

              <span>{email}</span>

              <ArrowUpRight
                aria-hidden="true"
                className="h-5 w-5 shrink-0 translate-y-[-0.1em]
                           text-cyan-400 opacity-0
                           transition-all duration-300
                           group-hover:translate-x-1
                           group-hover:opacity-100"
              />
            </a>

            {/* Navigation */}
            <nav aria-label="Footer" className="mt-9">
              <ul className="flex flex-wrap gap-x-7 gap-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-white/50
                                 transition-colors duration-300
                                 hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* CTA */}
          <div className="min-w-0 lg:text-right">
            <h2 className="text-lg font-semibold text-white">
              {ctaTitle}
            </h2>

            <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/50 lg:ml-auto">
              {available ? availableText : "Currently unavailable"} —{" "}
              {ctaText}
            </p>

            <a
              href={ctaHref}
              className="mt-6 inline-flex items-center gap-2
                         rounded-full bg-white px-5 py-2.5
                         text-sm font-semibold text-black
                         transition-all duration-300
                         hover:-translate-y-0.5
                         hover:bg-cyan-300"
            >
              <span>{ctaLabel}</span>

              <ArrowUpRight
                className="h-4 w-4"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-14">
          <ul className="flex flex-wrap gap-x-8 gap-y-4 border-y border-white/[0.07] py-6">
            {socialLinks.map((social) => {
              const Icon = social.icon;

              return (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${social.label} — ${social.handle}`}
                    className="group inline-flex items-center gap-2.5
                               text-sm font-medium text-white/50
                               transition-colors duration-300
                               hover:text-white"
                  >
                    <Icon
                      className="h-4 w-4 text-white/35
                                 transition-colors duration-300
                                 group-hover:text-cyan-400"
                      aria-hidden="true"
                    />

                    <span>{social.label}</span>

                    <span className="font-mono text-[0.6875rem] text-white/30">
                      {social.handle}
                    </span>

                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-3.5 w-3.5 opacity-40
                                 transition-all duration-300
                                 group-hover:-translate-y-0.5
                                 group-hover:translate-x-0.5
                                 group-hover:opacity-100"
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Large Name */}
      <div className="mt-12 overflow-hidden px-4">
        <p
          aria-hidden="true"
          className="select-none whitespace-nowrap bg-gradient-to-b
                     from-white/20 via-white/[0.05] to-transparent
                     bg-clip-text text-center font-bold
                     leading-[0.85] tracking-[-0.055em]
                     text-transparent"
          style={{
            fontSize: "clamp(1.75rem, 7.2vw, 8.5rem)",
          }}
        >
          {name.toUpperCase()}
        </p>
      </div>

      {/* Bottom */}
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <div
          className="flex flex-col items-center justify-between gap-3
                     border-t border-white/[0.05]
                     py-6 text-xs text-white/30
                     sm:flex-row"
        >
          <p>
            © {year} {name}. All rights reserved.
          </p>

          <p className="font-mono text-[0.6875rem]">
            {footerText}
          </p>
        </div>
      </div>
    </footer>
  );
}
