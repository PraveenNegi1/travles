"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

function FormPage() {
  const router = useRouter();
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

    const formDataToSend = new FormData();
    formDataToSend.append("access_key", "c8ef694c-3f64-405f-b1c2-536da52dabb7");
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
      alert("Form submitted successfully");
      router.push("/thankyou");
    } else {
      alert("Form submission error", result);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 bg-gray-100 bg-no-repeat bg-cover "
      // style={{
      //   backgroundImage:
      //     "url('/uttarakhand_drainage_map.jpg')",
      // }}
    >
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col md:flex-row w-full max-w-4xl">
        <div className="w-full md:w-1/2">
          <img
            src="/uttarakhand.jpg"
            alt="Beautiful Uttarakhand"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
            Contact Us
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="hidden"
              name="access_key"
              value="YOUR_WEB3FORMS_ACCESS_KEY"
            />

            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#205781] transition duration-300"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#205781] transition duration-300"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#205781] transition duration-300"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#205781] transition duration-300"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full text-white p-3 rounded-xl shadow-md bg-[#205781] hover:shadow-lg text-[20px]"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormPage;
