/*
 * Privacy Policy Page — Bright Path Cyber
 * Design: Concept D Editorial — "West Elm meets Apple"
 * Ivory backgrounds, brass gold accents, near-black text
 */

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2
        className="font-display text-xl font-semibold mb-3 leading-snug"
        style={{ color: "#1A1A1A" }}
      >
        {title}
      </h2>
      <div className="font-body text-base leading-relaxed text-warm-gray">
        {children}
      </div>
    </div>
  );
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-ivory">
      <Navigation />

      {/* Hero */}
      <section className="pt-28 pb-12 bg-ivory">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="brass-bar mb-6" />
          <h1
            className="font-display text-4xl sm:text-5xl font-bold leading-tight mb-4"
            style={{ color: "#1A1A1A" }}
          >
            Privacy Policy
          </h1>
          <p className="font-body text-base text-warm-gray">
            Last updated: March 2026
          </p>
        </div>
      </section>

      <div className="brass-rule" />

      {/* Body */}
      <section className="py-16 bg-ivory">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">

          <Section title="About This Policy">
            <p>
              Bright Path Cyber is a division of McMillon Co. LLC, a limited liability company
              registered in the State of Washington. This Privacy Policy explains how we collect,
              use, store, and protect information you provide when you visit brightpathcyber.com,
              sign up for our email list, or purchase a digital product from us. By using our
              website or services, you agree to the practices described in this policy.
            </p>
          </Section>

          <Section title="Information We Collect">
            <p className="mb-3">
              We collect only the information necessary to deliver our services and communicate
              with you. Specifically, we may collect:
            </p>
            <ul className="list-disc list-outside ml-5 space-y-1.5 mb-3">
              <li>
                <strong style={{ color: "#1A1A1A" }}>Name and email address</strong> when you
                sign up for our free checklist, email newsletter, or any other opt-in form on
                the site.
              </li>
              <li>
                <strong style={{ color: "#1A1A1A" }}>Payment information</strong> when you
                purchase a digital product such as the "Click with Confidence" e-book. Payment
                processing is handled entirely by Stripe. We do not store, access, or retain
                your credit card number, CVV, or any other sensitive payment details on our
                servers.
              </li>
              <li>
                <strong style={{ color: "#1A1A1A" }}>Usage data</strong> such as pages visited,
                time spent on site, and general geographic region, collected through analytics
                tools to help us understand how visitors use the site and improve our content.
              </li>
            </ul>
            <p>
              We do not collect sensitive personal information such as government ID numbers,
              health data, or financial account details beyond what Stripe processes on our behalf.
            </p>
          </Section>

          <Section title="How We Use Your Information">
            <p className="mb-3">
              Information you provide is used solely for the following purposes:
            </p>
            <ul className="list-disc list-outside ml-5 space-y-1.5">
              <li>Delivering the free checklist or other resources you requested</li>
              <li>Delivering your e-book or other purchased digital products</li>
              <li>Sending blog update emails and educational newsletters you subscribed to</li>
              <li>Responding to inquiries submitted through our contact form</li>
              <li>Improving our website content and user experience through analytics</li>
            </ul>
          </Section>

          <Section title="Email Communications and SendGrid">
            <p>
              We use SendGrid, a third-party email service provider, to send transactional and
              marketing emails including checklist delivery, e-book delivery, blog update
              notifications, and course announcements. Your email address is shared with SendGrid
              solely for the purpose of delivering these communications. SendGrid's privacy
              practices are governed by their own privacy policy, available at sendgrid.com.
            </p>
            <p className="mt-3">
              You may unsubscribe from marketing emails at any time by clicking the unsubscribe
              link included in every email we send. Unsubscribing removes you from future
              marketing communications but does not affect transactional emails related to a
              purchase you have made.
            </p>
          </Section>

          <Section title="Payment Processing and Stripe">
            <p>
              All purchases made on brightpathcyber.com are processed by Stripe, a PCI-compliant
              payment processor. When you complete a purchase, you are redirected to a
              Stripe-hosted checkout page where your payment details are entered and processed
              directly by Stripe. Bright Path Cyber and McMillon Co. LLC do not store, see, or
              have access to your full credit card number, CVV, or expiration date at any point.
            </p>
            <p className="mt-3">
              We retain only the information Stripe provides upon successful payment completion,
              such as a transaction reference ID and your email address, for the purpose of
              delivering your purchase and maintaining purchase records. Stripe's privacy policy
              is available at stripe.com/privacy.
            </p>
          </Section>

          <Section title="Cookies and Analytics">
            <p>
              Our website may use cookies and similar tracking technologies to support basic site
              functionality and to collect anonymous usage analytics. Analytics data helps us
              understand which content is most useful to our visitors and how people navigate the
              site. We do not use cookies to build advertising profiles or sell data to third
              parties.
            </p>
            <p className="mt-3">
              You may disable cookies in your browser settings at any time. Disabling cookies may
              affect certain site features but will not prevent you from accessing our content.
            </p>
          </Section>

          <Section title="Data Retention and Deletion">
            <p>
              We retain your information for as long as necessary to provide our services and
              comply with applicable legal obligations. If you would like us to delete your
              personal information from our records, including removal from our email list and
              deletion of any purchase-related data we hold, you may submit a request by emailing{" "}
              <a href="mailto:info@brightpathcyber.com" className="text-brass hover:underline">
                info@brightpathcyber.com
              </a>
              . We will process your request within a reasonable timeframe and confirm when
              deletion is complete.
            </p>
          </Section>

          <Section title="Third-Party Links">
            <p>
              Our website and emails may contain links to third-party websites, tools, or
              resources. These links are provided for informational purposes only. Bright Path
              Cyber does not control the content or privacy practices of any third-party site and
              is not responsible for how those sites collect or use your information. We encourage
              you to review the privacy policy of any third-party site you visit.
            </p>
          </Section>

          <Section title="Children's Privacy">
            <p>
              Bright Path Cyber is not directed at children under the age of 13, and we do not
              knowingly collect personal information from children under 13. If you believe a
              child under 13 has provided us with personal information, please contact us at{" "}
              <a href="mailto:info@brightpathcyber.com" className="text-brass hover:underline">
                info@brightpathcyber.com
              </a>{" "}
              and we will promptly delete that information.
            </p>
          </Section>

          <Section title="Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our
              practices, services, or applicable law. When we make changes, we will update the
              "Last updated" date at the top of this page. We encourage you to review this policy
              periodically. Continued use of the website following any changes constitutes your
              acceptance of the revised policy.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              If you have questions, concerns, or requests related to this Privacy Policy or your
              personal information, please contact us at{" "}
              <a href="mailto:info@brightpathcyber.com" className="text-brass hover:underline">
                info@brightpathcyber.com
              </a>
              . Bright Path Cyber is a division of McMillon Co. LLC, Kent, Washington.
            </p>
          </Section>

        </div>
      </section>

      <Footer />
    </div>
  );
}
