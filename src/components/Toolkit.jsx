import React from "react";
import { useEffect, useRef } from 'react';
import {
  Atom,
  Braces,
  Circle,
  Code,
  Database,
  FileCode,
  GitBranch,
  Github,
  HardDrive,
  KeyRound,
  Monitor,
  Palette,
  Send,
  Server,
  Share2,
  Terminal,
  Webhook,
  Wind,
  Wrench,
  Zap,
} from 'lucide-react';

const SkillGroups = [
  {
    id: 'backend',
    title: 'Backend',
    icon: 'backend',
    description: 'Application logic, data modelling and APIs.',
    skills: [
      { name: 'Python', icon: 'python', note: 'Core language' },
      { name: 'Django', icon: 'django', note: 'MVT, ORM, admin' },
      { name: 'Django REST Framework', icon: 'drf', note: 'Serializers, viewsets' },
      { name: 'REST API', icon: 'api', note: 'Endpoint design' },
      { name: 'JWT', icon: 'jwt', note: 'Token authentication' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    icon: 'frontend',
    description: 'Interfaces that consume those APIs.',
    skills: [
      { name: 'React', icon: 'react', note: 'Components, hooks' },
      { name: 'JavaScript', icon: 'javascript', note: 'ES6+' },
      { name: 'Tailwind CSS', icon: 'tailwind', note: 'Utility styling' },
      { name: 'HTML5', icon: 'html', note: 'Semantic markup' },
      { name: 'CSS3', icon: 'css', note: 'Flexbox, grid' },
    ],
  },
  {
    id: 'database',
    title: 'Database',
    icon: 'database',
    description: 'Schema design and relational data.',
    skills: [
      { name: 'MySQL', icon: 'mysql', note: 'Production workloads' },
      { name: 'PostgreSQL', icon: 'postgresql', note: 'Relational queries' },
      { name: 'SQLite', icon: 'sqlite', note: 'Local development' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools',
    icon: 'tools',
    description: 'Day-to-day development workflow.',
    skills: [
      { name: 'Git', icon: 'git', note: 'Version control' },
      { name: 'GitHub', icon: 'github', note: 'Collaboration' },
      { name: 'VS Code', icon: 'vscode', note: 'Primary editor' },
      { name: 'Postman', icon: 'postman', note: 'API testing' },
      { name: 'Vite', icon: 'vite', note: 'Build tooling' },
    ],
  },
];

const iconRegistry = {
  python: Code,
  django: Server,
  drf: Webhook,
  api: Share2,
  jwt: KeyRound,
  react: Atom,
  javascript: Braces,
  tailwind: Wind,
  html: FileCode,
  css: Palette,
  mysql: Database,
  postgresql: Database,
  sqlite: HardDrive,
  git: GitBranch,
  github: Github,
  vscode: Terminal,
  postman: Send,
  vite: Zap,
  backend: Server,
  frontend: Monitor,
  database: Database,
  tools: Wrench,
};

function getIcon(key) {
  return iconRegistry[key] || Circle;
}

function Reveal({ as: Tag = 'div', variant = 'up', delay = 0, children }) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    if (typeof IntersectionObserver === 'undefined') {
      element.classList.add('is-revealed');
      return undefined;
    }

    const prefersReduced =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      element.classList.add('is-revealed');
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal={variant}
      style={{ '--reveal-delay': `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

function SectionHeading({ index, eyebrow, title, description }) {
  return (
    <div className="max-w-prose">
      <Reveal variant="fade">
        <p className="eyebrow">
          <span className="text-accent">{index}</span>
          <span aria-hidden="true" className="text-faint/60">—</span>
          {eyebrow}
        </p>
      </Reveal>

      <Reveal delay={70}>
        <h2 className="mt-4 text-display-lg">{title}</h2>
      </Reveal>

      <Reveal delay={140}>
        <p className="mt-4 lead">{description}</p>
      </Reveal>
    </div>
  );
}

export default function Toolkit() {
  return (
    <section id="skills" className="section">
      <div className="shell">
        <SectionHeading
          index="02"
          eyebrow="Toolkit"
          title="Skills & Technologies"
          description="The stack I build with day to day, grouped by where it sits in an application."
        />

        <div className="mt-14 grid gap-4 sm:gap-5 lg:grid-cols-2">
          {SkillGroups.map((group, groupIndex) => {
            const GroupIcon = getIcon(group.icon);
            const skills = group.skills ?? [];

            return (
              <Reveal key={group.id} delay={groupIndex * 90}>
                <div className="card card-lift h-full overflow-hidden p-6 sm:p-7">
                  <div className="flex items-start gap-3.5">
                    <span
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border
                                 border-line/10 bg-line/[0.03] text-accent"
                    >
                      <GroupIcon className="h-[1.125rem] w-[1.125rem]" aria-hidden="true" />
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-3">
                        <h3 className="text-base font-semibold text-ink">{group.title}</h3>
                        <span className="shrink-0 font-mono text-[0.625rem] text-faint/70">
                          {String(skills.length).padStart(2, '0')}
                        </span>
                      </div>
                      <p className="mt-1 text-[0.8125rem] leading-snug text-faint">
                        {group.description}
                      </p>
                    </div>
                  </div>

                  <ul className="mt-6 divide-y divide-line/[0.06]">
                    {skills.map((skill) => {
                      const SkillIcon = getIcon(skill.icon);

                      return (
                        <li key={skill.name} className="group/skill">
                          <div
                            className="flex items-center gap-3 rounded-md py-2.5 transition-colors
                                       duration-300 group-hover/skill:bg-line/[0.02]"
                          >
                            <SkillIcon
                              aria-hidden="true"
                              className="h-4 w-4 shrink-0 text-faint transition-colors duration-300
                                         group-hover/skill:text-accent"
                            />
                            <span
                              className="min-w-0 flex-1 truncate text-sm text-muted transition-colors
                                         duration-300 group-hover/skill:text-ink"
                            >
                              {skill.name}
                            </span>
                            {skill.note ? (
                              <span className="hidden shrink-0 font-mono text-[0.625rem] text-faint/70 sm:block">
                                {skill.note}
                              </span>
                            ) : null}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}