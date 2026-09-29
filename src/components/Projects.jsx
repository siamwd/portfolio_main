import { useEffect, useMemo, useRef, useState } from 'react';
import { FolderOpen, Github, Globe, Lock } from 'lucide-react';

const MAX_VISIBLE_TECH = 5;

const projects = [
  {
    id: 'manor-ecommerce',
    title: 'Manor E-commerce',
    category: 'fullstack',
    featured: true,
    year: null,
    summary:
      'A full-stack e-commerce platform with product management, cart, checkout, authentication and order management.',
    highlights: [
      'Product, category and subcategory management',
      'Cart and checkout flow',
      'JWT-based authentication',
      'Order management',
    ],
    tech: ['React', 'Django', 'Django REST Framework', 'MySQL', 'JWT'],
    image: '/images/projects/manor-ecommerce.svg',
    imageAlt:
      'Manor E-commerce project preview — a full stack storefront built with React and Django REST Framework',
    repoUrl: null,
    demoUrl: null,
  },
  {
    id: 'school-management-system',
    title: 'School Management System',
    category: 'fullstack',
    featured: true,
    year: null,
    summary:
      'A school management platform for handling students, teachers, courses and related academic information.',
    highlights: [
      'Student and teacher records',
      'Course management',
      'Academic information tracking',
      'REST API backed React interface',
    ],
    tech: ['React', 'Django', 'Django REST Framework', 'MySQL'],
    image: '/images/projects/school-management-system.svg',
    imageAlt:
      'School Management System project preview — an academic administration platform built with React and Django',
    repoUrl: null,
    demoUrl: null,
  },
  {
    id: 'pos-system',
    title: 'POS System',
    category: 'backend',
    featured: true,
    year: null,
    summary:
      'A point-of-sale management system covering product, customer, quotation, sales and purchase workflows.',
    highlights: [
      'Product and customer records',
      'Quotation generation',
      'Sales workflow',
      'Purchase workflow',
    ],
    tech: ['Django', 'Python', 'MySQL'],
    image: '/images/projects/pos-system.svg',
    imageAlt:
      'POS System project preview — a point of sale management application built with Django and MySQL',
    repoUrl: null,
    demoUrl: null,
  },
];

const categoryLabels = {
  all: 'All',
  fullstack: 'Full Stack',
  frontend: 'Frontend',
  backend: 'Backend',
};

const categoryOrder = ['all', 'fullstack', 'frontend', 'backend'];

function cn(...parts) {
  return parts.filter(Boolean).join(' ');
}

function useReveal({ threshold = 0.15, rootMargin = '0px 0px -8% 0px', once = true } = {}) {
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
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            entry.target.classList.remove('is-revealed');
          }
        });
      },
      { threshold, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return ref;
}

function Reveal({ as: Tag = 'div', variant = 'up', delay = 0, className, style, children, ...rest }) {
  const ref = useReveal();

  return (
    <Tag
      ref={ref}
      data-reveal={variant}
      className={className}
      style={{ '--reveal-delay': `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

function SectionHeading({ index, eyebrow, title, description, align = 'left', className }) {
  const centered = align === 'center';

  return (
    <div className={cn('max-w-prose', centered && 'mx-auto text-center', className)}>
      <Reveal variant="fade">
        <p className={cn('eyebrow', centered && 'justify-center')}>
          {index ? (
            <>
              <span className="text-accent">{index}</span>
              <span aria-hidden="true" className="text-faint/60">
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

function ExternalLink({ href, children, className, label, ...rest }) {
  return (
    <a
      href={href}
      className={className}
      aria-label={label}
      {...rest}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}

function ProjectLink({ href, icon: Icon, children, variant = 'ghost', unavailableHint }) {
  if (!href) {
    return (
      <button
        type="button"
        aria-disabled="true"
        onClick={(event) => event.preventDefault()}
        title={unavailableHint}
        className="btn btn-ghost btn-sm cursor-not-allowed border-dashed border-line/[0.12]
                   text-faint/60 opacity-70"
      >
        <Lock className="h-3.5 w-3.5" aria-hidden="true" />
        <span>{children}</span>
        {unavailableHint ? <span className="sr-only">{` — ${unavailableHint}`}</span> : null}
      </button>
    );
  }

  return (
    <ExternalLink
      href={href}
      className={cn('btn btn-sm', variant === 'primary' ? 'btn-primary' : 'btn-ghost')}
      label={`${children} (opens in a new tab)`}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      <span>{children}</span>
    </ExternalLink>
  );
}

function TechBadges({ tech = [] }) {
  if (!tech.length) return null;

  const visible = tech.slice(0, MAX_VISIBLE_TECH);
  const overflow = tech.length - visible.length;

  return (
    <ul className="flex flex-wrap gap-1.5">
      {visible.map((item) => (
        <li key={item} className="badge">
          {item}
        </li>
      ))}
      {overflow > 0 ? (
        <li className="badge text-faint/70" title={tech.slice(MAX_VISIBLE_TECH).join(', ')}>
          +{overflow}
        </li>
      ) : null}
    </ul>
  );
}

const manorProducts = [
  {
    name: 'Essential cotton tee',
    price: '$29',
    image: 'photo-1521572163474-6864f9cf17ab',
  },
  {
    name: 'Leather strap watch',
    price: '$89',
    image: 'photo-1523275335684-37898b6baf30',
  },
  {
    name: 'Printed summer dress',
    price: '$74',
    image: 'photo-1539109136881-3be0616acf4b',
  },
  {
    name: 'Relaxed linen shirt',
    price: '$52',
    image: 'photo-1598033129183-c4f50c736f10',
  },
  {
    name: 'Everyday leather bag',
    price: '$96',
    image: 'photo-1548036328-c9fa89d128fa',
  },
  {
    name: 'Classic blue watch',
    price: '$112',
    image: 'photo-1524805444758-089113d48a6d',
  },
];

function ManorProductPreview({ product, label }) {
  return (
    <div className="min-w-0 overflow-hidden rounded-[4px] border border-[#d7e0e2] bg-white p-[3px]">
      <div className="relative aspect-[1.08] overflow-hidden rounded-[3px] bg-[#dce8eb]">
        <img
          src={`https://images.unsplash.com/${product.image}?auto=format&fit=crop&w=240&q=70`}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover"
        />
        {label ? (
          <span className="absolute left-1 top-1 rounded-sm bg-[#547d69] px-1 py-0.5 text-[5px] font-bold uppercase text-white">
            {label}
          </span>
        ) : null}
      </div>
      <div className="mt-0.5 text-[6px] leading-none text-[#d99a24]" aria-hidden="true">
        ★★★★★
      </div>
      <p className="mt-0.5 truncate text-[6px] font-semibold leading-tight text-[#25313a]">
        {product.name}
      </p>
      <p className="mt-0.5 text-[6px] font-bold leading-none text-[#18232b]">
        {product.price}
      </p>
    </div>
  );
}

function ManorStorePreview() {
  const categories = [
    { name: "Men's", image: 'photo-1515886657613-9f3515b0c78f' },
    { name: "Women's", image: 'photo-1483985988355-763728e1935b' },
    { name: "Kid's", image: 'photo-1503919005314-30d93d07d823' },
  ];

  return (
    <div
      role="img"
      aria-label="Manor fashion storefront preview with seasonal campaigns, category links, product collections and offers"
      className="relative aspect-[16/10] w-full overflow-hidden bg-[#e6eff1] p-[1.5%] font-sans text-[#17232b]"
    >
      <header className="flex h-[7%] min-h-[22px] items-center gap-[3%] rounded-[4px] bg-white px-[2%] text-[7px] font-semibold">
        <span className="mr-auto text-[11px] font-black tracking-[0.08em] text-[#16232a]">
          <span className="mr-1 text-[#c47c2b]">M</span>MANOR
        </span>
        <span className="text-[#647179]">☰ ALL</span>
        <span>Men&apos;s</span>
        <span>Women&apos;s</span>
        <span>Kid&apos;s</span>
        <span className="rounded-full bg-[#f2f4f4] px-2 py-1 font-normal text-[#78848a]">
          Search products
        </span>
        <span className="text-[9px]">♡　▢　⇄</span>
      </header>

      <div className="absolute inset-x-[1.5%] bottom-[1.5%] top-[10%] grid grid-cols-[1.08fr_0.48fr_1fr] gap-[1.2%]">
        <div className="flex min-h-0 flex-col gap-[2%]">
          <div className="relative h-[38%] shrink-0 overflow-hidden rounded-[5px] bg-[#b8c5d4]">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=700&q=75"
              alt=""
              loading="lazy"
              className="absolute inset-y-0 right-0 h-full w-[58%] object-cover object-center"
            />
            <div className="absolute inset-y-[15%] left-[5%] flex w-[68%] flex-col justify-center bg-[#344455]/65 p-[4%] text-white">
              <p className="text-[6px] font-semibold uppercase tracking-[0.12em]">The great fashion</p>
              <p className="text-[12px] font-black uppercase leading-none">Collection</p>
              <p className="mt-1 max-w-[90%] text-[5px] leading-tight text-white/85">
                New season essentials, selected for you.
              </p>
              <span className="mt-1.5 w-fit rounded-full bg-white px-2 py-0.5 text-[5px] font-bold text-[#1c2830]">
                SHOP NOW
              </span>
            </div>
          </div>

          <div className="grid h-[22%] shrink-0 grid-cols-3 gap-[2%]">
            {categories.map((category) => (
              <div key={category.name} className="relative overflow-hidden rounded-[4px] bg-[#bccbd0]">
                <img
                  src={`https://images.unsplash.com/${category.image}?auto=format&fit=crop&w=260&q=70`}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <span className="absolute inset-x-0 bottom-0 bg-white/90 px-1 py-1 text-[6px] font-bold uppercase">
                  {category.name} →
                </span>
              </div>
            ))}
          </div>

          <div className="flex min-h-0 flex-1 flex-col">
            <div className="mb-1 flex items-center justify-between text-[8px] font-bold uppercase">
              <span>Just landed · New arrivals</span>
              <span className="rounded-full bg-[#557d68] px-1.5 py-1 text-[5px] text-white">See all</span>
            </div>
            <div className="grid min-h-0 flex-1 grid-cols-4 gap-[1.5%]">
              {manorProducts.slice(0, 4).map((product) => (
                <ManorProductPreview key={product.name} product={product} label="New" />
              ))}
            </div>
          </div>
        </div>

        <div className="flex min-h-0 flex-col gap-[2%]">
          <div className="flex min-h-0 flex-[1.05] flex-col">
            <div className="mb-1 text-[8px] font-bold uppercase leading-tight">
              <span className="block">Just landed</span>
              <span className="text-[6px] font-medium normal-case">New arrivals</span>
            </div>
            <div className="grid min-h-0 flex-1 grid-cols-2 gap-[3%]">
              {manorProducts.slice(0, 4).map((product) => (
                <ManorProductPreview key={product.name} product={product} label="New" />
              ))}
            </div>
          </div>

          <div className="flex min-h-0 flex-1 flex-col">
            <div className="mb-1 text-[8px] font-bold uppercase">Video showcase</div>
            <div className="relative min-h-0 flex-1 overflow-hidden rounded-[5px] bg-[#29343a]">
              <img
                src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=500&q=75"
                alt=""
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <span className="absolute left-2 top-2 text-[6px] font-semibold uppercase text-white">
                Featured: dress to impress
              </span>
              <span className="absolute left-1/2 top-1/2 grid h-6 w-6 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-[10px] text-[#18242a]">
                ▶
              </span>
            </div>
          </div>
        </div>

        <div className="flex min-h-0 flex-col gap-[2%]">
          <div className="flex min-h-0 flex-[1.4] flex-col">
            <div className="mb-1 flex items-center justify-between text-[8px] font-bold uppercase">
              <span>Created for you</span>
              <span className="rounded-full bg-[#557d68] px-1.5 py-1 text-[5px] text-white">View all</span>
            </div>
            <div className="grid min-h-0 flex-1 grid-cols-3 grid-rows-2 gap-[2%]">
              {manorProducts.map((product, index) => (
                <ManorProductPreview
                  key={product.name}
                  product={product}
                  label={index < 3 ? 'Featured' : 'New'}
                />
              ))}
            </div>
          </div>

          <div className="grid h-[15%] shrink-0 grid-cols-2 gap-[2%]">
            <div className="relative overflow-hidden rounded-[4px] bg-[#c5d8dc] p-[4%]">
              <p className="text-[8px] font-bold uppercase">Summer sale</p>
              <p className="text-[6px]">Unleash your boldness</p>
              <span className="mt-1 inline-block rounded-full bg-[#557d68] px-1.5 py-0.5 text-[5px] text-white">
                Shop now
              </span>
            </div>
            <div className="relative overflow-hidden rounded-[4px] bg-[#d3e0e2] p-[4%]">
              <p className="text-[8px] font-bold uppercase">Members only</p>
              <p className="text-[6px]">Extra 15% off</p>
              <span className="mt-1 inline-block rounded-full bg-[#557d68] px-1.5 py-0.5 text-[5px] text-white">
                Join free
              </span>
            </div>
          </div>

          <div className="grid h-[13%] shrink-0 grid-cols-4 gap-[1.5%]">
            {['Free delivery', 'Easy policies', 'Secure payment', 'New styles'].map((item, index) => (
              <div key={item} className="flex flex-col items-center justify-center rounded-[4px] bg-[#d2e1e4] text-center">
                <span className="text-[10px]" aria-hidden="true">{['♧', '↻', '♙', '◇'][index]}</span>
                <span className="text-[5px] font-bold uppercase">{item}</span>
              </div>
            ))}
          </div>

          <div className="flex min-h-[10px] flex-1 items-center justify-center border-t border-[#aabcc0] text-[6px] font-bold uppercase tracking-[0.12em]">
            Follow us　◎　f　◉　in
          </div>
        </div>
      </div>
    </div>
  );
}

function SchoolManagementPreview() {
  const metrics = [
    { label: 'Students', value: '1,284', change: '+8.2%' },
    { label: 'Teachers', value: '64', change: '+2 this term' },
    { label: 'Attendance', value: '94.6%', change: 'Today' },
    { label: 'Open fees', value: '$12,480', change: '32 invoices' },
  ];
  const students = [
    ['Olivia Martin', 'Grade 10 · A', 'Present', 'bg-[#d8efe6] text-[#28775c]'],
    ['Ethan Johnson', 'Grade 9 · B', 'Present', 'bg-[#d8efe6] text-[#28775c]'],
    ['Sophia Williams', 'Grade 11 · A', 'Late', 'bg-[#fff0d8] text-[#9a6721]'],
  ];

  return (
    <div
      role="img"
      aria-label="School management dashboard preview showing student metrics, attendance, schedule and student records"
      className="flex aspect-[16/10] w-full overflow-hidden bg-[#f2f6f4] font-sans text-[#243535]"
    >
      <aside className="flex w-[17%] shrink-0 flex-col bg-[#183d3a] px-[2%] py-[3%] text-white">
        <div className="mb-[18%] flex items-center gap-1.5 text-[8px] font-extrabold tracking-wide">
          <span className="grid h-5 w-5 place-items-center rounded-[5px] bg-[#8bd1ad] text-[10px] text-[#173d38]">A</span>
          ACADEMY
        </div>
        <div className="flex flex-col gap-1 text-[6px] font-medium text-white/65">
          {['Overview', 'Students', 'Teachers', 'Classes', 'Attendance', 'Fees', 'Reports'].map((item, index) => (
            <div
              key={item}
              className={`rounded-[4px] px-1.5 py-1.5 ${index === 0 ? 'bg-white/15 text-white' : ''}`}
            >
              <span className="mr-1.5 text-[#9fdbb9]">{['▦', '♙', '♧', '▤', '◷', '$', '▥'][index]}</span>
              {item}
            </div>
          ))}
        </div>
        <div className="mt-auto rounded-[4px] bg-white/10 p-1.5 text-[5px] leading-relaxed text-white/75">
          2025 / 2026<br />Academic year
        </div>
      </aside>

      <main className="flex min-w-0 flex-1 flex-col gap-[2%] p-[2.2%]">
        <header className="flex shrink-0 items-center justify-between">
          <div>
            <p className="text-[5px] font-semibold uppercase tracking-[0.14em] text-[#7d918b]">Tuesday, September 16, 2025</p>
            <h2 className="mt-0.5 text-[11px] font-bold leading-none">Good morning, Admin</h2>
          </div>
          <div className="flex items-center gap-1.5 text-[6px] text-[#60736d]">
            <span className="rounded-full border border-[#dbe5e0] bg-white px-2 py-1">This term⌄</span>
            <span className="grid h-5 w-5 place-items-center rounded-full bg-[#d4e8df] font-bold text-[#326c56]">A</span>
          </div>
        </header>

        <div className="grid shrink-0 grid-cols-4 gap-[1.5%]">
          {metrics.map((metric, index) => (
            <div key={metric.label} className="rounded-[5px] border border-[#e2eae6] bg-white p-[7%]">
              <div className="flex items-center justify-between text-[5px] font-medium text-[#74847e]">
                {metric.label}
                <span className="text-[#57947a]">{['♙', '♧', '◷', '$'][index]}</span>
              </div>
              <p className="mt-1 text-[11px] font-bold leading-none text-[#263936]">{metric.value}</p>
              <p className="mt-1 text-[5px] text-[#57947a]">{metric.change}</p>
            </div>
          ))}
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-[1.65fr_1fr] gap-[1.5%]">
          <section className="flex min-h-0 flex-col rounded-[5px] border border-[#e2eae6] bg-white p-[2.5%]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[7px] font-bold">Attendance overview</h3>
                <p className="text-[5px] text-[#83928d]">Weekly students present</p>
              </div>
              <span className="text-[5px] text-[#70817a]">This week⌄</span>
            </div>
            <div className="mt-auto flex h-[58%] items-end justify-around gap-[3%] border-b border-l border-[#e7eeea] px-[4%]">
              {[56, 76, 66, 92, 72, 85, 62].map((height, index) => (
                <div key={index} className="flex h-full flex-1 items-end">
                  <div
                    className={`w-full rounded-t-[3px] ${index === 3 ? 'bg-[#56a982]' : 'bg-[#b8dfc9]'}`}
                    style={{ height: `${height}%` }}
                  />
                </div>
              ))}
            </div>
            <div className="mt-1 flex justify-around text-[5px] text-[#81908a]">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => <span key={day}>{day}</span>)}
            </div>
          </section>

          <section className="min-h-0 rounded-[5px] border border-[#e2eae6] bg-white p-[4%]">
            <div className="flex items-center justify-between">
              <h3 className="text-[7px] font-bold">Today&apos;s schedule</h3>
              <span className="text-[5px] text-[#57947a]">View all</span>
            </div>
            <div className="mt-[7%] flex flex-col gap-[7%]">
              {[
                ['08:30', 'Mathematics', 'Room 204'],
                ['09:45', 'English literature', 'Room 108'],
                ['11:00', 'Physics lab', 'Science block'],
                ['13:15', 'World history', 'Room 302'],
              ].map(([time, lesson, room]) => (
                <div key={time} className="flex gap-1.5 border-l-2 border-[#71b993] pl-1.5">
                  <span className="w-[20%] text-[5px] text-[#82918b]">{time}</span>
                  <span className="text-[5px] font-semibold leading-tight">{lesson}<span className="block font-normal text-[#82918b]">{room}</span></span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="shrink-0 rounded-[5px] border border-[#e2eae6] bg-white p-[2%]">
          <div className="mb-1 flex items-center justify-between">
            <h3 className="text-[7px] font-bold">Recent student records</h3>
            <span className="text-[5px] text-[#57947a]">All students →</span>
          </div>
          <div className="grid grid-cols-[1.4fr_1fr_.7fr] border-b border-[#edf1ee] pb-1 text-[5px] font-semibold uppercase text-[#8a9992]">
            <span>Student</span><span>Class</span><span>Status</span>
          </div>
          {students.map(([name, group, status, badge]) => (
            <div key={name} className="grid grid-cols-[1.4fr_1fr_.7fr] items-center border-b border-[#f0f3f1] py-1 text-[5px]">
              <span className="font-semibold">{name}</span><span className="text-[#7b8983]">{group}</span>
              <span className={`w-fit rounded-full px-1.5 py-0.5 ${badge}`}>{status}</span>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

function PosManagementPreview() {
  const products = [
    { name: 'Classic T-Shirt', price: '$24.00', image: 'photo-1521572163474-6864f9cf17ab' },
    { name: 'Leather Watch', price: '$89.00', image: 'photo-1523275335684-37898b6baf30' },
    { name: 'Everyday Tote', price: '$42.00', image: 'photo-1548036328-c9fa89d128fa' },
    { name: 'Linen Shirt', price: '$56.00', image: 'photo-1598033129183-c4f50c736f10' },
    { name: 'Blue Timepiece', price: '$112.00', image: 'photo-1524805444758-089113d48a6d' },
    { name: 'Summer Dress', price: '$74.00', image: 'photo-1539109136881-3be0616acf4b' },
  ];

  return (
    <div
      role="img"
      aria-label="Point of sale dashboard preview with searchable products, current sale, cart and checkout totals"
      className="flex aspect-[16/10] w-full overflow-hidden bg-[#f2f5f3] font-sans text-[#1e302b]"
    >
      <aside className="flex w-[15%] shrink-0 flex-col bg-[#18332d] px-[2%] py-[3%] text-white">
        <div className="mb-[22%] text-[9px] font-black tracking-wide"><span className="text-[#80d7a8]">●</span> COUNTER</div>
        <div className="flex flex-col gap-1 text-[6px] text-white/65">
          {['Register', 'Products', 'Customers', 'Orders', 'Reports', 'Settings'].map((item, index) => (
            <div key={item} className={`rounded-[4px] px-1.5 py-1.5 ${index === 0 ? 'bg-white/15 text-white' : ''}`}>
              <span className="mr-1.5 text-[#88d8aa]">{['▦', '□', '♙', '▤', '▥', '⚙'][index]}</span>{item}
            </div>
          ))}
        </div>
        <div className="mt-auto border-t border-white/15 pt-2 text-[5px] text-white/60">Terminal 01<br />Cashier · Alex Morgan</div>
      </aside>

      <main className="flex min-w-0 flex-1 gap-[1.5%] p-[2%]">
        <section className="flex min-w-0 flex-[1.7] flex-col">
          <header className="flex shrink-0 items-center justify-between">
            <div><p className="text-[5px] font-medium uppercase tracking-[0.12em] text-[#81908a]">Tuesday, September 16</p><h2 className="text-[11px] font-bold">New sale</h2></div>
            <span className="rounded-full bg-[#dcece3] px-2 py-1 text-[5px] font-semibold text-[#367151]">Register open</span>
          </header>
          <div className="mt-[3%] flex shrink-0 items-center gap-1.5">
            <div className="flex-1 rounded-[4px] border border-[#dce5df] bg-white px-2 py-1.5 text-[6px] text-[#8b9791]">⌕　Search products or scan barcode</div>
            <span className="rounded-[4px] bg-[#e2ebe5] px-2 py-1.5 text-[5px] font-semibold">All items⌄</span>
          </div>
          <div className="mt-[3%] grid min-h-0 flex-1 grid-cols-3 grid-rows-2 gap-[2%]">
            {products.map((product) => (
              <div key={product.name} className="flex min-h-0 flex-col overflow-hidden rounded-[5px] border border-[#e0e8e3] bg-white p-[3px]">
                <img
                  src={`https://images.unsplash.com/${product.image}?auto=format&fit=crop&w=240&q=70`}
                  alt=""
                  loading="lazy"
                  className="min-h-0 flex-1 rounded-[3px] bg-[#e9efec] object-cover"
                />
                <div className="flex items-center justify-between gap-1 px-0.5 pt-1 text-[5px]">
                  <span className="truncate font-semibold">{product.name}</span><span className="shrink-0 font-bold text-[#387657]">{product.price}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside className="flex w-[31%] shrink-0 flex-col rounded-[6px] border border-[#e0e8e3] bg-white p-[2.5%]">
          <div className="flex items-center justify-between border-b border-[#edf1ee] pb-2">
            <div><h3 className="text-[8px] font-bold">Current sale</h3><p className="text-[5px] text-[#87938d]">Order #1048 · 3 items</p></div>
            <span className="grid h-5 w-5 place-items-center rounded-full bg-[#edf4ef] text-[9px] text-[#527b63]">＋</span>
          </div>
          <div className="mt-[5%] flex flex-1 flex-col gap-[5%]">
            {[
              ['Classic T-Shirt', '1 × $24.00', '$24.00'],
              ['Leather Watch', '1 × $89.00', '$89.00'],
              ['Linen Shirt', '1 × $56.00', '$56.00'],
            ].map(([name, quantity, price]) => (
              <div key={name} className="flex items-center justify-between gap-1 border-b border-[#f0f3f1] pb-1.5 text-[5px]">
                <span className="font-semibold">{name}<span className="block font-normal text-[#87938d]">{quantity}</span></span>
                <span className="font-bold">{price}</span>
              </div>
            ))}
          </div>
          <div className="mt-[4%] space-y-1 border-t border-dashed border-[#dce5df] pt-[5%] text-[6px]">
            <div className="flex justify-between text-[#77847e]"><span>Subtotal</span><span>$169.00</span></div>
            <div className="flex justify-between text-[#77847e]"><span>Tax (8%)</span><span>$13.52</span></div>
            <div className="flex justify-between pt-1 text-[9px] font-bold"><span>Total</span><span>$182.52</span></div>
          </div>
          <div className="mt-[5%] rounded-[4px] bg-[#347454] py-2 text-center text-[7px] font-bold text-white">Charge $182.52　→</div>
          <div className="mt-1.5 flex justify-center gap-2 text-[5px] text-[#788780]">Cash　 Card　 Other</div>
        </aside>
      </main>
    </div>
  );
}

function ProjectMedia({ project, className }) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-card border border-line/10 bg-elevated',
        className,
      )}
    >
      {project.id === 'manor-ecommerce' ? (
        <ManorStorePreview />
      ) : project.id === 'school-management-system' ? (
        <SchoolManagementPreview />
      ) : project.id === 'pos-system' ? (
        <PosManagementPreview />
      ) : (
        <img
          src={project.image}
          alt={project.imageAlt}
          width={1200}
          height={750}
          loading="lazy"
          decoding="async"
          className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-smooth
                     group-hover:scale-[1.03]"
        />
      )}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-canvas/60 via-transparent to-transparent"
      />
    </div>
  );
}

function ProjectFeature({ project, flipped }) {
  return (
    <article className="group grid items-center gap-7 lg:grid-cols-2 lg:gap-12">
      <ProjectMedia project={project} className={cn('min-w-0', flipped && 'lg:order-2')} />

      <div className={cn('min-w-0', flipped && 'lg:order-1')}>
        <div className="flex items-center gap-3">
          <span className="eyebrow text-accent">{project.categoryLabel}</span>
          {project.year ? (
            <span className="font-mono text-[0.6875rem] text-faint">{project.year}</span>
          ) : null}
        </div>

        <h3 className="mt-3 text-display-md">{project.title}</h3>
        <p className="mt-4 max-w-prose text-[0.9375rem] leading-relaxed text-muted">
          {project.summary}
        </p>

        {project.highlights?.length ? (
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {project.highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-2 text-[0.8125rem] text-faint">
                <span
                  aria-hidden="true"
                  className="mt-[0.4rem] h-1 w-1 shrink-0 rounded-full bg-accent/70"
                />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-6">
          <TechBadges tech={project.tech} />
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2.5">
          <ProjectLink
            href={project.repoUrl}
            icon={Github}
            unavailableHint="Repository link not added yet — set repoUrl in src/data/projects.js"
          >
            GitHub
          </ProjectLink>
          <ProjectLink
            href={project.demoUrl}
            icon={Globe}
            variant="primary"
            unavailableHint="Live demo not deployed yet — set demoUrl in src/data/projects.js"
          >
            Live Demo
          </ProjectLink>
        </div>
      </div>
    </article>
  );
}

function ProjectCard({ project }) {
  return (
    <article className="card card-lift group flex h-full flex-col overflow-hidden">
      <ProjectMedia project={project} className="rounded-b-none border-0 border-b border-line/10" />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <span className="eyebrow text-accent">{project.categoryLabel}</span>
          {project.year ? (
            <span className="font-mono text-[0.6875rem] text-faint">{project.year}</span>
          ) : null}
        </div>

        <h3 className="mt-2.5 text-base font-semibold text-ink">{project.title}</h3>
        <p className="mt-2 flex-1 text-[0.875rem] leading-relaxed text-muted">{project.summary}</p>

        <div className="mt-5">
          <TechBadges tech={project.tech} />
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <ProjectLink
            href={project.repoUrl}
            icon={Github}
            unavailableHint="Repository link not added yet — set repoUrl in src/data/projects.js"
          >
            Code
          </ProjectLink>
          <ProjectLink
            href={project.demoUrl}
            icon={Globe}
            unavailableHint="Live demo not deployed yet — set demoUrl in src/data/projects.js"
          >
            Demo
          </ProjectLink>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('all');

  /**
   * Filters are derived from the data, not hard-coded. A category with zero
   * projects never renders a pill — so the filter bar can't offer a choice that
   * leads to an empty screen, and adding a project to a new category makes its
   * pill appear automatically.
   */
  const availableCategories = useMemo(() => {
    const counts = projects.reduce((acc, project) => {
      acc[project.category] = (acc[project.category] || 0) + 1;
      return acc;
    }, {});

    return categoryOrder
      .filter((id) => id === 'all' || counts[id] > 0)
      .map((id) => ({
        id,
        label: categoryLabels[id] ?? id,
        count: id === 'all' ? projects.length : counts[id],
      }));
  }, []);

  const visibleProjects = useMemo(() => {
    const list =
      activeCategory === 'all'
        ? projects
        : projects.filter((project) => project.category === activeCategory);

    // Attach the display label here so card components never need to know
    // about the category lookup table.
    return list.map((project) => ({
      ...project,
      categoryLabel: categoryLabels[project.category] ?? project.category,
    }));
  }, [activeCategory]);

  const featured = visibleProjects.filter((project) => project.featured);
  const compact = visibleProjects.filter((project) => !project.featured);

  return (
    <section id="projects" className="section">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            index="04"
            eyebrow="Selected work"
            title="Projects"
            description="Applications I've built end to end — data model, API, interface."
            className="lg:max-w-xl"
          />

          {/* ---------------- Filter pills ----------------
              role="tablist" would promise tab semantics this doesn't implement
              (no tabpanel, no arrow-key cycling), so these stay plain buttons
              with aria-pressed — which is honest and works with a screen
              reader today. */}
          <Reveal variant="fade" delay={120}>
            <div
              className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:px-0"
              role="group"
              aria-label="Filter projects by type"
            >
              {availableCategories.map((category) => {
                const isActive = activeCategory === category.id;

                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setActiveCategory(category.id)}
                    aria-pressed={isActive}
                    className={cn(
                      'inline-flex shrink-0 items-center gap-2 rounded-pill border px-4 py-2',
                      'text-[0.8125rem] font-medium transition-all duration-300 ease-smooth',
                      isActive
                        ? 'border-accent/40 bg-accent/[0.1] text-ink'
                        : 'border-line/10 bg-line/[0.02] text-muted hover:border-line/25 hover:text-ink',
                    )}
                  >
                    {category.label}
                    <span
                      className={cn(
                        'font-mono text-[0.625rem]',
                        isActive ? 'text-accent' : 'text-faint/70',
                      )}
                    >
                      {String(category.count).padStart(2, '0')}
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        {/* ---------------- Featured rows ---------------- */}
        {featured.length > 0 ? (
          <div className="mt-16 flex flex-col gap-16 sm:gap-20 lg:gap-24">
            {featured.map((project, index) => (
              <Reveal key={project.id}>
                <ProjectFeature project={project} flipped={index % 2 === 1} />
              </Reveal>
            ))}
          </div>
        ) : null}

        {/* ---------------- Compact grid ---------------- */}
        {compact.length > 0 ? (
          <div
            className={cn(
              'grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3',
              featured.length > 0 ? 'mt-16 sm:mt-20' : 'mt-16',
            )}
          >
            {compact.map((project, index) => (
              <Reveal key={project.id} delay={index * 70}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        ) : null}

        {/* ---------------- Empty state ----------------
            Unreachable through the UI because empty categories are filtered out
            above, but kept as a safety net for a mid-edit data file. */}
        {visibleProjects.length === 0 ? (
          <div className="mt-16 card flex flex-col items-center gap-3 px-6 py-16 text-center">
            <FolderOpen className="h-6 w-6 text-faint" aria-hidden="true" />
            <p className="text-sm text-muted">No projects in this category yet.</p>
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className="btn btn-quiet text-accent"
            >
              Show all projects
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
