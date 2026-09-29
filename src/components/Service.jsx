
import { useEffect, useRef } from 'react';
import {
  Atom,
  Circle,
  Layers,
  Server,
  ShieldCheck,
} from 'lucide-react';

const services = [
  {
    id: 'full-stack',
    number: '01',
    icon: 'layers',
    title: 'Full Stack Web Development',
    description:
      'Building complete web applications with modern frontend and scalable backend architecture.',
    points: ['Data model design', 'API + UI in one codebase', 'Deployment setup'],
  },
  {
    id: 'django-backend',
    number: '02',
    icon: 'django',
    title: 'Django Backend Development',
    description:
      'Developing secure and maintainable Django applications and REST APIs.',
    points: [
      'Django ORM & migrations',
      'Admin customisation',
      'Business logic structure',
    ],
  },
  {
    id: 'react-frontend',
    number: '03',
    icon: 'react',
    title: 'React Frontend Development',
    description: 'Creating responsive and interactive React interfaces.',
    points: [
      'Component architecture',
      'State management',
      'Responsive layouts',
    ],
  },
  {
    id: 'api-auth',
    number: '04',
    icon: 'shield',
    title: 'API & Authentication',
    description:
      'Building REST APIs, JWT authentication and application integrations.',
    points: [
      'DRF serializers & viewsets',
      'JWT / Google sign-in',
      'Third-party integrations',
    ],
  },
];

const icons = {
  layers: Layers,
  django: Server,
  react: Atom,
  shield: ShieldCheck,
};

function getIcon(key) {
  return icons[key] || Circle;
}

function useReveal({
  threshold = 0.15,
  rootMargin = '0px 0px -8% 0px',
  once = true,
} = {}) {
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
      window
        .matchMedia('(prefers-reduced-motion: reduce)')
        .matches;

    if (prefersReduced) {
      element.classList.add('is-revealed');
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');

            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            entry.target.classList.remove('is-revealed');
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return ref;
}

function Reveal({
  as: Tag = 'div',
  variant = 'up',
  delay = 0,
  className,
  style,
  children,
  ...rest
}) {
  const ref = useReveal();

  return (
    <Tag
      ref={ref}
      data-reveal={variant}
      className={className}
      style={{
        '--reveal-delay': `${delay}ms`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = 'left',
}) {
  const centered = align === 'center';

  return (
    <div
      className={`max-w-prose${
        centered ? ' mx-auto text-center' : ''
      }`}
    >
      <Reveal variant="fade">
        <p
          className={`eyebrow${
            centered ? ' justify-center' : ''
          }`}
        >
          {index ? (
            <>
              <span className="text-accent">{index}</span>

              <span
                aria-hidden="true"
                className="text-faint/60"
              >
                —
              </span>
            </>
          ) : null}

          {eyebrow}
        </p>
      </Reveal>

      <Reveal delay={70}>
        <h2 className="mt-4 text-display-lg">{title}</h2>
      </Reveal>

      {description ? (
        <Reveal delay={140}>
          <p className="mt-4 lead">{description}</p>
        </Reveal>
      ) : null}
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="section">
      <div className="shell">
        <SectionHeading
          index="03"
          eyebrow="What I do"
          title="Services"
          description="Where I can help — from a single API to a complete application."
        />

        <div className="mt-14 grid gap-4 sm:gap-5 md:grid-cols-2">
          {services.map((service, index) => {
            const Icon = getIcon(service.icon);

            return (
              <Reveal
                key={service.id}
                delay={index * 80}
              >
                <article className="card card-lift group relative h-full overflow-hidden p-6 sm:p-8">
                  {/* Oversized index */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-2 right-4 select-none font-display text-[4.5rem] font-semibold leading-none text-line/[0.04] transition-colors duration-500 group-hover:text-line/[0.06]"
                  >
                    {service.number}
                  </span>

                  <div className="relative">
                    <span className="grid h-11 w-11 place-items-center rounded-xl border border-line/10 bg-line/[0.03] text-accent transition-colors duration-300 group-hover:border-accent/30 group-hover:bg-accent/[0.07]">
                      <Icon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </span>

                    <h3 className="mt-5 text-lg font-semibold text-ink">
                      {service.title}
                    </h3>

                    <p className="mt-2.5 max-w-md text-[0.9375rem] leading-relaxed text-muted">
                      {service.description}
                    </p>

                    {/* Concrete deliverables */}
                    <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2 border-t border-line/[0.07] pt-5">
                      {service.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-center gap-1.5 font-mono text-[0.6875rem] text-faint"
                        >
                          <span
                            aria-hidden="true"
                            className="h-1 w-1 rounded-full bg-accent/60"
                          />

                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}






