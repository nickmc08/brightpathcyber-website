/*
 * Terms of Service Page — Bright Path Cyber
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

export default function Terms() {
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
            Terms of Service
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

          <Section title="Acceptance of Terms">
            <p>
              By accessing or using brightpathcyber.com, subscribing to our email list, or
              purchasing any digital product from Bright Path Cyber, you agree to be bound by
              these Terms of Service. Bright Path Cyber is a division of McMillon Co. LLC, a
              limited liability company registered in the State of Washington. If you do not
              agree to these terms, please do not use our website or services.
            </p>
          </Section>

          <Section title="Description of Services">
            <p className="mb-3">
              Bright Path Cyber provides cybersecurity education and awareness resources for
              individuals and families. Our services include:
            </p>
            <ul className="list-disc list-outside ml-5 space-y-1.5">
              <li>Free blog articles, guides, and checklists on cybersecurity topics</li>
              <li>A free Personal Security Audit Checklist delivered by email upon signup</li>
              <li>
                The "Click with Confidence" e-book, a paid digital product available for
                individual purchase
              </li>
              <li>
                Future self-paced online courses on cybersecurity topics (when available)
              </li>
              <li>
                An email newsletter delivering blog updates and educational content to
                subscribers
              </li>
            </ul>
            <p className="mt-3">
              All content is provided for educational and informational purposes only. Please
              refer to our{" "}
              <a href="/disclaimer" className="text-brass hover:underline">
                Disclaimer
              </a>{" "}
              for important limitations on the use of our content.
            </p>
          </Section>

          <Section title="E-Book License Terms">
            <p className="mb-3">
              When you purchase the "Click with Confidence" e-book or any other digital product
              from Bright Path Cyber, you are granted a limited, non-exclusive, non-transferable
              personal license to access and use the content for your own personal, non-commercial
              purposes. This license does not include the right to:
            </p>
            <ul className="list-disc list-outside ml-5 space-y-1.5 mb-3">
              <li>Share, distribute, or resell the e-book or any portion of it to others</li>
              <li>
                Reproduce or republish the content in any format, including print, digital, or
                online
              </li>
              <li>
                Use the content for commercial purposes, including training, consulting, or
                resale
              </li>
              <li>
                Remove or alter any copyright notices, watermarks, or attribution included in
                the product
              </li>
            </ul>
            <p>
              Your purchase grants access to the specific version of the product available at
              the time of purchase. Bright Path Cyber reserves the right to update or revise
              digital products at any time. Updated versions are not guaranteed to be provided
              to prior purchasers unless otherwise stated.
            </p>
          </Section>

          <Section title="Refund Policy">
            <p className="mb-3">
              Because our products are digital downloads delivered immediately upon purchase,
              all sales are generally final. However, we want you to be satisfied with your
              purchase. If you experience a technical issue that prevents you from accessing
              your product, or if you believe there has been an error with your order, please
              contact us within 7 days of purchase at{" "}
              <a href="mailto:info@brightpathcyber.com" className="text-brass hover:underline">
                info@brightpathcyber.com
              </a>{" "}
              and we will work to resolve the issue promptly.
            </p>
            <p>
              Refund requests submitted more than 7 days after the date of purchase will be
              considered on a case-by-case basis at the sole discretion of Bright Path Cyber.
            </p>
          </Section>

          <Section title="Email Subscriptions">
            <p>
              By signing up for our email list, you consent to receive marketing and educational
              emails from Bright Path Cyber, including blog update notifications, product
              announcements, and cybersecurity tips. You may unsubscribe at any time by clicking
              the unsubscribe link in any email we send. We will honor all unsubscribe requests
              promptly. For more information on how we handle your data, please see our{" "}
              <a href="/privacy-policy" className="text-brass hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </Section>

          <Section title="Intellectual Property">
            <p>
              All content on brightpathcyber.com, including but not limited to blog articles,
              guides, checklists, e-books, course materials, graphics, logos, and the Bright Path
              Cyber name and branding, is the intellectual property of McMillon Co. LLC and is
              protected by applicable copyright, trademark, and other intellectual property laws.
            </p>
            <p className="mt-3">
              You may share links to our blog articles or reference our content with proper
              attribution, but you may not reproduce, copy, or distribute substantial portions
              of our content without prior written permission from McMillon Co. LLC. To request
              permission, contact us at{" "}
              <a href="mailto:info@brightpathcyber.com" className="text-brass hover:underline">
                info@brightpathcyber.com
              </a>
              .
            </p>
          </Section>

          <Section title="Limitation of Liability">
            <p>
              To the fullest extent permitted by applicable law, McMillon Co. LLC and Bright Path
              Cyber shall not be liable for any indirect, incidental, special, consequential, or
              punitive damages arising out of or related to your use of our website, content, or
              digital products, even if we have been advised of the possibility of such damages.
              Our total liability to you for any claim arising from your use of our services shall
              not exceed the amount you paid for the product or service giving rise to the claim.
            </p>
            <p className="mt-3">
              Some jurisdictions do not allow the exclusion or limitation of certain damages, so
              the above limitation may not apply to you in full.
            </p>
          </Section>

          <Section title="Governing Law">
            <p>
              These Terms of Service are governed by and construed in accordance with the laws
              of the State of Washington, without regard to its conflict of law provisions. Any
              disputes arising under or in connection with these terms shall be subject to the
              exclusive jurisdiction of the state and federal courts located in King County,
              Washington.
            </p>
          </Section>

          <Section title="Changes to These Terms">
            <p>
              Bright Path Cyber reserves the right to update or modify these Terms of Service at
              any time. When changes are made, we will update the "Last updated" date at the top
              of this page. Your continued use of the website or services after any changes
              constitutes your acceptance of the revised terms. We encourage you to review this
              page periodically.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              If you have questions about these Terms of Service, please contact us at{" "}
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
