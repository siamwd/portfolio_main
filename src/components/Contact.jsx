
import { useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Github,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Send,
} from "lucide-react";

const PROFILE = {
  email: "mdmahfujur295@gmail.com",
  location: "Bangladesh",
  available: true,
  availableText: "Open to opportunities",
  unavailableText: "Currently unavailable",
};

const CHANNELS = [
  { id: "email", type: "email", label: "Email", icon: Mail, value: PROFILE.email },
  { id: "github", type: "link", label: "GitHub", icon: Github, value: "github.com/siamwd", href: "https://github.com/siamwd" },
  { id: "linkedin", type: "link", label: "LinkedIn", icon: Linkedin, value: "linkedin.com/in/mahfujur-django-python", href: "https://www.linkedin.com/in/mahfujur-django-python" },
  { id: "location", type: "text", label: "Location", icon: MapPin, value: PROFILE.location },
];

const LIMITS = {
  name: { min: 2, max: 80 },
  email: { min: 5, max: 254 },
  subject: { min: 3, max: 120 },
  message: { min: 10, max: 3000 },
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
const EMPTY = { name: "", email: "", subject: "", message: "" };
const cn = (...x) => x.filter(Boolean).join(" ");

function normalise(value, { allowNewlines = false } = {}) {
  if (typeof value !== "string") return "";
  let output = value.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  output = [...output]
    .filter((char) => {
      const code = char.codePointAt(0);
      return (
        code > 31 &&
        !(code >= 127 && code <= 159) ||
        (allowNewlines && (code === 9 || code === 10))
      );
    })
    .join("");

  output = output.replace(/[ \t]{2,}/g, " ");

  if (allowNewlines) output = output.replace(/\n{4,}/g, "\n\n\n");

  return output.trim();
}

function validateField(field, raw) {
  const value = normalise(raw, { allowNewlines: field === "message" });

  if (field === "name") {
    if (!value) return "Please enter your name.";
    if (value.length < 2) return "That name looks too short.";
    if (value.length > 80) return "Please keep your name under 80 characters.";
  }

  if (field === "email") {
    if (!value || !EMAIL_PATTERN.test(value))
      return "Please enter a valid email address.";
    if (value.length > 254) return "That email address is too long.";
  }

  if (field === "subject") {
    if (!value) return "Please enter a subject.";
    if (value.length < 3) return "That subject looks too short.";
    if (value.length > 120) return "Please keep the subject under 120 characters.";
  }

  if (field === "message") {
    if (!value) return "Please enter a message.";
    if (value.length < 10) return "Please write at least 10 characters.";
    if (value.length > 3000) return "Please keep your message under 3000 characters.";
  }

  return null;
}

function Field({ id, label, error, type = "text", required, ...props }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-[10px] font-medium uppercase tracking-wider text-gray-400"
      >
        {label} {required && <span className="text-cyan-400">*</span>}
      </label>

      <input
        id={id}
        name={id.replace("contact-", "")}
        type={type}
        required={required}
        aria-invalid={!!error}
        className={cn(
          "w-full rounded-lg border bg-black/50 px-3 py-2.5 text-xs text-white outline-none transition-all duration-300 placeholder:text-gray-700",
          "border-white/10 focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/10",
          error && "border-red-500/40"
        )}
        {...props}
      />

      {error && (
        <p className="mt-1.5 flex gap-1.5 text-[10px] text-red-400">
          <AlertCircle className="h-3 w-3 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const abortRef = useRef(null);
  const lastSubmission = useRef({ signature: "", at: 0 });

  const isSubmitting = status === "submitting";

  useEffect(() => {
    if (status !== "success") return;

    const timer = setTimeout(() => {
      setStatus("idle");
      setFeedback("");
    }, 9000);

    return () => clearTimeout(timer);
  }, [status]);

  useEffect(() => () => abortRef.current?.abort(), []);

  const change = (field) => (e) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));

    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const blur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));

    const error = validateField(field, values[field]);

    setErrors((prev) => ({
      ...prev,
      ...(error ? { [field]: error } : {}),
    }));
  };

  async function submit(e) {
    e.preventDefault();
    if (isSubmitting) return;

    if (honeypot.trim()) {
      setStatus("success");
      setFeedback("Message sent successfully.");
      setValues(EMPTY);
      return;
    }

    const nextErrors = {};

    ["name", "email", "subject", "message"].forEach((field) => {
      const error = validateField(field, values[field]);
      if (error) nextErrors[field] = error;
    });

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setTouched({
        name: true,
        email: true,
        subject: true,
        message: true,
      });
      setStatus("error");
      setFeedback("Please fix the highlighted fields and try again.");
      return;
    }

    const signature = JSON.stringify(values);
    const now = Date.now();

    if (
      signature === lastSubmission.current.signature &&
      now - lastSubmission.current.at < 120000
    ) {
      setStatus("error");
      setFeedback("You've already sent this message.");
      return;
    }

    setStatus("submitting");
    setFeedback("");

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, company: honeypot }),
        signal: controller.signal,
      });

      let data = null;
      try {
        data = await response.json();
      } catch {}

      if (response.ok && data?.success) {
        lastSubmission.current = { signature, at: now };
        setValues(EMPTY);
        setErrors({});
        setTouched({});
        setStatus("success");
        setFeedback(data.message || "Message sent successfully.");
      } else {
        if (data?.field) {
          setErrors((prev) => ({
            ...prev,
            [data.field]: data.message,
          }));
        }

        setStatus("error");
        setFeedback(
          data?.message ||
            (response.status === 404 && import.meta.env.DEV
              ? "The contact API route is unavailable. Restart the development server and try again."
              : "Something went wrong. Please try again.")
        );
      }
    } catch (error) {
      if (error?.name === "AbortError") return;
      setStatus("error");
      setFeedback("Network error. Please check your connection and try again.");
    } finally {
      abortRef.current = null;
    }
  }

  const messageLength = normalise(values.message, {
    allowNewlines: true,
  }).length;

  return (
    <form
      onSubmit={submit}
      noValidate
      className="relative rounded-2xl border border-white/10 bg-white/[0.035] p-4 shadow-xl shadow-black/40 backdrop-blur-xl sm:p-5"
    >
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

      <div className="grid gap-3.5 sm:grid-cols-2">
        <Field
          id="contact-name"
          label="Name"
          value={values.name}
          error={touched.name ? errors.name : undefined}
          onChange={change("name")}
          onBlur={blur("name")}
          disabled={isSubmitting}
          autoComplete="name"
          maxLength={80}
          placeholder="Your name"
          required
        />

        <Field
          id="contact-email"
          label="Email"
          type="email"
          value={values.email}
          error={touched.email ? errors.email : undefined}
          onChange={change("email")}
          onBlur={blur("email")}
          disabled={isSubmitting}
          autoComplete="email"
          maxLength={254}
          placeholder="you@example.com"
          required
        />
      </div>

      <div className="mt-3.5">
        <Field
          id="contact-subject"
          label="Subject"
          value={values.subject}
          error={touched.subject ? errors.subject : undefined}
          onChange={change("subject")}
          onBlur={blur("subject")}
          disabled={isSubmitting}
          maxLength={120}
          placeholder="What's this about?"
          required
        />
      </div>

      <div className="mt-3.5">
        <div className="mb-1.5 flex justify-between">
          <label
            htmlFor="contact-message"
            className="text-[10px] font-medium uppercase tracking-wider text-gray-400"
          >
            Message <span className="text-cyan-400">*</span>
          </label>

          <span className="font-mono text-[9px] text-gray-600">
            {messageLength}/3000
          </span>
        </div>

        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={values.message}
          onChange={change("message")}
          onBlur={blur("message")}
          disabled={isSubmitting}
          maxLength={3000}
          placeholder="Tell me about your project..."
          required
          className={cn(
            "min-h-[120px] w-full resize-y rounded-lg border bg-black/50 px-3 py-2.5 text-xs text-white outline-none transition-all duration-300 placeholder:text-gray-700",
            "border-white/10 focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/10",
            touched.message && errors.message && "border-red-500/40"
          )}
        />

        {touched.message && errors.message && (
          <p className="mt-1.5 flex gap-1.5 text-[10px] text-red-400">
            <AlertCircle className="h-3 w-3 shrink-0" />
            {errors.message}
          </p>
        )}
      </div>

      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <input
          type="text"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="mt-4 flex flex-col gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="group inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-2.5 text-xs font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:from-cyan-300 hover:to-blue-400 disabled:cursor-not-allowed disabled:opacity-60 sm:w-fit"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="h-3.5 w-3.5" />
              Send Message
            </>
          )}
        </button>

        <div className="min-h-[1rem]" role="status" aria-live="polite">
          {status === "success" && feedback && (
            <p className="flex gap-1.5 text-xs text-emerald-400">
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
              {feedback}
            </p>
          )}

          {status === "error" && feedback && (
            <p className="flex gap-1.5 text-xs text-red-400">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              {feedback}
            </p>
          )}
        </div>
      </div>
    </form>
  );
}

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden bg-black px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[32rem] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[110px]" />
      <div className="pointer-events-none absolute -right-40 top-10 h-80 w-80 rounded-full bg-indigo-500/10 blur-[110px]" />

      <div className="relative mx-auto max-w-[1450px]">
        <div className="max-w-2xl">
          <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider">
            <span className="rounded-md border border-cyan-400/30 bg-cyan-400/10 px-1.5 py-0.5 text-cyan-300">
              POST
            </span>
            <span className="text-gray-500">/contact</span>
            <span className="text-gray-700">·</span>
            <span className="text-gray-500">Contact</span>
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Let's build something together.
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-6 text-gray-400 sm:text-base">
            Have a project, a role, or a question about something I've built?
            Send me a message and I'll reply as soon as I can.
          </p>
        </div>

        <div className="mt-9 grid gap-6 lg:mt-12 lg:grid-cols-[0.85fr_1fr] lg:gap-8">
          <div className="flex flex-col">
            <p className="font-mono text-[13px] font-semibold uppercase tracking-[0.14em] text-cyan-400 sm:text-[15px]">
              Direct channels
            </p>

            <ul className="mt-5 flex flex-col gap-3">
              {CHANNELS.map((channel) => {
                const Icon = channel.icon;
                const interactive = channel.type !== "text";

                const content = (
                  <>
                    {interactive && (
                      <span className="absolute inset-y-2 left-0 w-px bg-cyan-400 opacity-0 transition-opacity group-hover:opacity-100" />
                    )}

                    <span
                      className={cn(
                        "grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-cyan-400 transition-all",
                        interactive &&
                          "group-hover:border-cyan-400/30 group-hover:bg-cyan-400/10"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-[11px] uppercase tracking-wider text-gray-400">
                        {channel.label}
                      </span>

                      <span className="mt-1 block truncate text-sm text-gray-200 transition-colors group-hover:text-white sm:text-base">
                        {channel.value}
                      </span>
                    </span>

                    {interactive && (
                      <ArrowUpRight className="h-3.5 w-3.5 text-gray-600 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-400" />
                    )}
                  </>
                );

                const className =
                  "group relative flex items-center gap-4 overflow-hidden rounded-xl border border-white/10 bg-white/[0.025] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/20 hover:bg-white/[0.05]";

                return (
                  <li key={channel.id}>
                    {channel.type === "email" ? (
                      <a href={`mailto:${channel.value}`} className={className}>
                        {content}
                      </a>
                    ) : channel.type === "link" ? (
                      <a
                        href={channel.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={className}
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="relative flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.025] p-4">
                        {content}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.025] p-4 lg:mt-auto">
              <p className="flex items-center gap-2 text-xs font-medium text-white">
                <span className="relative h-2 w-2">
                  <span className="absolute h-full w-full animate-ping rounded-full bg-cyan-400 opacity-70" />
                  <span className="absolute h-2 w-2 rounded-full bg-cyan-400" />
                </span>
                {PROFILE.available
                  ? PROFILE.availableText
                  : PROFILE.unavailableText}
              </p>

              <p className="mt-2 text-xs leading-5 text-gray-500">
                Based in {PROFILE.location} and comfortable working remotely
                across time zones.
              </p>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
