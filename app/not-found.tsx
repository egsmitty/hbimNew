import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-white flex-1 flex items-center justify-center">
      <div className="max-w-[1200px] mx-auto px-6 py-32 text-center">
        <span className="font-heading font-bold text-8xl text-surface">404</span>
        <h1 className="font-heading font-bold text-3xl text-navy mt-4">Page Not Found</h1>
        <p className="font-body text-text mt-4 max-w-md mx-auto leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <Link
            href="/"
            className="font-body font-semibold text-sm bg-navy text-white px-8 py-3.5 rounded hover:bg-navy/90 transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/contact"
            className="font-body font-semibold text-sm border border-divider text-navy px-8 py-3.5 rounded hover:bg-surface transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
