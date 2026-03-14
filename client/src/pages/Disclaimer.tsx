/*
 * Disclaimer Page — Bright Path Cyber
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

export default function Disclaimer() {
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
            Disclaimer
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

          <Section title="Educational Purpose Only">
            <p>
              All content published by Bright Path Cyber, including but not limited to blog articles,
              guides, checklists, e-books, courses, and any other materials, is provided for
              educational and informational purposes only. The guidance offered is intended to help
              individuals and families reduce their exposure to common cyber threats by building
              awareness and adopting practical safety habits.
            </p>
          </Section>

          <Section title="No Guarantee of Protection">
            <p className="mb-3">
              No security measure, practice, or tool is foolproof. The digital threat landscape
              changes constantly, and new vulnerabilities, attack methods, and scams emerge
              regularly. Following the steps, recommendations, or advice provided by Bright Path
              Cyber does not guarantee protection from all cyberattacks, data breaches, identity
              theft, financial fraud, or other digital threats.
            </p>
            <p>
              Results will vary depending on individual circumstances, the devices and services
              used, the actions of third parties, and factors entirely outside the control of
              Bright Path Cyber or the user.
            </p>
          </Section>

          <Section title="No Liability">
            <p className="mb-3">
              Bright Path Cyber and McMillon Co. LLC expressly disclaim all liability for any
              direct, indirect, incidental, consequential, special, or exemplary damages or losses
              of any kind, including but not limited to financial loss, data loss, loss of privacy,
              or harm to devices or systems, arising out of or in connection with:
            </p>
            <ul className="list-disc list-outside ml-5 space-y-1.5">
              <li>The use of, or reliance on, any information, content, or materials provided by Bright Path Cyber</li>
              <li>The inability to use or access any content or service provided</li>
              <li>Any errors, omissions, or inaccuracies in the content</li>
              <li>Any cyberattack, data breach, or security incident that occurs despite following the guidance provided</li>
            </ul>
          </Section>

          <Section title="Information Provided As Is">
            <p>
              All content is provided "as is" and "as available" without any warranties of any kind,
              either express or implied, including but not limited to implied warranties of
              merchantability, fitness for a particular purpose, or non-infringement. Bright Path
              Cyber makes no representations or warranties that the information is complete,
              accurate, current, or free of errors.
            </p>
          </Section>

          <Section title="Consult a Qualified Professional">
            <p>
              The content provided by Bright Path Cyber is general in nature and is not a substitute
              for professional cybersecurity advice, assessment, or services. Individuals and
              organizations with specific, sensitive, or high-risk security needs should consult a
              qualified cybersecurity professional, IT specialist, or legal advisor who can evaluate
              their particular situation and provide tailored guidance.
            </p>
          </Section>

          <Section title="Third-Party Links and Resources">
            <p>
              Bright Path Cyber may reference or link to third-party websites, tools, or services.
              These links are provided for convenience and informational purposes only. Bright Path
              Cyber does not endorse, control, or assume responsibility for the content, privacy
              practices, or security of any third-party site or service. Accessing third-party
              resources is done at your own risk.
            </p>
          </Section>

          <Section title="Changes to This Disclaimer">
            <p>
              Bright Path Cyber reserves the right to update or modify this disclaimer at any time
              without prior notice. Continued use of the website or any content following any
              changes constitutes acceptance of the revised disclaimer. We encourage you to review
              this page periodically.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              If you have questions about this disclaimer or the information provided on this site,
              please contact us at{" "}
              <a
                href="mailto:info@brightpathcyber.com"
                className="text-brass hover:underline"
              >
                info@brightpathcyber.com
              </a>
              .
            </p>
          </Section>

        </div>
      </section>

      <Footer />
    </div>
  );
}
