"use client";

import { useState } from "react";
import Image from "next/image";

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
      {/* Unified hero + form — single section, gradient dissolves into surface */}
      <section className="relative overflow-hidden min-h-[580px] md:min-h-[640px]">
        <Image
          src="https://picsum.photos/seed/hbm-subscribe/1920/1080"
          alt="Community gathered in worship in rural Africa"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Gradient: dark navy at top → transparent mid → solid surface at bottom */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(25,53,94,0.95) 0%, rgba(25,53,94,0.88) 35%, rgba(25,53,94,0.45) 65%, #eeeeee 100%)",
          }}
        />

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 pt-20 pb-10 flex flex-col items-center">
          {/* Combined headline + form box */}
          <div className="w-full max-w-[1100px] border border-white/20 rounded-2xl bg-white/5 backdrop-blur-sm px-10 md:px-16 py-12 flex flex-col items-center gap-0">
            {/* Headline */}
            <div className="text-center w-full">
              <h1 className="font-heading font-bold text-white text-3xl sm:text-4xl md:text-5xl leading-[1.1] tracking-tight">
                Stories From the Field
              </h1>
              <p className="font-body text-lg text-white/80 mt-5 leading-relaxed">
                Real updates from Africa and Asia — straight to your inbox.
              </p>
            </div>

            <div className="w-full border-t border-white/15 my-10" />

            {/* Form */}
            {submitted ? (
              <div className="flex flex-col gap-4 w-full max-w-[520px] bg-white rounded-2xl shadow-xl p-8">
                <svg className="w-12 h-12 text-gold" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <h2 className="font-heading font-bold text-2xl text-navy">You&apos;re Subscribed</h2>
                <p className="font-body text-text leading-relaxed">
                  Thank you for joining the HBM community. Expect stories, updates, and prayer requests from the field.
                </p>
              </div>
            ) : (
              <div className="w-full max-w-[520px] bg-white rounded-2xl shadow-xl p-8">
                <p className="font-body text-sm text-gold uppercase tracking-widest font-semibold mb-5">
                  Join the Community
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <input
                    type="email"
                    name="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full font-body text-sm border border-divider rounded-full px-5 py-3 text-foreground bg-white focus:outline-none focus:border-navy transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full font-body font-semibold text-sm bg-gold text-white px-8 py-3 rounded-full hover:bg-gold/90 disabled:opacity-60 transition-colors"
                  >
                    {loading ? "Subscribing..." : "Subscribe"}
                  </button>
                </form>
                <p className="font-body text-xs text-text-muted mt-4">
                  You can unsubscribe at any time. We respect your inbox.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Benefit cards — same surface bg, no visible seam */}
      <section className="bg-[#eeeeee] pt-8 pb-16">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="text-center mb-8">
            <span className="font-body text-sm text-gold uppercase tracking-widest font-semibold">What You&apos;ll Receive</span>
            <h2 className="font-heading font-bold text-3xl text-navy mt-3">Stay Connected to the Work</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((item) => (
              <div key={item.label} className="flex flex-col items-center text-center gap-4 p-8 bg-white border border-divider rounded-lg">
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
    </>
  );
}
