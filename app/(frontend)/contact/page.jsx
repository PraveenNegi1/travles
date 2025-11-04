"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import toast from "react-hot-toast";

function FormPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [source, setSource] = useState("Direct");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get("utm_source");
    const referrer = document.referrer;

    if (utmSource) {
      setSource(utmSource);
    } else if (referrer) {
      try {
        const ref = new URL(referrer);
        setSource(ref.hostname); 
      } catch {
        setSource(referrer); 
      }
    } else {
      setSource("Direct");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "contacts"), {
        ...formData,
        createdAt: Timestamp.now(),
        source, 
      });

      toast.success("Message sent successfully!");
      setTimeout(() => router.push("/thankyou"), 1500);
    } catch (error) {
      console.error("Firestore error:", error);
      toast.error("Failed to send message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-3 sm:p-4 md:p-6  font-serif">
      <div className="bg-white shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row w-full max-w-5xl">
        <div className="w-full md:w-1/2 h-48 sm:h-60 md:h-auto relative">
          <img
            src="/uttarakhand.jpg"
            alt="Beautiful Uttarakhand"
            className="w-full h-full object-cover"
          />
          <div className="merriweather absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4 sm:p-6 md:p-8">
            <h3 className="text-white text-lg sm:text-xl md:text-2xl font-bold">
              Discover Uttarakhand
            </h3>
            <p className="text-white/90 text-xs sm:text-sm md:text-base mt-1 sm:mt-2">
              Let us help you plan your perfect journey
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-8 lg:p-10">
          <h2 className="merriweather text-xl sm:text-2xl md:text-3xl font-extrabold text-center text-gray-800 mb-4 sm:mb-6">
            <span className="text-[#205781]">Contact Us</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="group">
              <label className="block text-gray-600 font-medium mb-1 text-sm">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-sky-500"
                required
                placeholder="Your full name"
              />
            </div>

            <div className="group">
              <label className="block text-gray-600 font-medium mb-1 text-sm">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-sky-500"
                required
                placeholder="your@email.com"
              />
            </div>

            <div className="group">
              <label className="block text-gray-600 font-medium mb-1 text-sm">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-sky-500"
                required
                placeholder="+91 98765 43210"
              />
            </div>

            <div className="group">
              <label className="block text-gray-600 font-medium mb-1 text-sm">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="3"
                className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-sky-500 resize-none"
                required
                placeholder="Tell us about your travel plans..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full text-white p-3 rounded-xl shadow-md bg-[#205781] text-lg font-medium transition-all duration-300 disabled:opacity-70"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin mr-2 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z" />
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Send Message"
              )}
            </button>
          </form>

          {/* Display detected source for debugging */}
          <p className="text-xs text-gray-400 mt-4 text-center">
            <span className="font-medium">Source:</span> {source}
          </p>
        </div>
      </div>
    </div>
  );
}

export default FormPage;
