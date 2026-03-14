/**
 * Hook to trigger Stripe Checkout for the "Click with Confidence" e-book
 */
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export function useEbookCheckout() {
  const [loading, setLoading] = useState(false);

  const createSession = trpc.checkout.createEbookSession.useMutation({
    onSuccess: ({ url }) => {
      toast.info("Redirecting to checkout...");
      window.open(url, "_blank");
      setLoading(false);
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong. Please try again.");
      setLoading(false);
    },
  });

  const checkout = () => {
    if (loading) return;
    setLoading(true);
    createSession.mutate({ origin: window.location.origin });
  };

  return { checkout, loading };
}
