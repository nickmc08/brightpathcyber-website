/*
 * Checkout Success Page -- Bright Path Cyber
 * Shown after a successful Stripe payment for the e-book
 */

import { Link } from "wouter";
import { CheckCircle, ArrowRight, BookOpen } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function CheckoutSuccess() {
  return (
    <div className="min-h-screen bg-ivory">
      <Navigation />

      <section className="pt-32 pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl text-center">
          <div
            className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-8"
            style={{
              backgroundColor: "rgba(201,168,76,0.12)",
              border: "2px solid rgba(201,168,76,0.3)",
            }}
          >
            <CheckCircle size={36} style={{ color: "#C9A84C" }} />
          </div>

          <h1
            className="font-display text-4xl sm:text-5xl font-bold mb-4 leading-tight"
            style={{ color: "#1A1A1A" }}
          >
            Thank you for your purchase!
          </h1>

          <p className="font-body text-lg leading-relaxed mb-3 text-warm-gray">
            Your copy of <strong style={{ color: "#1A1A1A" }}>Click with Confidence</strong> is on its way.
          </p>

          <p className="font-body text-base leading-relaxed mb-10 text-warm-gray">
            You will receive a confirmation email shortly with your download link.
            If you do not see it within a few minutes, please check your spam folder.
          </p>

          <div
            className="p-8 mb-10"
            style={{
              backgroundColor: "rgba(255,255,255,0.7)",
              border: "1px solid rgba(201,168,76,0.25)",
              borderRadius: "6px",
            }}
          >
            <BookOpen size={24} className="mx-auto mb-4" style={{ color: "#C9A84C" }} />
            <h2
              className="font-display text-xl font-semibold mb-2"
              style={{ color: "#1A1A1A" }}
            >
              What happens next?
            </h2>
            <ul className="text-left max-w-md mx-auto space-y-3 mt-4">
              {[
                "Check your email for the download link",
                "Download the e-book to your device",
                "Work through the chapters at your own pace",
                "Use the included checklist to secure your digital life",
              ].map((step, i) => (
                <li key={step} className="flex items-start gap-3">
                  <span
                    className="flex-shrink-0 w-6 h-6 flex items-center justify-center font-body text-xs font-semibold rounded-full"
                    style={{
                      backgroundColor: "rgba(201,168,76,0.15)",
                      color: "#C9A84C",
                      border: "1px solid rgba(201,168,76,0.3)",
                    }}
                  >
                    {i + 1}
                  </span>
                  <span className="font-body text-sm text-warm-gray">{step}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/blog">
              <button className="btn-editorial btn-editorial-filled">
                Read the Blog
                <ArrowRight size={15} />
              </button>
            </Link>
            <Link href="/">
              <button className="btn-editorial btn-editorial-outline">
                Back to Home
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
