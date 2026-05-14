"use client";

import { useState } from "react";

// Note: wire the form action to Formspree or a Next.js API route before deploying.
// Formspree: https://formspree.io — replace action="#" with your Formspree endpoint.

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    // TODO: replace with actual form submission (Formspree endpoint or API route)
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    setLoading(false);
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-navy text-white">
        <div className="max-w-[1440px] mx-auto px-6 py-20 text-center">
          <span className="font-body text-sm text-gold uppercase tracking-widest font-semibold">Get In Touch</span>
          <h1 className="font-heading font-bold text-4xl md:text-5xl mt-3 leading-tight">
            We&apos;d Love to Hear From You
          </h1>
          <p className="font-body text-white/75 text-lg mt-5 max-w-xl mx-auto leading-relaxed">
            Have a question, want to learn more about HBM, or looking to get involved? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Two-column layout */}
      <section className="bg-[#F8F7F5] border-t border-[#C8C0B4]">
        <div className="max-w-[1440px] mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

            {/* Form */}
            <div>
              <h2 className="font-heading font-bold text-2xl text-navy mb-8">Send a Message</h2>

              {submitted ? (
                <div className="bg-surface border border-divider rounded-lg p-10 text-center">
                  <svg className="w-12 h-12 text-gold mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <h3 className="font-heading font-bold text-navy text-xl mb-2">Message Sent</h3>
                  <p className="font-body text-text text-sm leading-relaxed">
                    Thank you for reaching out. The HBM team will be in touch shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="name" className="font-body text-xs font-semibold text-navy uppercase tracking-widest">
                        Your Name <span className="text-gold">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        className="font-body text-sm border border-divider rounded px-4 py-3 text-foreground bg-white focus:outline-none focus:border-navy transition-colors"
                        placeholder="Jane Smith"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="font-body text-xs font-semibold text-navy uppercase tracking-widest">
                        Your Email <span className="text-gold">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="font-body text-sm border border-divider rounded px-4 py-3 text-foreground bg-white focus:outline-none focus:border-navy transition-colors"
                        placeholder="jane@example.com"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="subject" className="font-body text-xs font-semibold text-navy uppercase tracking-widest">
                      Subject
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      className="font-body text-sm border border-divider rounded px-4 py-3 text-foreground bg-white focus:outline-none focus:border-navy transition-colors"
                      placeholder="How can we help?"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="font-body text-xs font-semibold text-navy uppercase tracking-widest">
                      Message <span className="text-gold">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      className="font-body text-sm border border-divider rounded px-4 py-3 text-foreground bg-white focus:outline-none focus:border-navy transition-colors resize-none"
                      placeholder="Your message..."
                    />
                  </div>
                  {/* Honeypot antibot field */}
                  <input type="text" name="_gotcha" className="hidden" tabIndex={-1} aria-hidden="true" />
                  <button
                    type="submit"
                    disabled={loading}
                    className="font-body font-semibold text-sm bg-navy text-white px-8 py-3.5 rounded hover:bg-navy/90 disabled:opacity-60 transition-colors self-start"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info + Team */}
            <div className="flex flex-col gap-10">
              <div>
                <h2 className="font-heading font-bold text-2xl text-navy mb-6">Contact Information</h2>
                <div className="flex flex-col gap-5">
                  <div className="flex items-start gap-4">
                    <svg className="w-5 h-5 text-gold mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                    <address className="font-body text-sm text-text not-italic leading-relaxed">
                      PO Box 317<br />Greenwood, VA 22943
                    </address>
                  </div>
                  <div className="flex items-center gap-4">
                    <svg className="w-5 h-5 text-gold shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                    </svg>
                    <a href="tel:9314017310" className="font-body text-sm text-text hover:text-navy transition-colors">
                      (931) 401-7310
                    </a>
                  </div>
                  <div className="flex items-center gap-4">
                    <svg className="w-5 h-5 text-gold shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                    <a href="mailto:Ministry@HBMIN.org" className="font-body text-sm text-text hover:text-navy transition-colors">
                      Ministry@HBMIN.org
                    </a>
                  </div>
                </div>
              </div>

              {/* Team */}
              <div>
                <h3 className="font-heading font-bold text-xl text-navy mb-5">Direct Contacts</h3>
                <div className="flex flex-col gap-4">
                  {[
                    { name: "Lawrence Gunnells", email: "lawrence@hbmin.org" },
                    { name: "Jeff Hawkins", email: "jeff@hbmin.org" },
                  ].map((person) => (
                    <div key={person.name} className="flex items-center gap-4 p-4 bg-surface rounded-lg">
                      <div className="w-10 h-10 bg-navy rounded-full flex items-center justify-center shrink-0">
                        <span className="font-heading text-white text-xs font-bold">
                          {person.name.split(" ").map((n) => n[0]).join("")}
                        </span>
                      </div>
                      <div>
                        <p className="font-body text-sm font-semibold text-navy">{person.name}</p>
                        <a href={`mailto:${person.email}`} className="font-body text-xs text-gold hover:text-gold/80 transition-colors">
                          {person.email}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Team Callout */}
              <div className="bg-navy rounded-lg p-8">
                <h3 className="font-heading font-bold text-white text-lg leading-snug">
                  Join the HBM Team
                </h3>
                <p className="font-body text-white/75 text-sm mt-3 leading-relaxed">
                  HBM is always looking for disciples of Christ who desire to multiply disciples for Christ around the world. If that&apos;s you, reach out — we&apos;d love to talk.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
