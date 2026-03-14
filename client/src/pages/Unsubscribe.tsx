/**
 * Unsubscribe Confirmation Page
 * Accessible at /unsubscribe?token=xxx
 * Calls the subscribe.unsubscribe API and shows a confirmation message.
 */

import { useEffect, useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Shield, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export default function Unsubscribe() {
  const [token, setToken] = useState<string | null>(null);
  const [status, setStatus] = useState<"loading" | "success" | "already" | "error">("loading");

  // Read token from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("token");
    setToken(t);
  }, []);

  // Check current status of the token
  const { data: subData, error: subError } = trpc.subscribe.getByToken.useQuery(
    { token: token ?? "" },
    { enabled: !!token, retry: false }
  );

  const unsubscribeMutation = trpc.subscribe.unsubscribe.useMutation({
    onSuccess: () => setStatus("success"),
    onError: (err) => {
      if (err.message.includes("NOT_FOUND") || err.data?.code === "NOT_FOUND") {
        setStatus("error");
      } else {
        setStatus("error");
      }
    },
  });

  // Once we know the subscriber's current status, decide what to show
  useEffect(() => {
    if (!token) {
      setStatus("error");
      return;
    }
    if (subError) {
      setStatus("error");
      return;
    }
    if (subData) {
      if (subData.unsubscribed) {
        setStatus("already");
      } else {
        // Auto-trigger the unsubscribe
        unsubscribeMutation.mutate({ token });
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subData, subError, token]);

  return (
    <div className="min-h-screen bg-ivory">
      <Navigation />

      <section className="min-h-[70vh] flex items-center justify-center pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl py-20">
          <div
            className="p-10 text-center"
            style={{
              backgroundColor: "rgba(255,255,255,0.7)",
              border: "1px solid rgba(201,168,76,0.25)",
              borderRadius: "4px",
            }}
          >
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <Shield size={40} className="text-brass" />
            </div>

            {status === "loading" && (
              <>
                <Loader2 size={32} className="animate-spin text-brass mx-auto mb-4" />
                <p className="font-body text-warm-gray text-base">Processing your request...</p>
              </>
            )}

            {status === "success" && (
              <>
                <CheckCircle size={40} className="text-green-600 mx-auto mb-4" />
                <h1
                  className="font-display text-3xl font-bold mb-4 leading-tight"
                  style={{ color: "#1A1A1A" }}
                >
                  You have been unsubscribed.
                </h1>
                <p className="font-body text-base leading-relaxed mb-6 text-warm-gray">
                  Your email address has been removed from the Bright Path Cyber mailing list.
                  You will no longer receive blog updates or announcements.
                </p>
                <p className="font-body text-sm text-warm-gray mb-8">
                  Changed your mind? You can always re-subscribe using the free checklist form on our homepage.
                </p>
                <Link href="/">
                  <button
                    className="btn-editorial btn-editorial-outline"
                    style={{ margin: "0 auto" }}
                  >
                    Return to Homepage
                  </button>
                </Link>
              </>
            )}

            {status === "already" && (
              <>
                <CheckCircle size={40} className="text-brass mx-auto mb-4" />
                <h1
                  className="font-display text-3xl font-bold mb-4 leading-tight"
                  style={{ color: "#1A1A1A" }}
                >
                  Already unsubscribed.
                </h1>
                <p className="font-body text-base leading-relaxed mb-6 text-warm-gray">
                  This email address has already been removed from our mailing list.
                  No further action is needed.
                </p>
                <Link href="/">
                  <button
                    className="btn-editorial btn-editorial-outline"
                    style={{ margin: "0 auto" }}
                  >
                    Return to Homepage
                  </button>
                </Link>
              </>
            )}

            {status === "error" && (
              <>
                <AlertCircle size={40} className="text-red-500 mx-auto mb-4" />
                <h1
                  className="font-display text-3xl font-bold mb-4 leading-tight"
                  style={{ color: "#1A1A1A" }}
                >
                  Link not found.
                </h1>
                <p className="font-body text-base leading-relaxed mb-6 text-warm-gray">
                  This unsubscribe link is invalid or has already been used.
                  If you are still receiving emails and would like to stop, please contact us directly.
                </p>
                <a
                  href="mailto:info@brightpathcyber.com"
                  className="btn-editorial btn-editorial-outline"
                  style={{ display: "inline-flex", margin: "0 auto" }}
                >
                  Contact Us
                </a>
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
