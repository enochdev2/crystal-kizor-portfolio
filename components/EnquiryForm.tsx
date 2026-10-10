"use client";

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import { buttonClass } from "@/lib/ui";

const intents = [
  "Architecture / interior project",
  "Speaking engagement",
  "Partnership / collaboration",
  "Education / media",
  "General enquiry",
] as const;

type FormStatus =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success"; message: string }
  | { state: "error"; message: string };

const fieldClass = "grid gap-[0.55rem]";

const labelClass = "text-[0.72rem] font-semibold tracking-[0.05em] uppercase text-white/80";

const controlClass = `
    w-full
    rounded-none
    border
    border-white/30
    bg-
    px-4
    py-[0.95rem]
    text-ink
    outline-none
    transition-[border-color,box-shadow]
    duration-200

    placeholder:text-white

    hover:border-clay/60

    focus:border-clay
    focus:shadow-[0_0_0_1px_rgba(191,137,98,.25)]
  `;

export function EnquiryForm() {
  const [status, setStatus] = useState<FormStatus>({ state: "idle" });
  const [selectedIntent, setSelectedIntent] = useState<string>(intents[0]);
  const started = useRef(false);

  useEffect(() => {
    const onIntent = (event: Event) => {
      const customEvent = event as CustomEvent<{ intent?: string }>;
      const nextIntent = customEvent.detail?.intent;
      if (nextIntent && intents.includes(nextIntent as (typeof intents)[number])) {
        setSelectedIntent(nextIntent);
      }
    };

    window.addEventListener("crystal:enquiry-intent", onIntent);
    return () => window.removeEventListener("crystal:enquiry-intent", onIntent);
  }, []);

  const markStarted = () => {
    if (started.current) return;
    started.current = true;
    track("enquiry_started", { source: "contact_form" });
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ state: "submitting" });

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { message?: string };
      if (!response.ok) {
        throw new Error(result.message || "We could not send your enquiry. Please try again.");
      }

      track("enquiry_submitted", {
        intent: String(payload.intent || "unknown"),
      });
      form.reset();
      setSelectedIntent(intents[0]);
      started.current = false;
      setStatus({
        state: "success",
        message: result.message || "Thank you. Your enquiry has been sent.",
      });
    } catch (error) {
      setStatus({
        state: "error",
        message:
          error instanceof Error
            ? error.message
            : "We could not send your enquiry. Please try again.",
      });
    }
  }

  return (
    <form
      className="bg-moss-deep grid grid-cols-2 gap-[1.4rem] rounded-lg p-[clamp(3rem,5vw,5.5rem)] max-[760px]:grid-cols-1"
      onSubmit={onSubmit}
      onFocus={markStarted}
    >
      <div className={`${fieldClass} col-span-2 max-[760px]:col-span-1`}>
        <label className={labelClass} htmlFor="intent">
          What would you like to discuss?
        </label>
        <select
          className={`${controlClass} bg-moss-deep text-white/80`}
          id="intent"
          name="intent"
          required
          value={selectedIntent}
          onChange={(event: ChangeEvent<HTMLSelectElement>) =>
            setSelectedIntent(event.target.value)
          }
        >
          {intents.map((intent) => (
            <option key={intent}>{intent}</option>
          ))}
        </select>
      </div>

      <div className={fieldClass}>
        <label className={labelClass} htmlFor="name">
          Name
        </label>
        <input
          className={controlClass}
          id="name"
          name="name"
          autoComplete="name"
          minLength={2}
          maxLength={80}
          required
        />
      </div>

      <div className={fieldClass}>
        <label className={labelClass} htmlFor="email">
          Email
        </label>
        <input
          className={controlClass}
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          maxLength={160}
          required
        />
      </div>

      <div className={`${fieldClass} col-span-2 max-[760px]:col-span-1`}>
        <label className={labelClass} htmlFor="organisation">
          Organisation <span className="font-normal text-white">(optional)</span>
        </label>
        <input
          className={controlClass}
          id="organisation"
          name="organisation"
          autoComplete="organization"
          maxLength={120}
        />
      </div>

      <div className={`${fieldClass} col-span-2 max-[760px]:col-span-1`}>
        <label className={labelClass} htmlFor="message">
          Tell us a little about the opportunity
        </label>
        <textarea
          className={`${controlClass} min-h-37.5 resize-y`}
          id="message"
          name="message"
          rows={6}
          minLength={20}
          maxLength={2000}
          required
        />
        <small className="leading-normal text-white/60">
          Include the location, timing and goals where relevant.
        </small>
      </div>

      <div className="sr-only" aria-hidden="true">
        <label htmlFor="companyWebsite">Website</label>
        <input id="companyWebsite" name="companyWebsite" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="col-span-2 mt-2 flex flex-wrap items-center gap-5 max-[760px]:col-span-1">
        <button
          className={`${buttonClass} text-ink bg-white`}
          type="submit"
          disabled={status.state === "submitting"}
        >
          {status.state === "submitting" ? "Sending…" : "Send enquiry"}
        </button>
        <p className="m-0 max-w-95 text-[0.72rem] leading-normal text-white/60">
          Your details are used only to respond to this enquiry.
        </p>
      </div>

      <div
        className="col-span-2 min-h-6 text-[0.85rem] leading-[1.55] max-[760px]:col-span-1"
        role="status"
        aria-live="polite"
      >
        {status.state === "success" && <p className="m-0 text-[#dceadf]">{status.message}</p>}
        {status.state === "error" && (
          <p className="m-0 text-[#ffd6cc]">
            {status.message}{" "}
            <a
              className="underline"
              href="https://studiocoka.com/"
              target="_blank"
              rel="noreferrer"
            >
              For architecture projects, visit Studio COKA.
            </a>
          </p>
        )}
      </div>
    </form>
  );
}
