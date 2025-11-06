import React from "react";

export const metadata = {
  title: "Privacy Policy - Explore Uttarakhand Tours",
  description:
    "Understand how Explore Uttarakhand Tours collects, uses, and protects your personal information responsibly and transparently.",
};

const PrivacyPolicyPage = () => {
  return (
    <div className="bg-gradient-to-b from-[#f9fafb] via-white to-[#e6f0f7] py-12 px-4 sm:px-6 lg:px-8 font-serif">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl p-8 sm:p-12 lg:p-16 transition-all duration-300 hover:shadow-3xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1c4e75] mb-4 tracking-wide">
            Privacy Policy
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            At <strong>Raaही</strong>, your privacy is our
            top priority. This policy explains how we handle your data with
            transparency and care.
          </p>
        </div>

        <section className="space-y-10 text-gray-800">
          <div>
            <h2 className="text-2xl font-bold text-[#1c4e75] mb-3">
              1. Information We Collect
            </h2>
            <ul className="list-disc pl-6 text-base space-y-2">
              <li>Personal details such as your name, phone number, and email</li>
              <li>Travel preferences and destination interests</li>
              <li>Payment and billing information (handled securely)</li>
              <li>Website usage data such as browser, device type, and IP address</li>
              <li>Feedback or inquiries submitted through our forms</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1c4e75] mb-3">
              2. How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 text-base space-y-2">
              <li>To process bookings, queries, and travel arrangements</li>
              <li>To send confirmations, offers, and relevant travel updates</li>
              <li>To improve our website&apos;s performance and your experience</li>
              <li>To comply with legal and regulatory obligations</li>
              <li>To ensure customer satisfaction and personalize our services</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1c4e75] mb-3">
              3. Data Security
            </h2>
            <p className="text-base leading-relaxed">
              We use industry-standard encryption and secure systems to protect
              your personal information from unauthorized access, alteration, or
              misuse. Our team regularly reviews security practices to maintain
              the integrity of your data.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1c4e75] mb-3">
              4. Sharing Your Information
            </h2>
            <p className="text-base mb-2">
              We do not sell or rent your personal information. We may share
              your data only with:
            </p>
            <ul className="list-disc pl-6 text-base space-y-2">
              <li>
                Trusted travel partners, hotels, or transportation providers
                necessary for completing your bookings.
              </li>
              <li>Government or law enforcement agencies if required by law.</li>
              <li>Third-party services assisting in marketing or analytics (with confidentiality agreements).</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1c4e75] mb-3">
              5. Cookies and Tracking Technologies
            </h2>
            <p className="text-base leading-relaxed">
              Our website uses cookies to improve user experience, analyze
              traffic, and personalize content. You can control cookie
              preferences through your browser settings at any time.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1c4e75] mb-3">
              6. Third-Party Links
            </h2>
            <p className="text-base leading-relaxed">
              Our site may contain links to other websites. We are not
              responsible for the privacy practices or content of third-party
              sites. We recommend reviewing their privacy policies before
              providing any personal data.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1c4e75] mb-3">
              7. Children&apos;s Privacy
            </h2>
            <p className="text-base leading-relaxed">
              Our services are not intended for children under 13. We do not
              knowingly collect personal data from minors. If we become aware of
              such data collection, we promptly delete it.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1c4e75] mb-3">
              8. Updates to This Policy
            </h2>
            <p className="text-base leading-relaxed">
              We may update this Privacy Policy periodically. The latest version
              will always be available on this page, with the effective date
              clearly stated. Continued use of our website implies acceptance of
              the updated terms.
            </p>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold text-[#1c4e75] mb-3">
              9. Contact Us
            </h2>
            <p className="text-base leading-relaxed">
              Have questions about our Privacy Policy or how your information is
              handled? Contact us anytime at{" "}
              <a
                href="mailto:praveennegi247@gmail.com"
                className="text-[#1c4e75] underline hover:text-[#163c5c] font-semibold"
              >
                praveennegi247@gmail.com
              </a>{" "}
              — we&apos;d be happy to help.
            </p>
          </div>
        </section>

        <p className="text-center text-gray-500 text-sm mt-12">
          © {new Date().getFullYear()} Raaही. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
