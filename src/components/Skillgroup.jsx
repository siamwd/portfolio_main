import React from "react";

/*
 * SkillsWork.jsx
 * Screenshot-matched layout:
 * - Desktop: exactly 3 columns × 2 rows
 * - Full-width section with 60px side padding
 * - 136px card height
 * - 22px horizontal/vertical gap
 * - No external icon package required
 */

const skills = [
  {
    title: "Django & DRF",
    description: "Models, views, serializers, admin",
    icon: "server",
  },
  {
    title: "REST APIs",
    description: "Versioned, documented endpoints",
    icon: "share",
  },
  {
    title: "React Frontends",
    description: "Component-driven interfaces",
    icon: "react",
  },
  {
    title: "Database Design",
    description: "Schema, relations, migrations",
    icon: "database",
  },
  {
    title: "Authentication",
    description: "JWT, sessions, Google sign-in",
    icon: "key",
  },
  {
    title: "Deployment",
    description: "Build, configure, ship",
    icon: "rocket",
  },
];

function SkillIcon({ type }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    width: 32,
    height: 32,
    "aria-hidden": true,
  };

  switch (type) {
    case "server":
      return (
        <svg {...common}>
          <rect x="4" y="3" width="16" height="7" rx="2" />
          <rect x="4" y="14" width="16" height="7" rx="2" />
          <path d="M8 6.5h.01M8 17.5h.01" />
        </svg>
      );

    case "share":
      return (
        <svg {...common}>
          <circle cx="18" cy="5" r="2.5" />
          <circle cx="6" cy="12" r="2.5" />
          <circle cx="18" cy="19" r="2.5" />
          <path d="m8.2 10.8 7.5-4.5M8.2 13.2l7.5 4.5" />
        </svg>
      );

    case "react":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="2.2" />
          <ellipse cx="12" cy="12" rx="9.5" ry="4" />
          <ellipse
            cx="12"
            cy="12"
            rx="9.5"
            ry="4"
            transform="rotate(60 12 12)"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="9.5"
            ry="4"
            transform="rotate(120 12 12)"
          />
        </svg>
      );

    case "database":
      return (
        <svg {...common}>
          <ellipse cx="12" cy="5.5" rx="7.5" ry="3" />
          <path d="M4.5 5.5v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-6" />
          <path d="M4.5 11.5v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-6" />
        </svg>
      );

    case "key":
      return (
        <svg {...common}>
          <circle cx="8.5" cy="15.5" r="3.5" />
          <path d="m11 13 8-8M16 6l2 2M14 8l2 2" />
        </svg>
      );

    case "rocket":
      return (
        <svg {...common}>
          <path d="M14.5 4.5c2.2-1.7 4.3-1.7 5-1 .7.7.7 2.8-1 5-1.2 1.6-3 3.1-5.1 4.3l-2.7-2.7c1.2-2.1 2.7-3.9 3.8-5.6Z" />
          <path d="m10.7 10.1-3.2.4-2.7 2.7 4 .5" />
          <path d="m13.9 13.3-.4 3.2-2.7 2.7-.5-4" />
          <circle cx="16.9" cy="7.1" r="1" />
          <path d="M7.8 16.2c-1.2 1.7-2.9 2-3.8 1.9-.1-.9.2-2.6 1.9-3.8" />
        </svg>
      );

    default:
      return null;
  }
}

export default function SkillsWork() {
  return (
    <section
      id="what-i-work-on"
      className="w-full border-t border-white/[0.07] bg-[#07090d] px-[60px] py-[74px] text-[#f1f5f9]"
    >
      <p className="mb-[51px] font-mono text-xl font-medium uppercase tracking-[0.36em] leading-none text-muted">
        What I Work On
      </p>

      <div className="grid w-full grid-cols-3 gap-3">
        {skills.map((skill) => (
          <article
            key={skill.title}
            className="group flex h-16 min-w-0 items-center rounded-xl border border-white/[0.1] bg-[#0b1015] px-6 transition duration-300 hover:-translate-y-1 hover:border-accent/35 hover:bg-[#0e151b]"
          >
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-accent/20 bg-accent/[0.06] text-accent transition group-hover:bg-accent/[0.12]">
              <SkillIcon type={skill.icon} />
            </div>

            <div className="ml-4 min-w-0 flex-1 overflow-hidden">
              <h3 className="truncate text-sm font-semibold leading-tight tracking-[-0.025em] text-ink">
                {skill.title}
              </h3>

              <p className="mt-2 truncate text-xs leading-tight text-faint">
                {skill.description}
              </p>
            </div>
          </article>
        ))}
      </div>

    </section>
  );
}
