"use client";

import { useState } from "react";
import Hero from "@/components/Hero";

// Note: wire form submission to your email platform before deploying.
// Options: Mailchimp embed, ConvertKit, or a Next.js API route.

const benefits = [
  {
    label: "Field Updates",
    text: "Stories and photos from Africa and Asia — the work as it actually happens.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
      </svg>
    ),
  },
  {
    label: "Prayer Requests",
    text: "Specific needs from pastors and communities so you can pray with purpose.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.05 4.575a1.575 1.575 0 1 0-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 0 1 3.15 0v1.5m-3.15 0 .075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 0 1 3.15 0V15M6.9 7.575a1.575 1.575 0 1 0-3.15 0v8.175a6.75 6.75 0 0 0 6.75 6.75h2.018a5.25 5.25 0 0 0 3.712-1.538l1.732-1.732a5.25 5.25 0 0 0 1.538-3.712l.003-2.024a.668.668 0 0 1 .198-.471 1.575 1.575 0 1 0-2.228-2.228 3.818 3.818 0 0 0-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0 1 16.35 15m.002 0h-.002" />
      </svg>
    ),
  },
  {
    label: "Impact Reports",
    text: "How your support is being put to work — transparent, specific, meaningful.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
  },
];

export default function SubscribePage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    // TODO: replace with actual email platform submission
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    setLoading(false);
  }

  return (
    <>
      <Hero
        title="Stories From the Field"
        subtitle="Receive updates on the work in Africa and Asia — pastor training graduations, Bible distributions, new churches planted, and answered prayers."
        imageSrc="https://picsum.photos/seed/hbm-subscribe/1920/1080"
        imageAlt="Community gathered in worship in rural Africa"
      />

      {/* What you'll receive — icon cards */}
      <section className="bg-white border-b border-divider">
        <div className="max-w-[1200px] mx-auto px-6 py-16">
          <div className="text-center mb-10">
            <span className="font-body text-xs text-gold uppercase tracking-widest font-semibold">What You&apos;ll Receive</span>
            <h2 className="font-heading font-bold text-3xl text-navy mt-3">Stay Connected to the Work</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((item) => (
              <div key={item.label} className="flex flex-col items-center text-center gap-4 p-8 border border-divider rounded-lg">
                <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center text-gold shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-heading font-bold text-navy text-lg">{item.label}</h3>
                  <p className="font-body text-sm text-text mt-2 leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Email form */}
      <section className="bg-surface">
        <div className="max-w-[560px] mx-auto px-6 py-20 text-center">
          {submitted ? (
            <div className="flex flex-col items-center gap-5">
              <svg className="w-14 h-14 text-gold" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <h2 className="font-heading font-bold text-2xl text-navy">You&apos;re Subscribed</h2>
              <p className="font-body text-text leading-relaxed">
                Thank you for joining the HBM community. Expect stories, updates, and prayer requests from the field.
              </p>
            </div>
          ) : (
            <>
              <h2 className="font-heading font-bold text-2xl text-navy mb-2">Join the Community</h2>
              <p className="font-body text-text mb-8 leading-relaxed">
                No spam. No clutter. Just real updates from real ministry — straight to your inbox.
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 font-body text-sm border border-divider rounded px-4 py-3 text-foreground bg-white focus:outline-none focus:border-navy transition-colors"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="font-body font-semibold text-sm bg-gold text-white px-8 py-3 rounded hover:bg-gold/90 disabled:opacity-60 transition-colors whitespace-nowrap"
                >
                  {loading ? "Subscribing..." : "Subscribe"}
                </button>
              </form>
              <p className="font-body text-xs text-text-muted mt-4">
                You can unsubscribe at any time. We respect your inbox.
              </p>
            </>
          )}
        </div>
      </section>
    </>
  );
}
