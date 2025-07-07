import React from "react";

export const metadata = {
  title: "Privacy Policy - Explore Uttarakhand Tours",
  description:
    "Learn how Explore Uttarakhand Tours collects, uses, and protects your personal information.",
};

const PrivacyPolicyPage = () => {
  return (
    <div className="bg-gradient-to-b from-white to-gray-100 py-12 px-4 sm:px-6 lg:px-8 font-serif">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-6 sm:p-10 text-gray-800">
        <h1 className="text-4xl font-extrabold text-center text-[#1c4e75] mb-8">
          Privacy Policy
        </h1>

        <section className="space-y-6">
          <p className="text-lg leading-relaxed">
            At <strong>Explore Uttarakhand Tours</strong>, we value your privacy
            and are committed to protecting your personal information. This
            Privacy Policy outlines how we collect, use, and safeguard your
            data.
          </p>

          <div>
            <h2 className="text-2xl font-bold text-[#1c4e75] mb-2">
              1. Information We Collect
            </h2>
            <ul className="list-disc pl-6 text-base space-y-2">
              <li>Your name, email address, and phone number</li>
              <li>Travel preferences and destination interests</li>
              <li>Payment and billing information</li>
              <li>Usage data such as IP address, device type, and browser</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1c4e75] mb-2">
              2. How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 text-base space-y-2">
              <li>To process bookings and inquiries</li>
              <li>To send you confirmations, updates, or promotional emails</li>
              <li>To improve our services and website experience</li>
              <li>To comply with legal obligations</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1c4e75] mb-2">
              3. Data Security
            </h2>
            <p className="text-base leading-relaxed">
              We implement appropriate technical and organizational measures to
              protect your personal data from unauthorized access, alteration,
              disclosure, or destruction.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1c4e75] mb-2">
              4. Sharing Your Information
            </h2>
            <p className="text-base mb-2">
              We do not sell or trade your personal information. We may share
              your information with:
            </p>
            <ul className="list-disc pl-6 text-base space-y-2">
              <li>Travel partners or service providers to fulfill bookings</li>
              <li>Government or legal authorities when required</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1c4e75] mb-2">
              5. Your Rights
            </h2>
            <p className="text-base leading-relaxed">
              You have the right to access, update, or delete your personal
              data. You may also opt-out of receiving marketing communications
              at any time.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1c4e75] mb-2">
              6. Cookies
            </h2>
            <p className="text-base leading-relaxed">
              Our website uses cookies to improve user experience and track
              website usage. You can control cookies through your browser
              settings.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1c4e75] mb-2">
              7. Changes to This Policy
            </h2>
            <p className="text-base leading-relaxed">
              We may update this Privacy Policy from time to time. Changes will
              be posted on this page with an updated effective date.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1c4e75] mb-2">
              8. Contact Us
            </h2>
            <p className="text-base leading-relaxed">
              If you have any questions about our Privacy Policy, feel free to
              contact us at:{" "}
              <a
                href="mailto:praveennegi247@gmail.com"
                className="text-blue-600 underline hover:text-blue-800"
              >
                praveennegi247@gmail.com
              </a>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
