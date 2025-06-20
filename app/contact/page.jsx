"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

function FormPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append(
        "access_key",
        "c8ef694c-3f64-405f-b1c2-536da52dabb7"
      );
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("message", formData.message);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();

      if (result.success) {
        router.push("/thankyou");
      } else {
        throw new Error(result.message || "Form submission failed");
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-3 sm:p-4 md:p-6 bg-gradient-to-br from-sky-50 to-indigo-100">
      <div className="bg-white shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row w-full max-w-5xl">
        <div className="w-full md:w-1/2 h-48 sm:h-60 md:h-auto relative">
          <img
            src="/uttarakhand.jpg"
            alt="Beautiful Uttarakhand"
            className="w-full h-full object-cover"
          />
          <div className=" merriweather absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4 sm:p-6 md:p-8">
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
          <h2 className=" merriweather text-xl sm:text-2xl md:text-3xl font-extrabold text-center text-gray-800 mb-4 sm:mb-6">
            <span className="text-[#205781]">Contact Us</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="hidden"
              name="access_key"
              value="c8ef694c-3f64-405f-b1c2-536da52dabb7"
            />

            <div className="group">
              <label className="block text-gray-600 font-medium mb-1 text-sm transition-all duration-200 group-focus-within:text-sky-600">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2.5 sm:p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition duration-300"
                required
                placeholder="Your full name"
              />
            </div>

            <div className="group">
              <label className="block text-gray-600 font-medium mb-1 text-sm transition-all duration-200 group-focus-within:text-sky-600">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2.5 sm:p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition duration-300"
                required
                placeholder="your@gmail.com"
              />
            </div>

            <div className="group">
              <label className="block text-gray-600 font-medium mb-1 text-sm transition-all duration-200 group-focus-within:text-sky-600">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2.5 sm:p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition duration-300"
                required
                placeholder="+91 98765 43210"
              />
            </div>

            <div className="group">
              <label className="block text-gray-600 font-medium mb-1 text-sm transition-all duration-200 group-focus-within:text-sky-600">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="3"
                className="w-full p-2.5 sm:p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition duration-300 resize-none"
                required
                placeholder="Tell us about your travel plans or questions..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full text-white p-2.5 sm:p-3 rounded-xl shadow-md bg-[#205781] text-base sm:text-lg font-medium transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 sm:h-5 sm:w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormPage;
