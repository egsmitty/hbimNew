"use client";

import { useState } from "react";

// Note: wire form submission to your email platform before deploying.
// Options: Mailchimp embed, ConvertKit, or a Next.js API route.

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
      <section className="bg-navy text-white min-h-[40vh] flex items-center">
        <div className="max-w-[1200px] mx-auto px-6 py-20 text-center w-full">
          <span className="font-body text-xs text-gold uppercase tracking-widest font-semibold">Stay Connected</span>
          <h1 className="font-heading font-bold text-4xl md:text-5xl mt-3 leading-tight">
            Stories From the Field
          </h1>
          <p className="font-body text-white/75 text-lg mt-5 max-w-xl mx-auto leading-relaxed">
            Receive updates on the work in Africa and Asia — pastor training graduations, Bible distributions, new churches planted, and answered prayers.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-[600px] mx-auto px-6 py-20 text-center">
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

      {/* Why subscribe callouts */}
      {!submitted && (
        <section className="bg-surface border-t border-divider">
          <div className="max-w-[1200px] mx-auto px-6 py-14">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {[
                { label: "Field Updates", text: "Stories and photos from Africa and Asia — the work as it actually happens." },
                { label: "Prayer Requests", text: "Specific needs from pastors and communities so you can pray with purpose." },
                { label: "Impact Reports", text: "How your support is being put to work — transparent, specific, meaningful." },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-3">
                  <h3 className="font-heading font-bold text-navy text-lg">{item.label}</h3>
                  <p className="font-body text-sm text-text leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
